import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from './hooks/useReducedMotion';

/**
 * Hero section glow effect that appears after hero text animates
 * Draws attention to the CTA button with a subtle pulse
 */
export function HeroGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Wait for hero text to finish animating
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(showTimer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isVisible || !glowRef.current || prefersReducedMotion) return;

    const glow = glowRef.current;

    // Entrance animation
    gsap.fromTo(glow, 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: 'power2.out' 
      }
    );

    // Subtle pulse animation
    gsap.to(glow, {
      boxShadow: '0 0 80px 40px hsl(var(--primary) / 0.15)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Stop animation when user scrolls
    const handleScroll = () => {
      if (window.scrollY > 100) {
        gsap.to(glow, { opacity: 0, duration: 0.5 });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={glowRef}
      className="absolute pointer-events-none z-0"
      style={{
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
        boxShadow: '0 0 60px 30px hsl(var(--primary) / 0.1)',
        opacity: 0,
        transform: 'translate(-50%, -50%)',
        top: '60%',
        left: '50%',
      }}
    />
  );
}
