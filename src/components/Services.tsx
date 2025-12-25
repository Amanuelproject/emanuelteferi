import { motion } from 'framer-motion';
import { Code, Users, Zap, Globe, Smartphone, Search } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Business Websites',
    description: 'Professional websites that showcase your business, services, and build customer trust.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Responsive designs that look stunning on phones, tablets, and desktops.',
  },
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Tailored solutions with booking forms, galleries, menus, and more.',
  },
  {
    icon: Search,
    title: 'Google Visibility',
    description: 'Get found online with proper SEO and Google Business integration.',
  },
  {
    icon: Users,
    title: 'Customer Connection',
    description: 'WhatsApp integration, contact forms, and easy booking systems.',
  },
  {
    icon: Zap,
    title: 'Fast & Reliable',
    description: 'Lightning-fast loading with ongoing support and updates.',
  },
];

export function Services() {
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
            {'<'} Services {'/>'} 
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            What I <span className="gradient-text">Build</span> For You
          </h2>
          <p className="text-muted-foreground text-lg">
            Every Ethiopian business deserves a professional online presence. 
            I create websites that help you reach more customers and grow.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500"
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
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-2">Starting at</p>
          <p className="text-4xl font-bold text-primary mb-4">10,000 ETB</p>
          <p className="text-sm text-muted-foreground">
            Final price depends on features and complexity
          </p>
        </motion.div>
      </div>
    </section>
  );
}
