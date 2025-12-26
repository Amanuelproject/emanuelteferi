import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Subtle scroll progress indicator
 * Shows user how far they've scrolled through the page
 */
export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !progressRef.current) return;

    const progress = progressRef.current;

    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{
        transform: 'scaleX(0)',
        background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--neon-purple)))',
        boxShadow: '0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.3)',
      }}
    />
  );
}
