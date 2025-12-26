import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function CTAGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  // Delay appearance until hero animation settles
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={glowRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute -inset-4 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      {/* Primary glow pulse */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(190 95% 50% / 0.15) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Secondary subtle ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(190 95% 50% / 0.08) 60%, transparent 75%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1.05, 1.15, 1.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </motion.div>
  );
}
