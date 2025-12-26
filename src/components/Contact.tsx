import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Copy, Check, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const paymentMethods = [
  {
    name: 'Awash Bank',
    account: '013201413534800',
    holder: 'Amanuel Teferi',
  },
  {
    name: 'Telebirr',
    account: '+251 962 025 394',
    holder: 'Amanuel Teferi',
  },
  {
    name: 'CBE',
    account: '1000724854501',
    holder: 'Amanuel Teferi',
  },
];

export function Contact() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: t('contact.payment.copied'),
      description: t('contact.payment.copiedDesc'),
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-background" />

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
            {'<'} {t('contact.sectionTag')} {'/>'} 
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {t('contact.title')} <span className="gradient-text">{t('contact.titleHighlight')}</span> {t('contact.titleSuffix')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Quick Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {t('contact.form.quickContact')}
              </h3>
              
              <div className="space-y-4">
                <a
                  href="tel:+251962025394"
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t('contact.form.callNow')}</p>
                    <p className="text-sm text-muted-foreground">+251 962 025 394</p>
                  </div>
                </a>
                
              <a
                  href="https://wa.me/251922363691"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">{t('contact.form.chatOnWhatsApp')}</p>
                  </div>
                </a>
                
                <a
                  href="mailto:best@emanuelteferi.site"
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t('contact.form.email')}</p>
                    <p className="text-sm text-muted-foreground">best@emanuelteferi.site</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {t('contact.payment.title')}
              </h3>

              <p className="text-muted-foreground text-sm mb-6">
                {t('contact.payment.description')}
              </p>

              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div
                    key={method.name}
                    className="p-4 rounded-xl bg-secondary/50 border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{method.name}</span>
                      <button
                        onClick={() => copyToClipboard(method.account, index)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="font-code text-primary text-lg">{method.account}</p>
                    <p className="text-sm text-muted-foreground mt-1">{method.holder}</p>
                  </div>
                ))}
              </div>

              {/* Location */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{t('contact.payment.servingLocation')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
