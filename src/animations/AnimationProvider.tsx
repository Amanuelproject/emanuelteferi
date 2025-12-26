import { ReactNode, useEffect, useState } from 'react';
import { CobraGuide } from './CobraGuide';
import { useReducedMotion } from './hooks/useReducedMotion';

interface AnimationProviderProps {
  children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Detect low-performance devices
  useEffect(() => {
    const checkPerformance = () => {
      // Check for low-end indicators
      const isMobile = window.innerWidth < 768;
      const hasLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
      const hasSlowConnection = 'connection' in navigator && 
        (navigator as any).connection?.effectiveType === '2g';
      
      setIsLowPerformance(isMobile && (hasLowMemory || hasSlowConnection));
    };

    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    
    // Mark as ready after initial check
    const timer = setTimeout(() => setIsReady(true), 100);
    
    return () => {
      window.removeEventListener('resize', checkPerformance);
      clearTimeout(timer);
    };
  }, []);

  // Skip animations entirely for reduced motion or very low performance
  const shouldShowCobra = isReady && !prefersReducedMotion && !isLowPerformance;

  return (
    <div className="relative">
      {/* Cobra guide - background layer */}
      {shouldShowCobra && <CobraGuide />}
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
