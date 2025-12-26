import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'fade';
  delay?: number;
  stagger?: number;
}

/**
 * Wrapper component for scroll-triggered section reveals
 * Subtle, professional entrance animations
 */
export function SectionReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  stagger = 0.1,
}: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const element = containerRef.current;
    const children = element.children;

    // Set initial state
    const initialState: gsap.TweenVars = {
      opacity: 0,
      y: direction === 'up' ? 30 : 0,
      x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
    };

    gsap.set(children.length > 0 ? children : element, initialState);

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(children.length > 0 ? children : element, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.8,
      stagger: stagger,
      delay: delay,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [prefersReducedMotion, direction, delay, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
