'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'social' | 'web' | 'pricing';
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqData: FAQItem[] = [
    // General
    {
      id: 'what-is-hipeg',
      question: 'Cos\'è HipeG e che servizi offrite?',
      answer: 'HipeG è un\'agenzia di comunicazione digitale con sede a Palermo che offre servizi completi di marketing digitale. I nostri servizi includono: gestione social media (Instagram, Facebook, LinkedIn, TikTok), sviluppo siti web ed e-commerce, grafica e branding, video making, e-learning e consulenza di marketing digitale per aziende in Sicilia e tutta Italia.',
      category: 'general'
    },
    {
      id: 'service-areas',
      question: 'In quali zone operate?',
      answer: 'Siamo basati a Palermo e serviamo clienti in tutta la Sicilia e Italia. Offriamo servizi sia in presenza che da remoto, permettendoci di lavorare efficacemente con aziende di qualsiasi dimensione ovunque si trovino.',
      category: 'general'
    },
    {
      id: 'how-to-start',
      question: 'Come posso iniziare a lavorare con voi?',
      answer: 'È molto semplice! Contattaci tramite il form sul sito, email o telefono per una consulenza gratuita. Analizzeremo le tue esigenze, ti forniremo un preventivo personalizzato e, una volta approvato, inizieremo subito a lavorare sul tuo progetto.',
      category: 'general'
    },
    {
      id: 'target-audience',
      question: 'Che tipo di aziende servite?',
      answer: 'Lavoriamo con aziende di tutte le dimensioni: dalle startup alle PMI, dalle libere professioni alle grandi aziende. I nostri servizi sono personalizzati per ogni settore: ristoranti, hotel, e-commerce, studi professionali, aziende manifatturiere e molti altri.',
      category: 'general'
    },

    // Social Media
    {
      id: 'social-platforms',
      question: 'Su quali piattaforme social lavorate?',
      answer: 'Gestiamo tutti i principali social network: Instagram, Facebook, LinkedIn, TikTok e Twitter. Creiamo strategie personalizzate per ogni piattaforma, adattando i contenuti al target e agli obiettivi specifici di ciascun canale.',
      category: 'social'
    },
    {
      id: 'content-creation',
      question: 'Create voi i contenuti per i social media?',
      answer: 'Sì, il nostro team creativo produce tutti i contenuti: grafiche personalizzate, copywriting, foto, video e stories. Sviluppiamo un piano editoriale completo allineato con la tua brand identity e i tuoi obiettivi di business.',
      category: 'social'
    },
    {
      id: 'social-results',
      question: 'Che risultati posso aspettarmi dai social media?',
      answer: 'I risultati dipendono dal settore e dagli obiettivi, ma tipicamente vediamo: aumento dei follower del 25-50% nei primi 3 mesi, maggiore engagement e interazioni, crescita del traffico verso il sito web e incremento delle richieste di informazioni e vendite.',
      category: 'social'
    },
    {
      id: 'social-reporting',
      question: 'Fornite report sui risultati dei social media?',
      answer: 'Assolutamente sì. Forniamo report mensili dettagliati con tutte le metriche importanti: reach, engagement, crescita follower, traffico generato e conversioni. I dati sono presentati in modo chiaro e comprensibile.',
      category: 'social'
    },

    // Web Development
    {
      id: 'website-types',
      question: 'Che tipi di siti web realizzate?',
      answer: 'Realizziamo ogni tipo di sito web: siti vetrina, e-commerce, portali aziendali, landing page, blog e siti per strutture ricettive. Tutti i nostri siti sono responsive, ottimizzati SEO e veloci nel caricamento.',
      category: 'web'
    },
    {
      id: 'website-timeline',
      question: 'Quanto tempo ci vuole per realizzare un sito web?',
      answer: 'I tempi variano in base alla complessità: siti vetrina semplici 2-3 settimane, siti corporate 4-6 settimane, e-commerce 6-8 settimane. Forniamo sempre una timeline dettagliata nel preventivo iniziale.',
      category: 'web'
    },
    {
      id: 'website-maintenance',
      question: 'Offrite servizi di manutenzione per i siti web?',
      answer: 'Sì, offriamo pacchetti di manutenzione che includono: aggiornamenti di sicurezza, backup automatici, ottimizzazioni delle performance, supporto tecnico e piccole modifiche ai contenuti.',
      category: 'web'
    },
    {
      id: 'seo-included',
      question: 'L\'ottimizzazione SEO è inclusa?',
      answer: 'Tutti i nostri siti includono l\'ottimizzazione SEO di base: struttura ottimizzata, meta tag, sitemap XML, velocità di caricamento e responsive design. Offriamo anche servizi SEO avanzati come pacchetto aggiuntivo.',
      category: 'web'
    },

    // Pricing
    {
      id: 'pricing-structure',
      question: 'Come funziona il vostro sistema di prezzi?',
      answer: 'I nostri prezzi sono trasparenti e personalizzati. Per i social media offriamo pacchetti mensili fissi, per i siti web prezzi forfettari con eventuale rata di acconto. Tutti i prezzi sono IVA esclusa e vengono comunicati chiaramente nel preventivo.',
      category: 'pricing'
    },
    {
      id: 'payment-methods',
      question: 'Quali metodi di pagamento accettate?',
      answer: 'Accettiamo pagamenti tramite PayPal per i pagamenti online e bonifico bancario. Per i servizi ricorrenti offriamo addebito automatico mensile. Tutti i pagamenti sono sicuri e certificati.',
      category: 'pricing'
    },
    {
      id: 'contract-terms',
      question: 'Ci sono vincoli contrattuali?',
      answer: 'Per i social media offriamo contratti flessibili con disdetta con preavviso di 30 giorni. Per i siti web, il pagamento è forfettario senza vincoli successivi. Siamo trasparenti: lavoriamo per guadagnarci la tua fiducia, non per vincolarti.',
      category: 'pricing'
    },
    {
      id: 'custom-quotes',
      question: 'Offrite preventivi personalizzati?',
      answer: 'Certamente! Ogni progetto è unico e meritiamo un preventivo su misura. Contattaci per una consulenza gratuita dove analizzeremo le tue esigenze specifiche e ti forniremo un preventivo dettagliato e personalizzato.',
      category: 'pricing'
    }
  ];

  const categories = [
    { id: 'general', label: 'Generale' },
    { id: 'social', label: 'Social Media' },
    { id: 'web', label: 'Siti Web' },
    { id: 'pricing', label: 'Prezzi' }
  ];

  const filteredFAQs = faqData.filter(faq => faq.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Generate FAQ JSON-LD structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 bg-[var(--bg-secondary)]" ref={ref}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">Domande Frequenti</h2>
          <motion.div 
            className="w-20 h-1 bg-purple-600 mt-2 mb-4 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-[var(--text-secondary)]">
            Trova le risposte alle domande più comuni sui nostri servizi di comunicazione digitale a Palermo
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-[var(--card-bg)] rounded-lg p-2 border border-[var(--card-border)] flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-[var(--card-bg)] rounded-xl shadow-lg border border-[var(--card-border)] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[var(--bg-primary)] transition-colors"
                >
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-[var(--text-secondary)] mb-6">
            Non trovi la risposta che cercavi?
          </p>
          <motion.a
            href="#contatti"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contattaci Direttamente
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}