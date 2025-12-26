import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// Placeholder component - images will be added later
export function Gallery() {
  const { t } = useLanguage();

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Gallery placeholder - ready for images */}
          <div className="min-h-[200px] rounded-2xl border border-dashed border-border/50 bg-card/20 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              {/* Gallery content will be added here */}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
