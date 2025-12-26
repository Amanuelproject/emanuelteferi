import { motion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
  flip?: boolean;
}

export function SectionDivider({ className = '', flip = false }: SectionDividerProps) {
  return (
    <div className={`relative w-full h-16 overflow-hidden ${className}`}>
      <motion.svg
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className={`absolute inset-0 w-full h-full ${flip ? 'rotate-180' : ''}`}
      >
        <defs>
          <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="30%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
            <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50"
          fill="none"
          stroke="url(#dividerGradient)"
          strokeWidth="1.5"
          className="drop-shadow-sm"
        />
        <path
          d="M0,55 Q200,85 400,55 T800,55 T1200,55"
          fill="none"
          stroke="url(#dividerGradient)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      </motion.svg>
    </div>
  );
}
