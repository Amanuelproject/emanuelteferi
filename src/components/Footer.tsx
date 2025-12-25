import { motion } from 'framer-motion';
import { Facebook, Instagram, Github, Linkedin, Heart } from 'lucide-react';
import logo from '@/assets/logo.png';

const socialLinks = [
  { icon: Github, href: 'https://github.com/webniereagency', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 border-t border-border/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="#home" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Emanuel Teferi" className="w-10 h-10 object-contain" />
              <span className="font-semibold text-xl text-foreground">
                Emanuel<span className="text-primary">.</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building premium web experiences for Ethiopian businesses. 
              Transforming ideas into digital reality.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Get In Touch</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Addis Ababa, Ethiopia</p>
              <p>+251 962 025 394</p>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Emanuel Teferi. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-primary" /> in Addis Ababa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
