import { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Check if user has seen preloader in this session
    const seen = sessionStorage.getItem('preloaderSeen');
    if (seen) {
      setShowPreloader(false);
      setHasSeenPreloader(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setHasSeenPreloader(true);
    sessionStorage.setItem('preloaderSeen', 'true');
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle rain effect */}
      <RainEffect />
      
      {/* Preloader */}
      {showPreloader && !hasSeenPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Main content */}
      <div className={showPreloader && !hasSeenPreloader ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Navbar />
        <main>
          <Hero />
          <SectionDivider />
          <SectionCTA />
          <About />
          <SectionDivider flip />
          <SectionCTA />
          <Testimonials />
          <SectionDivider />
          <SectionCTA />
          <Services />
          <SectionDivider flip />
          <SectionCTA />
          <Portfolio />
          <SectionDivider />
          <SectionCTA />
          <Contact />
          <SectionDivider flip />
          <Gallery />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
