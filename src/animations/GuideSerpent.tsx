import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useReducedMotion } from './hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface Particle {
  x: number;
  y: number;
  opacity: number;
  size: number;
  delay: number;
}

/**
 * The Guide Serpent - An abstract, flowing energy line that subtly guides users
 * 
 * This is NOT a literal snake. It represents:
 * - Flow and direction
 * - Intelligence and guidance
 * - Continuity through the page
 * 
 * Made of soft neon particles that follow a serpentine path
 */
export function GuideSerpent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHeroComplete, setIsHeroComplete] = useState(false);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);

  // Initialize particles
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Wait for hero animation to complete before showing guide
    const heroTimer = setTimeout(() => {
      setIsHeroComplete(true);
    }, 2500);

    return () => clearTimeout(heroTimer);
  }, [prefersReducedMotion]);

  // Setup canvas and animation
  useEffect(() => {
    if (prefersReducedMotion || !isHeroComplete || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = document.documentElement.scrollHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${document.documentElement.scrollHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Generate serpentine path points
    const generatePath = () => {
      const points: { x: number; y: number }[] = [];
      const pageHeight = document.documentElement.scrollHeight;
      const segments = Math.floor(pageHeight / 200);
      
      for (let i = 0; i <= segments; i++) {
        const y = (i / segments) * pageHeight;
        // Serpentine wave pattern
        const waveAmplitude = 150 + Math.sin(i * 0.3) * 50;
        const x = window.innerWidth / 2 + Math.sin(i * 0.5) * waveAmplitude;
        points.push({ x, y });
      }
      
      return points;
    };

    const pathPoints = generatePath();

    // Create particles along the path
    const particleCount = 80;
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      x: 0,
      y: 0,
      opacity: 0,
      size: 2 + Math.random() * 3,
      delay: i * 0.02,
    }));

    // Get point on path
    const getPointOnPath = (t: number) => {
      const index = Math.min(Math.floor(t * (pathPoints.length - 1)), pathPoints.length - 2);
      const localT = (t * (pathPoints.length - 1)) % 1;
      const p1 = pathPoints[index];
      const p2 = pathPoints[index + 1];
      
      return {
        x: p1.x + (p2.x - p1.x) * localT,
        y: p1.y + (p2.y - p1.y) * localT,
      };
    };

    // Animation colors from design system
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary').trim() || '190 95% 50%';
    
    // Parse HSL values
    const [h, s, l] = primaryColor.split(' ').map(v => parseFloat(v));

    // Scroll-bound progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetProgressRef.current = Math.min(scrollTop / maxScroll, 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Animation loop
    let lastTime = 0;
    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      // Smooth progress interpolation
      progressRef.current += (targetProgressRef.current - progressRef.current) * 0.05;

      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, document.documentElement.scrollHeight);

      // Calculate visible range based on scroll
      const viewportTop = window.scrollY;
      const viewportBottom = viewportTop + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Draw particles
      particlesRef.current.forEach((particle, i) => {
        // Calculate particle position along path
        const particleProgress = Math.max(0, Math.min(1, 
          progressRef.current * 1.2 - particle.delay
        ));
        
        if (particleProgress <= 0) return;

        const point = getPointOnPath(particleProgress);
        particle.x = point.x;
        particle.y = point.y;

        // Only draw if in or near viewport
        if (particle.y < viewportTop - 100 || particle.y > viewportBottom + 100) return;

        // Fade based on progress and position
        const fadeInProgress = Math.min(particleProgress * 5, 1);
        const fadeOutProgress = particleProgress > 0.95 ? 1 - (particleProgress - 0.95) * 20 : 1;
        particle.opacity = fadeInProgress * fadeOutProgress * 0.6;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, ${particle.opacity})`);
        gradient.addColorStop(0.5, `hsla(${h}, ${s}%, ${l}%, ${particle.opacity * 0.3})`);
        gradient.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${h}, ${s}%, ${l + 20}%, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, 0.1)`;
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particlesRef.current.length - 1; i++) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[i + 1];
        
        if (p1.opacity > 0.1 && p2.opacity > 0.1) {
          if (p1.y >= viewportTop - 100 && p1.y <= viewportBottom + 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion, isHeroComplete]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: isHeroComplete ? 1 : 0, transition: 'opacity 1s ease-out' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
