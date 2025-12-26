import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';

export function Footer() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const footerLinks = [
    { labelKey: 'nav.home', href: '#home' },
    { labelKey: 'nav.about', href: '#about' },
    { labelKey: 'nav.services', href: '#services' },
    { labelKey: 'nav.portfolio', href: '#portfolio' },
    { labelKey: 'nav.contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    // If we're not on the home page, navigate there first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative py-16 border-t border-border/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center gap-3 mb-4 cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 rounded-full border-2 border-primary/60 animate-pulse" style={{ margin: '-4px', padding: '4px' }} />
                <div className="absolute inset-0 rounded-full bg-primary/10" style={{ margin: '-2px', padding: '2px' }} />
                <img src={logo} alt="Emanuel Teferi" className="w-10 h-10 object-contain relative z-10" />
              </div>
              <span className="font-semibold text-xl text-foreground">
                Emanuel<span className="text-primary">.</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.labelKey}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t(link.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Emanuel Teferi. {t('footer.allRightsReserved')}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Crafted with <Heart className="w-4 h-4 text-primary animate-pulse" /> in Addis Ababa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
