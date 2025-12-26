import { motion } from 'framer-motion';
import emanuelPhoto from '@/assets/emanuel-photo.png';

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl" />
              
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 glow-border">
                <img
                  src={emanuelPhoto}
                  alt="Emanuel Teferi - Web Developer"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Available for hire</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-code text-sm uppercase tracking-widest mb-4 block">
              {'<'} About Me {'/>'} 
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Building <span className="gradient-text">Digital Bridges</span> in Ethiopia
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                My name is Emmanuel Tafari, an Ethiopian-based web developer who started 
                learning to code around the age of 10 — mostly out of curiosity and a love 
                for figuring out how things work. For years, I balanced that curiosity with 
                school, focusing heavily on academics and doing pretty well along the way.
              </p>
              <p>
                Then Grade 12 happened. Like many Ethiopian students, things didn't go as 
                planned — and honestly, that moment became a wake-up call. I leaned fully 
                into the skill I had quietly been building for years and decided to take 
                it seriously.
              </p>
              <p>
                Today, I help cafés, salons, clinics, and local businesses in Addis Ababa 
                show up online with modern, practical websites that actually solve real 
                problems — from visibility to bookings and orders. I keep things simple: 
                understand the business, build what's needed, and deliver something owners 
                are proud to share.
              </p>
              <p>
                Beyond client work, I'm an entrepreneur at heart. Web development is not 
                just what I do — it's the foundation I'm using to build bigger ideas and 
                contribute, in my own way, to how Ethiopia is represented to the world 
                through technology.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Python'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-code rounded-lg bg-secondary text-secondary-foreground border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
