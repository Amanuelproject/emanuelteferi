import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    name: "Mo Men's Salon & Spa",
    location: 'Bole, Addis Ababa',
    industry: "Men's Grooming",
    before: 'No website, only WhatsApp & walk-ins, losing modern customers',
    solution: 'Full site with services list, pricing, gallery, easy booking links and map',
    outcome: 'Increase in quality walk-ins and WhatsApp inquiries; customers trust clear pricing',
    website: null,
    github: null,
  },
  {
    name: 'Cherchis Café',
    location: '4 Kilo, Addis Ababa',
    industry: 'Café & Lounge',
    before: 'Only Instagram, lost remote workers and students who want info online',
    solution: 'Site with menu, photos of the space, reservation form, hours',
    outcome: 'More weekday visitors; customers now find them via Google search',
    website: 'https://cherchiscafe1.lovable.app/',
    github: 'https://github.com/webniereagency/cherchiscafe1-d8b4ec2c',
  },
  {
    name: "Nuha's Garden",
    location: 'Addis Ababa',
    industry: 'Outdoor Event Venue',
    before: 'Only scattered photos, no clear package info',
    solution: 'Photo gallery, clear pricing for weddings/parties/corporate, inquiry form, testimonials',
    outcome: 'More tour bookings, better-prepared inquiries from planners',
    website: 'https://nuhasgarden.lovable.app/',
    github: 'https://github.com/webniereagency/nuhasgarden',
  },
  {
    name: 'Solina Coffee',
    location: 'Addis Ababa',
    industry: 'Specialty Coffee Shop',
    before: 'Instagram-only menu, no prices online',
    solution: 'Comprehensive menu with descriptions and prices, photo gallery, story section, contact with call/WhatsApp',
    outcome: 'Customers decide drinks before coming; fewer calls asking basic questions',
    website: 'https://solinacoffe.lovable.app/',
    github: 'https://github.com/webniereagency/solinacoffe',
  },
  {
    name: 'Dusk Addis',
    location: 'Addis Ababa',
    industry: 'Lounge/Nightlife',
    before: 'Word-of-mouth only, unclear events',
    solution: 'Event calendar, booking form, gallery of past events, clear contact',
    outcome: 'More table reservations, fewer repeated inquiries',
    website: 'https://duskaddis.lovable.app/',
    github: 'https://github.com/webniereagency/duskaddis',
  },
  {
    name: 'Bling Dental Clinic',
    location: 'Addis Ababa',
    industry: 'Dentistry',
    before: 'Generic "near me" searches, no detailed services list',
    solution: 'Services pages (cleaning, braces, etc.), booking form, team intro, testimonials',
    outcome: 'Patients book online directly; clinic feels more professional',
    website: 'https://blingdental.lovable.app/',
    github: 'https://github.com/webniereagency/blingdental',
  },
  {
    name: 'Rainbow Decor Ethiopia',
    location: 'Addis Ababa',
    industry: 'Event Décor',
    before: 'Scattered WhatsApp photos, unclear packages',
    solution: 'Portfolio by event type, clear pricing tiers, quote form',
    outcome: 'Faster client decisions, streamlined quotes',
    website: 'https://rainbow-decor-ethiopia.lovable.app/#home',
    github: 'https://github.com/webniereagency/webniereagencyspreload1',
  },
  {
    name: 'Black Potion Sedona',
    location: 'Sedona, USA',
    industry: 'Coffee & Crystals',
    before: 'Limited online presence',
    solution: 'Full brand experience with menu, services, gallery',
    outcome: 'International project showcasing versatility',
    website: 'https://blackpotionsedona.github.io/new/#/',
    github: null,
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-card/30">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(45deg, hsl(var(--primary)) 25%, transparent 25%),
                          linear-gradient(-45deg, hsl(var(--primary)) 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, hsl(var(--primary)) 75%),
                          linear-gradient(-45deg, transparent 75%, hsl(var(--primary)) 75%)`,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
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
            {'<'} Portfolio {'/>'} 
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Real <span className="gradient-text">Results</span> for Real Businesses
          </h2>
          <p className="text-muted-foreground text-lg">
            Each project tells a story of transformation. From struggling with 
            WhatsApp-only presence to thriving with professional websites.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500"
            >
              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.location} • {project.industry}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-code rounded bg-primary/10 text-primary">
                    Case Study
                  </span>
                </div>

                {/* Before/After */}
                <div className="space-y-3 mb-4">
                  <div className="flex gap-3">
                    <span className="text-xs font-semibold text-destructive uppercase tracking-wider shrink-0 w-16">
                      Before
                    </span>
                    <p className="text-sm text-muted-foreground">{project.before}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider shrink-0 w-16">
                      Solution
                    </span>
                    <p className="text-sm text-muted-foreground">{project.solution}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xs font-semibold text-green-500 uppercase tracking-wider shrink-0 w-16">
                      Result
                    </span>
                    <p className="text-sm text-muted-foreground">{project.outcome}</p>
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-border/50">
                  {project.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Visit Site
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                  {!project.website && !project.github && (
                    <span className="text-sm text-muted-foreground italic">
                      Project completed • Demo available on request
                    </span>
                  )}
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Local insight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground italic">
            "In Addis, customers trust businesses with websites. It's the new word-of-mouth."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
