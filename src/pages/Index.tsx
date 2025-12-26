import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Testimonials } from '@/components/Testimonials';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SectionCTA } from '@/components/SectionCTA';
import { SectionDivider } from '@/components/SectionDivider';
import { Gallery } from '@/components/Gallery';
import { RainEffect } from '@/components/RainEffect';

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [hasSeenPreloader, setHasSeenPreloader] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Check if user has seen preloader in this session
    const seen = sessionStorage.getItem('preloaderSeen');
    if (seen) {
      setShowPreloader(false);
      setHasSeenPreloader(true);
      setContentReady(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setHasSeenPreloader(true);
    sessionStorage.setItem('preloaderSeen', 'true');
    // Small delay before starting entrance animations
    setTimeout(() => setContentReady(true), 100);
  };

  // Staggered entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle rain effect */}
      <RainEffect />
      
      {/* Preloader */}
      {showPreloader && !hasSeenPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Main content with smooth entrance */}
      <motion.div 
        className={showPreloader && !hasSeenPreloader ? 'opacity-0' : ''}
        variants={containerVariants}
        initial="hidden"
        animate={contentReady ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants}>
          <Navbar />
        </motion.div>
        <main>
          <motion.div variants={itemVariants}>
            <Hero />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionDivider />
            <SectionCTA />
          </motion.div>
          <motion.div variants={itemVariants}>
            <About />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionDivider flip />
            <SectionCTA />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Testimonials />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionDivider />
            <SectionCTA />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Services />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionDivider flip />
            <SectionCTA />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Portfolio />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionDivider />
            <SectionCTA />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Contact />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionDivider flip />
            <Gallery />
          </motion.div>
        </main>
        <motion.div variants={itemVariants}>
          <Footer />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
