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

  // Mark ready immediately - only disable for very low-end devices
  useEffect(() => {
    // Only disable on extremely low-end devices
    const hasLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 2;
    const hasSlowConnection = 'connection' in navigator && 
      (navigator as any).connection?.effectiveType === '2g';
    
    setIsLowPerformance(hasLowMemory && hasSlowConnection);
    setIsReady(true);
  }, []);

  // Skip animations entirely for reduced motion or very low performance
  const shouldShowCobra = isReady && !prefersReducedMotion && !isLowPerformance;

  return (
    <>
      {/* Cobra guide - fixed layer that floats above content */}
      {shouldShowCobra && <CobraGuide />}
      
      {/* Main content */}
      {children}
    </>
  );
}
