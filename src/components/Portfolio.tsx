import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

// Import portfolio images
import cherchisCafeImg from '@/assets/portfolio/cherchis-cafe.png';
import cherchisCafe2Img from '@/assets/portfolio/cherchis-cafe-2.png';
import cherchisCafe3Img from '@/assets/portfolio/cherchis-cafe-3.png';
import cherchisCafe4Img from '@/assets/portfolio/cherchis-cafe-4.png';
import cherchisCafe5Img from '@/assets/portfolio/cherchis-cafe-5.png';
import cherchisCafe6Img from '@/assets/portfolio/cherchis-cafe-6.png';
import cherchisCafe7Img from '@/assets/portfolio/cherchis-cafe-7.png';
import cherchisCafe8Img from '@/assets/portfolio/cherchis-cafe-8.png';
import nuhasGardenImg from '@/assets/portfolio/nuhas-garden.png';
import nuhasGarden2Img from '@/assets/portfolio/nuhas-garden-2.png';
import nuhasGarden3Img from '@/assets/portfolio/nuhas-garden-3.png';
import nuhasGarden4Img from '@/assets/portfolio/nuhas-garden-4.png';
import nuhasGarden5Img from '@/assets/portfolio/nuhas-garden-5.png';
import solinaCoffeeImg from '@/assets/portfolio/solina-coffee.png';
import solinaCoffee2Img from '@/assets/portfolio/solina-coffee-2.png';
import solinaCoffee3Img from '@/assets/portfolio/solina-coffee-3.png';
import solinaCoffee4Img from '@/assets/portfolio/solina-coffee-4.png';
import solinaCoffee5Img from '@/assets/portfolio/solina-coffee-5.png';
import solinaCoffee6Img from '@/assets/portfolio/solina-coffee-6.png';
import duskAddisImg from '@/assets/portfolio/dusk-addis.png';
import duskAddis2Img from '@/assets/portfolio/dusk-addis-2.png';
import duskAddis3Img from '@/assets/portfolio/dusk-addis-3.png';
import duskAddis4Img from '@/assets/portfolio/dusk-addis-4.png';
import duskAddis5Img from '@/assets/portfolio/dusk-addis-5.png';
import duskAddis6Img from '@/assets/portfolio/dusk-addis-6.png';
import blingDentalImg from '@/assets/portfolio/bling-dental.png';
import blingDental2Img from '@/assets/portfolio/bling-dental-2.png';
import blingDental3Img from '@/assets/portfolio/bling-dental-3.png';
import blingDental4Img from '@/assets/portfolio/bling-dental-4.png';
import rainbowDecorImg from '@/assets/portfolio/rainbow-decor.png';
import rainbowDecor2Img from '@/assets/portfolio/rainbow-decor-2.png';
import rainbowDecor3Img from '@/assets/portfolio/rainbow-decor-3.png';
import rainbowDecor4Img from '@/assets/portfolio/rainbow-decor-4.png';
import rainbowDecor5Img from '@/assets/portfolio/rainbow-decor-5.png';
import rainbowDecor6Img from '@/assets/portfolio/rainbow-decor-6.png';
import blackPotionImg from '@/assets/portfolio/black-potion.png';
import blackPotion2Img from '@/assets/portfolio/black-potion-2.png';
import blackPotion3Img from '@/assets/portfolio/black-potion-3.png';
import momensSalonImg from '@/assets/portfolio/momens-salon.png';
import momensSalon2Img from '@/assets/portfolio/momens-salon-2.png';
import momensSalon3Img from '@/assets/portfolio/momens-salon-3.png';
import momensSalon4Img from '@/assets/portfolio/momens-salon-4.png';

const projects = [
  {
    name: "Mo Men's Salon & Spa",
    location: 'Bole, Addis Ababa',
    industry: "Men's Grooming",
    before: 'No website, only WhatsApp & walk-ins, losing modern customers',
    solution: 'Full site with services list, pricing, gallery, easy booking links and map',
    outcome: 'Increase in quality walk-ins and WhatsApp inquiries; customers trust clear pricing',
    website: 'https://momenssalon.lovable.app/#',
    github: 'https://github.com/webniereagency/momenssalon-39538efe',
    images: [momensSalonImg, momensSalon2Img, momensSalon3Img, momensSalon4Img],
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
    images: [cherchisCafeImg, cherchisCafe2Img, cherchisCafe3Img, cherchisCafe4Img, cherchisCafe5Img, cherchisCafe6Img, cherchisCafe7Img, cherchisCafe8Img],
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
    images: [nuhasGardenImg, nuhasGarden2Img, nuhasGarden3Img, nuhasGarden4Img, nuhasGarden5Img],
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
    images: [solinaCoffeeImg, solinaCoffee2Img, solinaCoffee3Img, solinaCoffee4Img, solinaCoffee5Img, solinaCoffee6Img],
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
    images: [duskAddisImg, duskAddis2Img, duskAddis3Img, duskAddis4Img, duskAddis5Img, duskAddis6Img],
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
    images: [blingDentalImg, blingDental2Img, blingDental3Img, blingDental4Img],
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
    images: [rainbowDecorImg, rainbowDecor2Img, rainbowDecor3Img, rainbowDecor4Img, rainbowDecor5Img, rainbowDecor6Img],
  },
  {
    name: 'Black Potion Sedona',
    location: 'Sedona, USA',
    industry: 'Coffee & Crystals',
    before: 'Limited online presence',
    solution: 'Full brand experience with menu, services, gallery',
    outcome: 'International project showcasing versatility',
    website: 'https://blackpotionsedona.github.io/new/#/',
    github: 'https://github.com/webniereagency/blackpotionsedona',
    images: [blackPotionImg, blackPotion2Img, blackPotion3Img],
  },
];

