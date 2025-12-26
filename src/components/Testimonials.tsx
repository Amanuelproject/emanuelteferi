import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const testimonials = [
  {
    id: 1,
    name: 'Dawit Hailu',
    role: 'Owner, Café Business',
    location: 'Bole, Addis Ababa',
    content: 'ኤማኑኤል ለካፌያችን ድረ-ገጽ ሲሰራልን በጣም ፕሮፌሽናል ነበር። ከWhatsApp ብቻ ወደ ሙሉ ድረ-ገጽ ስንቀየር ደንበኞቻችን በGoogle ማግኘት ጀመሩ። The website brought us so many new customers - even tourists find us now!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Tigist Alemayehu',
    role: 'Founder, Event Planning',
    location: 'Kazanchis, Addis Ababa',
    content: 'I was skeptical about hiring someone so young, but Emanuel proved me wrong! He understood exactly what my event business needed. Now couples find our wedding packages online instead of just asking around. Business doubled in 3 months.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Yonas Bekele',
    role: 'Manager, Dental Clinic',
    location: 'Mexico Area, Addis Ababa',
    content: 'ድሮ ሰዎች ስለ ክሊኒካችን በስልክ ብቻ ይጠይቁ ነበር። አሁን ሁሉም ነገር online ነው - services, prices, booking. Emanuel made it so easy. Patients trust us more because we look professional online.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Hana Tesfaye',
    role: 'Owner, Boutique Shop',
    location: 'Piassa, Addis Ababa',
    content: 'What I love about working with Emanuel is he gets the local market. He knows what Ethiopian customers want to see. My boutique website feels authentic - not like those copy-paste templates. Sales from Instagram DMs moved to proper orders!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Abebe Worku',
    role: 'Restaurant Owner',
    location: 'Gerji, Addis Ababa',
    content: 'Emanuel is special - smart, hardworking, and he actually listens. Our restaurant menu is now online with photos, people check before coming. ከዚህ በፊት ደንበኞች ስልክ ይደውሉ ነበር ምን እንዳለን ለማወቅ። አሁን ሁሉም ነገር clear ነው!',
    rating: 5,
  },
];

export function Testimonials() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-cycle when section is in view
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // 5 seconds between transitions

    return () => clearInterval(interval);
  }, [isInView]);

  // Intersection observer to detect when section is visible
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.3);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      {/* Floating quote marks */}
      <div className="absolute top-20 left-10 text-primary/5">
        <Quote className="w-32 h-32" />
      </div>
      <div className="absolute bottom-20 right-10 text-primary/5 rotate-180">
        <Quote className="w-32 h-32" />
      </div>

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
            {'<'} {t('testimonials.sectionTag')} {'/>'} 
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t('testimonials.title')} <span className="gradient-text">{t('testimonials.titleHighlight')}</span> {t('testimonials.titleSuffix')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('testimonials.description')}
          </p>
        </motion.div>

        {/* Stacked Cards */}
        <div className="relative max-w-4xl mx-auto h-[420px] md:h-[380px]">
          {testimonials.map((testimonial, index) => {
            const offset = index - activeIndex;
            // Handle wrapping for circular navigation
            const wrappedOffset = offset > testimonials.length / 2 
              ? offset - testimonials.length 
              : offset < -testimonials.length / 2 
                ? offset + testimonials.length 
                : offset;
            
            const isActive = wrappedOffset === 0;
            const isVisible = Math.abs(wrappedOffset) <= 2;
            
            // Calculate visual properties for stacked depth effect
            const zIndex = 10 - Math.abs(wrappedOffset);
            const scale = 1 - Math.abs(wrappedOffset) * 0.04;
            const translateY = wrappedOffset * 16;
            const opacity = isVisible ? 1 - Math.abs(wrappedOffset) * 0.25 : 0;
            const blur = Math.abs(wrappedOffset) * 1.5;

            if (!isVisible) return null;

            return (
              <motion.div
                key={testimonial.id}
                onClick={() => setActiveIndex(index)}
                animate={{
                  scale,
                  y: translateY,
                  opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{
                  type: 'tween',
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-x-0 mx-auto cursor-pointer"
                style={{ zIndex }}
              >
                <div
                  className={`bg-card border rounded-2xl p-6 md:p-8 shadow-2xl transition-colors duration-500 ${
                    isActive
                      ? 'border-primary/40 shadow-primary/10'
                      : 'border-border/30'
                  }`}
                >
                  {/* Quote icon */}
                  <Quote className="w-10 h-10 text-primary/30 mb-4" />
                  
                  {/* Content */}
                  <p className="text-foreground/90 text-base md:text-lg leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30">
                      <span className="text-primary font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/20 w-2 hover:bg-muted-foreground/40'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Local touch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm font-code">
            {t('testimonials.localTouch')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
