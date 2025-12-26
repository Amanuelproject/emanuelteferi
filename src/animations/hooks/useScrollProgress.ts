import { useState, useEffect, useCallback } from 'react';

interface ScrollProgress {
  progress: number;
  scrollY: number;
  direction: 'up' | 'down' | null;
  isScrolling: boolean;
}

export function useScrollProgress(): ScrollProgress {
  const [scrollData, setScrollData] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    direction: null,
    isScrolling: false,
  });

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

    setScrollData((prev) => ({
      progress,
      scrollY,
      direction: scrollY > prev.scrollY ? 'down' : scrollY < prev.scrollY ? 'up' : prev.direction,
      isScrolling: true,
    }));
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const onScroll = () => {
      handleScroll();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollData((prev) => ({ ...prev, isScrolling: false }));
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  return scrollData;
}
