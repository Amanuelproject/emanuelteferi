import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface SectionCTAProps {
  className?: string;
}

export function SectionCTA({ className = '' }: SectionCTAProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className={`md:hidden py-8 px-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex justify-center"
      >
        <button
          onClick={() => navigate('/start-project')}
          className="group flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors duration-300"
        >
          <span className="text-sm font-medium">{t('hero.cta.getStarted')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </motion.div>
    </div>
  );
}
