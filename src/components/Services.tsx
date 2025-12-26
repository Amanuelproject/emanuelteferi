import { motion } from 'framer-motion';
import { Code, Users, Zap, Globe, Smartphone, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Globe,
      titleKey: 'services.items.businessWebsites.title',
      descriptionKey: 'services.items.businessWebsites.description',
    },
    {
      icon: Smartphone,
      titleKey: 'services.items.mobileFirst.title',
      descriptionKey: 'services.items.mobileFirst.description',
    },
    {
      icon: Code,
      titleKey: 'services.items.customDev.title',
      descriptionKey: 'services.items.customDev.description',
    },
    {
      icon: Search,
      titleKey: 'services.items.googleVisibility.title',
      descriptionKey: 'services.items.googleVisibility.description',
    },
    {
      icon: Users,
      titleKey: 'services.items.customerConnection.title',
      descriptionKey: 'services.items.customerConnection.description',
    },
    {
      icon: Zap,
      titleKey: 'services.items.fastReliable.title',
      descriptionKey: 'services.items.fastReliable.description',
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-code text-sm uppercase tracking-widest mb-4 block">
            {'<'} {t('services.sectionTag')} {'/>'} 
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t('services.title')} <span className="gradient-text">{t('services.titleHighlight')}</span> {t('services.titleSuffix')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card/50 border border-primary/20 hover:border-primary/50 transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {t(service.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(service.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
