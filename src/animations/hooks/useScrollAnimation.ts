import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

/**
 * Hook for scroll-triggered animations
 * Performance-safe with reduced motion support
 */
export function useScrollAnimation(
  animationCallback: (gsapInstance: typeof gsap, scrollTrigger: typeof ScrollTrigger) => gsap.core.Timeline | gsap.core.Tween | void,
  options: ScrollAnimationOptions = {},
  dependencies: unknown[] = []
) {
  const prefersReducedMotion = useReducedMotion();
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) return;

    // Create animation
    const result = animationCallback(gsap, ScrollTrigger);
    if (result) {
      animationRef.current = result;
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [prefersReducedMotion, ...dependencies]);

  return { gsap, ScrollTrigger, prefersReducedMotion };
}
