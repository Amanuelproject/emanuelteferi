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
    x: 0,
    y: 100,
    rotation: 0,
    opacity: 0,
    scale: 1,
  });

  // Wait for hero animation to complete before showing
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroComplete(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fade in after hero completes
  useEffect(() => {
    if (heroComplete && !prefersReducedMotion) {
      const fadeTimer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(fadeTimer);
    }
  }, [heroComplete, prefersReducedMotion]);

  // Calculate cobra position based on scroll
  const calculatePosition = useCallback((scrollProgress: number): CobraState => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth < 768;
    
    // Define path points for the cobra to follow (percentage based)
    const pathPoints = [
      { x: -5, y: 30, rotation: -15, scale: 1 },      // Start off-screen left, near hero CTA
      { x: 15, y: 45, rotation: 10, scale: 0.95 },    // Curve toward center
      { x: 5, y: 60, rotation: -20, scale: 0.9 },     // Move down, slight retreat
      { x: 20, y: 75, rotation: 5, scale: 0.85 },     // Near portfolio section
      { x: -10, y: 85, rotation: -25, scale: 0.8 },   // Retreat during forms
      { x: 10, y: 95, rotation: 0, scale: 0.7 },      // Near footer, calm
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

    // Opacity fades at start and end
    let opacity = 0.6;
    if (scrollProgress < 0.05) {
      opacity = scrollProgress * 12; // Fade in
    } else if (scrollProgress > 0.9) {
      opacity = (1 - scrollProgress) * 6; // Fade out
    }

    // Mobile adjustments
    const mobileScale = isMobile ? 0.6 : 1;
    const mobileOpacity = isMobile ? opacity * 0.7 : opacity;

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
      duration: isScrolling ? 0.3 : 0.8,
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

  // Don't render if reduced motion or not visible yet
  if (prefersReducedMotion || !heroComplete) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <svg
        ref={cobraRef}
        viewBox="0 0 200 300"
        className="absolute w-32 h-48 md:w-48 md:h-72 lg:w-56 lg:h-84"
        style={{
          opacity: 0,
          willChange: 'transform, opacity',
          filter: 'drop-shadow(0 0 20px hsl(190 95% 50% / 0.15))',
        }}
      >
        {/* Cobra silhouette - realistic form */}
        <defs>
          {/* Gradient matching brand accent */}
          <linearGradient id="cobraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(220 30% 12%)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(222 47% 8%)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="hsl(220 30% 6%)" stopOpacity="1" />
          </linearGradient>
          
          {/* Subtle accent highlight */}
          <linearGradient id="cobraHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(190 95% 50%)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(190 95% 40%)" stopOpacity="0.05" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="cobraGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Cobra body - elegant serpentine form */}
        <g filter="url(#cobraGlow)">
          {/* Main body curve */}
          <path
            d="M100 280
               Q85 260 90 240
               Q95 220 85 200
               Q75 180 80 160
               Q85 140 75 120
               Q65 100 70 80
               Q75 60 65 45
               L60 35
               Q50 25 55 15
               Q65 5 80 10
               Q95 15 100 30
               Q105 15 120 10
               Q135 5 145 15
               Q150 25 140 35
               L135 45
               Q125 60 130 80
               Q135 100 125 120
               Q115 140 120 160
               Q125 180 115 200
               Q105 220 110 240
               Q115 260 100 280
               Z"
            fill="url(#cobraGradient)"
            stroke="hsl(220 30% 25%)"
            strokeWidth="0.5"
          />
          
          {/* Hood detail - the expanded cobra hood */}
          <path
            d="M55 15
               Q45 20 40 35
               Q35 50 45 60
               Q55 70 65 65
               M145 15
               Q155 20 160 35
               Q165 50 155 60
               Q145 70 135 65"
            fill="none"
            stroke="url(#cobraHighlight)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          {/* Eyes - subtle glow */}
          <ellipse
            cx="75"
            cy="28"
            rx="4"
            ry="3"
            fill="hsl(190 95% 50%)"
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.5;0.3"
              dur="4s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse
            cx="125"
            cy="28"
            rx="4"
            ry="3"
            fill="hsl(190 95% 50%)"
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.5;0.3"
              dur="4s"
              repeatCount="indefinite"
              begin="0.2s"
            />
          </ellipse>
          
          {/* Scale texture overlay */}
          <path
            d="M85 100 Q90 95 95 100 Q90 105 85 100
               M105 100 Q110 95 115 100 Q110 105 105 100
               M90 140 Q95 135 100 140 Q95 145 90 140
               M100 180 Q105 175 110 180 Q105 185 100 180
               M95 220 Q100 215 105 220 Q100 225 95 220"
            fill="none"
            stroke="hsl(220 30% 20%)"
            strokeWidth="0.5"
            opacity="0.5"
          />
          
          {/* Accent line along spine */}
          <path
            d="M100 280
               Q95 250 100 220
               Q105 190 100 160
               Q95 130 100 100
               Q105 70 100 50"
            fill="none"
            stroke="hsl(190 95% 50%)"
            strokeWidth="0.8"
            opacity="0.15"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
