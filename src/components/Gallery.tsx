import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// Import workspace images
import workspace1 from '@/assets/workspace/workspace-1.png';
import workspace2 from '@/assets/workspace/workspace-2.png';
import workspace3 from '@/assets/workspace/workspace-3.png';

const workspaceImages = [
  { src: workspace1, alt: 'Coding setup - IDE and terminal' },
  { src: workspace2, alt: 'Working at my desk' },
  { src: workspace3, alt: 'Late night coding session' },
];

export function Gallery() {
  const { t } = useLanguage();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-code text-sm uppercase tracking-widest mb-4 block">
            {'<'} Behind The Scenes {'/>'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Where The <span className="gradient-text">Magic</span> Happens
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            This is what people don't see — late nights, endless debugging, and the passion that goes into every line of code.
          </p>
        </motion.div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workspaceImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <p className="p-4 text-sm text-foreground font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
