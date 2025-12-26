import { ReactNode, useEffect, useState } from 'react';
import { GuideSerpent } from './GuideSerpent';
import { ScrollProgress } from './ScrollProgress';
import { useReducedMotion } from './hooks/useReducedMotion';

interface AnimationProviderProps {
  children: ReactNode;
}

/**
 * Animation Provider - Wraps the app with animation layers
 * 
 * This is a non-destructive overlay that adds:
 * - Guide Serpent (flowing energy line)
 * - Scroll Progress indicator
 * 
 * Respects user preferences and performance constraints
 */
export function AnimationProvider({ children }: AnimationProviderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Detect mobile
    setIsMobile(window.innerWidth < 768);

    // Simple performance check
    const checkPerformance = () => {
      // Check for low-end device indicators
      const connection = (navigator as any).connection;
      if (connection?.saveData) {
        setIsLowPerformance(true);
        return;
      }

      // Check hardware concurrency
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        setIsLowPerformance(true);
      }
    };

    checkPerformance();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Disable complex animations on low-performance devices
  const showComplexAnimations = !prefersReducedMotion && !isLowPerformance;
  
  // Show simplified animations on mobile
  const showSimplifiedAnimations = !prefersReducedMotion && isMobile && !isLowPerformance;

  return (
    <>
      {/* Scroll Progress - always show unless reduced motion */}
      {!prefersReducedMotion && <ScrollProgress />}
      
      {/* Guide Serpent - only on capable devices */}
      {showComplexAnimations && !isMobile && <GuideSerpent />}
      
      {/* Children (actual page content) */}
      {children}
    </>
  );
}
