import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import Questionnaire from '@/components/Questionnaire';
import { Footer } from '@/components/Footer';

const StartProject = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Questionnaire />
      </main>
      <Footer />
    </div>
  );
};

export default StartProject;
