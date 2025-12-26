import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useScrollProgress } from './hooks/useScrollProgress';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CobraState {
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  scale: number;
}

export function CobraGuide() {
  const prefersReducedMotion = useReducedMotion();
  const { progress, isScrolling } = useScrollProgress();
  const cobraRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [heroComplete, setHeroComplete] = useState(false);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const stateRef = useRef<CobraState>({
    x: 50,
    y: 200,
    rotation: 0,
    opacity: 0,
    scale: 1,
  });

  // Wait for hero animation to complete before showing
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroComplete(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Fade in after hero completes
  useEffect(() => {
    if (heroComplete && !prefersReducedMotion) {
      setIsVisible(true);
      
      // Animate initial appearance
      if (cobraRef.current) {
        gsap.fromTo(
          cobraRef.current,
          { opacity: 0, x: -100 },
          { 
            opacity: 0.85, 
            x: 50,
            duration: 2,
            ease: 'power3.out',
          }
        );
      }
    }
  }, [heroComplete, prefersReducedMotion]);

  // Calculate cobra position based on scroll
  const calculatePosition = useCallback((scrollProgress: number): CobraState => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth < 768;
    
    // Define path points for the cobra to follow (percentage based)
    const pathPoints = [
      { x: 5, y: 35, rotation: 15, scale: 1 },        // Hero - visible on left, looking at CTA
      { x: 85, y: 45, rotation: -10, scale: 0.95 },   // Move to right side
      { x: 10, y: 55, rotation: 20, scale: 0.9 },     // Cross to left for About
      { x: 80, y: 65, rotation: -15, scale: 0.85 },   // Right side for Testimonials
      { x: 15, y: 75, rotation: 10, scale: 0.8 },     // Left for Services
      { x: 75, y: 85, rotation: -5, scale: 0.75 },    // Right for Portfolio
      { x: 50, y: 95, rotation: 0, scale: 0.7 },      // Center bottom, calm exit
    ];

    // Find the two points we're interpolating between
    const segmentCount = pathPoints.length - 1;
    const scaledProgress = scrollProgress * segmentCount;
    const currentIndex = Math.min(Math.floor(scaledProgress), segmentCount - 1);
    const nextIndex = Math.min(currentIndex + 1, segmentCount);
    const segmentProgress = scaledProgress - currentIndex;

    const current = pathPoints[currentIndex];
    const next = pathPoints[nextIndex];

    // Smooth interpolation
    const easeProgress = gsap.parseEase('power2.inOut')(segmentProgress);

    // Calculate interpolated values
    const x = current.x + (next.x - current.x) * easeProgress;
    const y = current.y + (next.y - current.y) * easeProgress;
    const rotation = current.rotation + (next.rotation - current.rotation) * easeProgress;
    const scale = current.scale + (next.scale - current.scale) * easeProgress;

    // Opacity - always visible but fades at very end
    let opacity = 0.85;
    if (scrollProgress > 0.92) {
      opacity = (1 - scrollProgress) * 10; // Fade out near footer
    }

    // Mobile adjustments - still visible but smaller
    const mobileScale = isMobile ? 0.7 : 1;
    const mobileOpacity = isMobile ? opacity * 0.8 : opacity;

    return {
      x: (x / 100) * viewportWidth,
      y: (y / 100) * viewportHeight,
      rotation,
      opacity: mobileOpacity,
      scale: scale * mobileScale,
    };
  }, []);

  // Animate cobra based on scroll
  useEffect(() => {
    if (!isVisible || !cobraRef.current || prefersReducedMotion) return;

    const targetState = calculatePosition(progress);
    
    // Smooth animation to target position
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.to(stateRef.current, {
      x: targetState.x,
      y: targetState.y,
      rotation: targetState.rotation,
      opacity: targetState.opacity,
      scale: targetState.scale,
      duration: isScrolling ? 0.5 : 1.2,
      ease: isScrolling ? 'power2.out' : 'power3.out',
      onUpdate: () => {
        if (cobraRef.current) {
          const { x, y, rotation, opacity, scale } = stateRef.current;
          cobraRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
          cobraRef.current.style.opacity = String(opacity);
        }
      },
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [progress, isVisible, isScrolling, calculatePosition, prefersReducedMotion]);

  // Don't render if reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 40 }}
      aria-hidden="true"
    >
      <svg
        ref={cobraRef}
        viewBox="0 0 200 300"
        className="absolute w-40 h-60 md:w-56 md:h-80 lg:w-64 lg:h-96"
        style={{
          opacity: 0,
          willChange: 'transform, opacity',
          filter: 'drop-shadow(0 0 30px hsl(190 95% 50% / 0.4)) drop-shadow(0 0 60px hsl(190 95% 50% / 0.2))',
        }}
      >
        {/* Cobra silhouette - realistic form with visible colors */}
        <defs>
          {/* Main body gradient - darker with cyan accent */}
          <linearGradient id="cobraBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(200 40% 15%)" />
            <stop offset="40%" stopColor="hsl(210 35% 12%)" />
            <stop offset="100%" stopColor="hsl(220 30% 8%)" />
          </linearGradient>
          
          {/* Hood gradient with accent */}
          <linearGradient id="cobraHoodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(190 60% 25%)" />
            <stop offset="50%" stopColor="hsl(200 40% 18%)" />
            <stop offset="100%" stopColor="hsl(210 35% 12%)" />
          </linearGradient>
          
          {/* Accent edge glow */}
          <linearGradient id="cobraEdgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(190 95% 50%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(190 95% 60%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(190 95% 50%)" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Eye glow */}
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(190 100% 70%)" />
            <stop offset="60%" stopColor="hsl(190 95% 50%)" />
            <stop offset="100%" stopColor="hsl(190 90% 40%)" stopOpacity="0.5" />
          </radialGradient>
          
          {/* Glow filter for the whole cobra */}
          <filter id="cobraGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Cobra body - elegant serpentine form */}
        <g filter="url(#cobraGlow)">
          {/* Main body curve */}
          <path
            d="M100 290
               Q80 265 88 240
               Q96 215 82 190
               Q68 165 78 140
               Q88 115 72 90
               Q60 70 68 50
               L62 38
               Q48 22 58 10
               Q72 0 88 8
               Q100 14 100 28
               Q100 14 112 8
               Q128 0 142 10
               Q152 22 138 38
               L132 50
               Q120 70 128 90
               Q112 115 122 140
               Q132 165 118 190
               Q104 215 112 240
               Q120 265 100 290
               Z"
            fill="url(#cobraBodyGradient)"
            stroke="hsl(190 70% 35%)"
            strokeWidth="1"
          />
          
          {/* Hood - expanded with gradient */}
          <path
            d="M58 10
               Q38 18 30 40
               Q22 65 40 80
               Q55 92 72 82
               Q82 75 88 60
               M142 10
               Q162 18 170 40
               Q178 65 160 80
               Q145 92 128 82
               Q118 75 112 60"
            fill="url(#cobraHoodGradient)"
            stroke="hsl(190 60% 40%)"
            strokeWidth="0.8"
          />
          
          {/* Hood inner detail */}
          <path
            d="M58 10 Q45 25 42 45 Q40 60 50 72
               M142 10 Q155 25 158 45 Q160 60 150 72"
            fill="none"
            stroke="url(#cobraEdgeGlow)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Eyes - prominent glowing */}
          <ellipse
            cx="78"
            cy="32"
            rx="6"
            ry="4"
            fill="url(#eyeGlow)"
          >
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="3s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse
            cx="122"
            cy="32"
            rx="6"
            ry="4"
            fill="url(#eyeGlow)"
          >
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="3s"
              repeatCount="indefinite"
              begin="0.15s"
            />
          </ellipse>
          
          {/* Eye pupils */}
          <ellipse cx="80" cy="32" rx="2" ry="2" fill="hsl(220 40% 8%)" />
          <ellipse cx="120" cy="32" rx="2" ry="2" fill="hsl(220 40% 8%)" />
          
          {/* Scale pattern on body */}
          <g opacity="0.4">
            <path d="M90 110 Q95 105 100 110 Q95 115 90 110" fill="hsl(190 50% 30%)" />
            <path d="M100 110 Q105 105 110 110 Q105 115 100 110" fill="hsl(190 50% 30%)" />
            <path d="M95 150 Q100 145 105 150 Q100 155 95 150" fill="hsl(190 50% 28%)" />
            <path d="M92 190 Q97 185 102 190 Q97 195 92 190" fill="hsl(190 50% 26%)" />
            <path d="M98 230 Q103 225 108 230 Q103 235 98 230" fill="hsl(190 50% 24%)" />
          </g>
          
          {/* Accent spine line */}
          <path
            d="M100 280
               Q95 250 100 220
               Q105 190 100 160
               Q95 130 100 100
               Q105 70 100 45"
            fill="none"
            stroke="hsl(190 95% 55%)"
            strokeWidth="1.5"
            opacity="0.5"
            strokeLinecap="round"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Edge highlight on hood */}
          <path
            d="M30 40 Q35 55 45 70
               M170 40 Q165 55 155 70"
            fill="none"
            stroke="hsl(190 95% 60%)"
            strokeWidth="1.5"
            opacity="0.6"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