interface PortfolioImageSliderProps {
  images: string[];
  projectName: string;
  website: string;
  isInView: boolean;
}

function PortfolioImageSlider({ images, projectName, website, isInView }: PortfolioImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all images when component mounts
  useEffect(() => {
    if (images.length <= 1) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    images.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, [images]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    // Only start sliding if in view, has multiple images, and images are preloaded
    if (isInView && images.length > 1 && imagesLoaded) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, 3000); // 3 seconds between transitions
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInView, images.length, imagesLoaded, goToNext]);

  // Reset to first image when not in view
  useEffect(() => {
    if (!isInView) {
      setCurrentIndex(0);
    }
  }, [isInView]);

  // Handle swipe gestures
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      goToNext();
    } else if (info.offset.x > swipeThreshold) {
      goToPrev();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0,
    }),
  };

  return (
    <div className="block border-t border-border/50 overflow-hidden">
      <div className="relative group/image h-48 overflow-hidden touch-pan-y">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.a
            key={currentIndex}
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <img
              src={images[currentIndex]}
              alt={`${projectName} website screenshot`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top"
            />
          </motion.a>
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-primary/0 group-hover/image:bg-primary/10 transition-colors duration-300 flex items-center justify-center z-10 pointer-events-none">
          <span className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-background/90 px-4 py-2 rounded-lg text-sm font-medium text-foreground">
            View Live Site
          </span>
        </div>
        
        {/* Swipe indicators - always visible */}
        {images.length > 1 && (
          <>
            {/* Left arrow indicator */}
            <button
              onClick={(e) => { e.preventDefault(); goToPrev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-background/90 border border-border/50 p-2 rounded-full shadow-lg hover:bg-background transition-all duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            {/* Right arrow indicator */}
            <button
              onClick={(e) => { e.preventDefault(); goToNext(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-background/90 border border-border/50 p-2 rounded-full shadow-lg hover:bg-background transition-all duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </>
        )}
        
        {/* Slide indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.preventDefault(); setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-primary w-4' : 'bg-foreground/30 hover:bg-foreground/50'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Portfolio() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 relative overflow-hidden bg-card/30">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(45deg, hsl(var(--primary)) 25%, transparent 25%),
                          linear-gradient(-45deg, hsl(var(--primary)) 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, hsl(var(--primary)) 75%),
                          linear-gradient(-45deg, transparent 75%, hsl(var(--primary)) 75%)`,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      }} />

      {/* Animated rain particles - like preloader */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-3 rounded-full bg-primary/20"
            initial={{
              x: `${Math.random() * 100}%`,
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: '100vh',
              opacity: [0, 0.5, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'linear',
            }}
          />
        ))}
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
            {'<'} {t('portfolio.sectionTag')} {'/>'} 
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t('portfolio.title')} <span className="gradient-text">{t('portfolio.titleHighlight')}</span> {t('portfolio.titleSuffix')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('portfolio.description')}
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
              className="group relative rounded-2xl bg-card border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-500"
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
                    {t('portfolio.caseStudy')}
                  </span>
                </div>

                {/* Before/After */}
                <div className="space-y-3 mb-4">
                  <div className="flex gap-3">
                    <span className="text-xs font-semibold text-destructive uppercase tracking-wider shrink-0 w-16">
                      {t('portfolio.before')}
                    </span>
                    <p className="text-sm text-muted-foreground">{project.before}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider shrink-0 w-16">
                      {t('portfolio.solution')}
                    </span>
                    <p className="text-sm text-muted-foreground">{project.solution}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xs font-semibold text-green-500 uppercase tracking-wider shrink-0 w-16">
                      {t('portfolio.result')}
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
                        {t('portfolio.visitSite')}
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-1" />
                        {t('portfolio.code')}
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

              {/* Portfolio Image Slider */}
              {project.images && project.images.length > 0 && project.website && (
                <PortfolioImageSlider
                  images={project.images}
                  projectName={project.name}
                  website={project.website}
                  isInView={isInView}
                />
              )}

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
            {t('portfolio.localInsight')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
