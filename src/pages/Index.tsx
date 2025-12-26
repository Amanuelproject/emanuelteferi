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
import { AnimationProvider } from '@/animations/AnimationProvider';

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
    <div className="min-h-screen bg-background">
      {/* Preloader */}
      {showPreloader && !hasSeenPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Main content with animation layer */}
      <AnimationProvider>
        <div className={showPreloader && !hasSeenPreloader ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Testimonials />
            <Services />
            <Portfolio />
            <Contact />
          </main>
          <Footer />
        </div>
      </AnimationProvider>
    </div>
  );
};

export default Index;
