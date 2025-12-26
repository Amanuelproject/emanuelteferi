import { useState, useEffect } from 'react';
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
  const [currentLine, setCurrentLine] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animate code lines
    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= codeLines.length - 1) {
          clearInterval(lineInterval);
          setTimeout(() => setShowLogo(true), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    // Start fade out after animations
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 8000);

    // Complete after fade
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 9000);

    return () => {
      clearInterval(lineInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/30"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  opacity: 0,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'linear',
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
              <div className="p-4 font-code text-sm">
                {codeLines.slice(0, currentLine + 1).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex"
                  >
                    <span className="text-muted-foreground w-6 select-none">{index + 1}</span>
                    <span className="text-foreground/90">
                      {line.includes('name') && (
                        <>
                          <span className="text-muted-foreground">  name: </span>
                          <span className="text-primary">"Emanuel Teferi"</span>
                          <span className="text-muted-foreground">,</span>
                        </>
                      )}
                      {line.includes('location') && (
                        <>
                          <span className="text-muted-foreground">  location: </span>
                          <span className="text-primary">"Addis Ababa"</span>
                          <span className="text-muted-foreground">,</span>
                        </>
                      )}
                      {line.includes('passion') && (
                        <>
                          <span className="text-muted-foreground">  passion: </span>
                          <span className="text-primary">"Web Development"</span>
                          <span className="text-muted-foreground">,</span>
                        </>
                      )}
                      {line.includes('status') && (
                        <>
                          <span className="text-muted-foreground">  status: </span>
                          <span className="text-green-400">"Available"</span>
                        </>
                      )}
                      {line.includes('const') && (
                        <>
                          <span className="text-purple-400">const </span>
                          <span className="text-foreground">developer = {'{'}</span>
                        </>
                      )}
                      {line === '};' && <span className="text-foreground">{'};'}</span>}
                      {line.includes('console') && (
                        <>
                          <span className="text-yellow-400">console</span>
                          <span className="text-muted-foreground">.</span>
                          <span className="text-blue-400">log</span>
                          <span className="text-muted-foreground">(</span>
                          <span className="text-primary">"Building your vision..."</span>
                          <span className="text-muted-foreground">);</span>
                        </>
                      )}
                      {line === '' && <span>&nbsp;</span>}
                    </span>
                    {index === currentLine && (
                      <span className="w-2 h-5 bg-primary ml-1 cursor-blink" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Logo reveal */}
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
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
