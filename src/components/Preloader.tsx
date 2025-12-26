import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';

const codeLines = [
  'const developer = {',
  '  name: "Emanuel Teferi",',
  '  location: "Addis Ababa",',
  '  passion: "Web Development",',
  '  status: "Available"',
  '};',
  '',
  'console.log("Building your vision...");',
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const typingComplete = useRef(false);

  // Typewriter effect - character by character
  useEffect(() => {
    if (typingComplete.current) return;

    if (currentLineIndex >= codeLines.length) {
      typingComplete.current = true;
      setTimeout(() => setShowLogo(true), 400);
      return;
    }

    const currentLine = codeLines[currentLineIndex];
    
    if (currentCharIndex <= currentLine.length) {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 35); // Smooth typing speed
      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 150); // Pause between lines
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  // Fade out and complete
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 7500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 8500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const renderLine = (line: string, index: number) => {
    if (line.includes('name:')) {
      return (
        <>
          <span className="text-muted-foreground">  name: </span>
          <span className="text-primary">{line.includes('"') ? line.split('name: ')[1] : ''}</span>
        </>
      );
    }
    if (line.includes('location:')) {
      return (
        <>
          <span className="text-muted-foreground">  location: </span>
          <span className="text-primary">{line.includes('"') ? line.split('location: ')[1] : ''}</span>
        </>
      );
    }
    if (line.includes('passion:')) {
      return (
        <>
          <span className="text-muted-foreground">  passion: </span>
          <span className="text-primary">{line.includes('"') ? line.split('passion: ')[1] : ''}</span>
        </>
      );
    }
    if (line.includes('status:')) {
      return (
        <>
          <span className="text-muted-foreground">  status: </span>
          <span className="text-green-400">{line.includes('"') ? line.split('status: ')[1] : ''}</span>
        </>
      );
    }
    if (line.includes('const')) {
      return (
        <>
          <span className="text-purple-400">const </span>
          <span className="text-foreground">{line.replace('const ', '')}</span>
        </>
      );
    }
    if (line.includes('console')) {
      const parts = line.split('console');
      return (
        <>
          {parts[0]}
          <span className="text-yellow-400">console</span>
          {parts[1]?.includes('.') && (
            <>
              <span className="text-muted-foreground">.</span>
              <span className="text-blue-400">{parts[1].split('.')[1]?.split('(')[0]}</span>
              {parts[1].includes('(') && (
                <>
                  <span className="text-muted-foreground">(</span>
                  <span className="text-primary">{parts[1].split('(')[1]?.split(')')[0]}</span>
                  {parts[1].includes(')') && <span className="text-muted-foreground">){parts[1].split(')')[1]}</span>}
                </>
              )}
            </>
          )}
        </>
      );
    }
    if (line === '};') {
      return <span className="text-foreground">{'};'}</span>;
    }
    return <span className="text-foreground">{line || '\u00A0'}</span>;
  };

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 rounded-full bg-primary/20"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: -10,
                  opacity: 0,
                }}
                animate={{
                  y: '110vh',
                  opacity: [0, 0.6, 0.6, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />
            ))}
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }} />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 px-4">
            {/* Code terminal */}
            <motion.div
              className="w-full max-w-md bg-card/80 rounded-xl border border-border/50 overflow-hidden backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-muted-foreground font-code">developer.ts</span>
              </div>

              {/* Code content */}
              <div className="p-4 font-code text-sm min-h-[220px]">
                {codeLines.map((_, index) => (
                  <div key={index} className="flex">
                    <span className="text-muted-foreground w-6 select-none">{index + 1}</span>
                    <span className="text-foreground/90">
                      {visibleLines[index] !== undefined ? renderLine(visibleLines[index], index) : ''}
                      {index === currentLineIndex && currentLineIndex < codeLines.length && (
                        <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Logo reveal */}
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.img
                    src={logo}
                    alt="Emanuel Teferi"
                    className="w-20 h-20 object-contain"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px hsl(var(--primary) / 0.3)',
                        '0 0 40px hsl(var(--primary) / 0.5)',
                        '0 0 20px hsl(var(--primary) / 0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: 200 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
