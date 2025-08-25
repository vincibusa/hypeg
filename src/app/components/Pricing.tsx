'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialPlans = [
    {
      id: "a-tutto-meta",
      name: "A tutto Meta",
      price: "99,90",
      period: "mese",
      category: "Social",
      description: "Gestione completa di Instagram e Facebook per la tua presenza digitale",
      features: [
        "Gestione Pagina Instagram e Facebook",
        "3 grafiche settimanali personalizzate (uguali per entrambi i canali)",
        "3 pubblicazioni a settimana + 3 stories",
        "Grafica personalizzata e copy"
      ],
      popular: false,
      ctaText: "Inizia ora"
    },
    {
      id: "a-tutto-meta-20",
      name: "A tutto Meta 2.0",
      price: "149,90",
      period: "mese",
      category: "Social",
      description: "Versione avanzata con campagne pubblicitarie e reporting",
      features: [
        "Gestione Pagina Instagram e Facebook",
        "3 grafiche settimanali (uguali per entrambi i canali)",
        "3 pubblicazioni a settimana + 3 stories",
        "Grafica personalizzata e copy",
        "Campagne a pagamento",
        "Report trimestrale"
      ],
      popular: true,
      ctaText: "Piano Consigliato"
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      price: "69,90",
      period: "mese",
      category: "Social",
      description: "Gestione professionale della tua presenza LinkedIn",
      features: [
        "Gestione Pagina LinkedIn",
        "2 pubblicazioni a settimana",
        "Grafica personalizzata e copy"
      ],
      popular: false,
      ctaText: "Scegli LinkedIn"
    },
    {
      id: "tiktok",
      name: "TikTok",
      price: "199,90",
      period: "mese",
      category: "Social",
      description: "Gestione e montaggio professionale per TikTok",
      features: [
        "Gestione e montaggio",
        "2 pubblicazioni a settimana"
      ],
      popular: false,
      ctaText: "Scegli TikTok"
    },
    {
      id: "pack-professionale",
      name: "Pack Professionale",
      price: "499,90",
      period: "mese",
      category: "Social",
      description: "Gestione completa di tutti i canali social",
      features: [
        "Instagram - Facebook - TikTok - LinkedIn",
        "Creatività grafica + copy",
        "5 post + 5 stories a settimana (uguali)",
        "Pubblicazione",
        "1 Reel a settimana",
        "4 video TikTok al mese"
      ],
      popular: false,
      ctaText: "All-in-One"
    }
  ];

  const webPlans = [
    {
      id: "sito-landing",
      name: "Sito Landing Page",
      price: "299,90",
      period: "anno",
      category: "Web",
      description: "Pagina singola efficace per presentare la tua attività",
      features: [
        "1 pagina",
        "Creazione Sito Efficace + dominio web .it o .com",
        "Ottimizzazione SEO base: Strutturazione SEO on-page per miglior posizionamento",
        "Design grafico personalizzato: Realizzazione grafica del sito, responsive design"
      ],
      popular: false,
      ctaText: "Scegli Landing"
    },
    {
      id: "sito-standard",
      name: "Sito Standard",
      price: "390,90",
      period: "anno",
      category: "Web",
      description: "Sito completo fino a 5 pagine per piccole e medie aziende",
      features: [
        "Fino a 5 pagine",
        "Creazione Sito Efficace + dominio web .it o .com",
        "Ottimizzazione SEO base: Strutturazione SEO on-page per miglior posizionamento",
        "Design grafico personalizzato: Realizzazione grafica del sito, responsive design"
      ],
      popular: true,
      ctaText: "Più Richiesto"
    },
    {
      id: "sito-large",
      name: "Sito Large",
      price: "799,90",
      period: "anno",
      category: "Web",
      description: "Sito professionale fino a 32 pagine per aziende strutturate",
      features: [
        "Fino a 32 pagine",
        "Creazione Sito Efficace + dominio web .it o .com",
        "Ottimizzazione SEO base: Strutturazione SEO on-page per miglior posizionamento",
        "Design grafico personalizzato: Realizzazione grafica del sito, responsive design"
      ],
      popular: false,
      ctaText: "Scegli Large"
    },
    {
      id: "e-shop-basic",
      name: "E-shop Basic",
      price: "999,90",
      period: "anno",
      category: "Web",
      description: "E-commerce completo fino a 100 prodotti",
      features: [
        "Analisi e consulenza: Definizione requisiti, target e funzionalità richieste",
        "Design grafico personalizzato: Realizzazione grafica del sito, responsive design",
        "Sviluppo e implementazione eShop: Creazione della piattaforma e-commerce",
        "Integrazione sistemi di pagamento: PayPal, carte di credito, altri metodi",
        "Inserimento prodotti (fino a 100 prodotti): Caricamento dati prodotti, descrizioni e immagini",
        "Formazione utilizzo CMS: Addestramento all'uso della piattaforma",
        "Ottimizzazione SEO base: Strutturazione SEO on-page",
        "Hosting e dominio",
        "Manutenzione e supporto"
      ],
      popular: false,
      ctaText: "Inizia a Vendere"
    },
    {
      id: "e-shop-ultra",
      name: "E-shop Ultra",
      price: "1499,90",
      period: "anno",
      category: "Web",
      description: "E-commerce avanzato fino a 500 prodotti",
      features: [
        "Analisi e consulenza: Definizione requisiti, target e funzionalità richieste",
        "Design grafico personalizzato: Realizzazione grafica del sito, responsive design",
        "Sviluppo e implementazione eShop: Creazione della piattaforma e-commerce",
        "Integrazione sistemi di pagamento: PayPal, carte di credito, altri metodi",
        "Inserimento prodotti (fino a 500 prodotti): Caricamento dati prodotti, descrizioni e immagini",
        "Formazione utilizzo CMS: Addestramento all'uso della piattaforma",
        "Ottimizzazione SEO base: Strutturazione SEO on-page",
        "Hosting e dominio",
        "Manutenzione e supporto"
      ],
      popular: false,
      ctaText: "Vendita Pro"
    },
    {
      id: "sito-ricettive",
      name: "Sito Strutture Ricettive",
      price: "1499,90",
      period: "anno",
      category: "Web",
      description: "Piattaforma specializzata per hotel, B&B e strutture ricettive",
      features: [
        "Analisi e consulenza: Definizione esigenze specifiche e target clienti",
        "Design personalizzato: Sviluppo piattaforma eCommerce",
        "Catalogo servizi e prodotti, gestione disponibilità e prenotazioni",
        "Collegamento con software gestionale della struttura (PMS)",
        "Sistemi di pagamento sicuri: PayPal, carte di credito, bonifico",
        "Inserimento contenuti e prodotti: Caricamento pacchetti, servizi, descrizioni",
        "Formazione gestione piattaforma: Training per gestione ordini, disponibilità, offerte",
        "Ottimizzazione SEO base: Ottimizzazione per motori di ricerca e visibilità locale",
        "Hosting e dominio (12 mesi): Registrazione dominio e hosting dedicato",
        "Supporto e manutenzione: Aggiornamenti, assistenza e sicurezza"
      ],
      popular: false,
      ctaText: "Specializzato"
    }
  ];

  const graphicsPlans = [
    {
      id: "grafica",
      name: "Grafica",
      price: "59,90",
      period: "mese",
      category: "Grafica",
      description: "Servizio di grafica personalizzata per le tue esigenze",
      features: [
        "2 grafiche personalizzate a settimana"
      ],
      popular: false,
      ctaText: "Scegli Grafica"
    }
  ];


  const [activeCategory, setActiveCategory] = useState('Social');
  const categories = ['Social', 'Web', 'Grafica'];

  const getPlansForCategory = (category: string) => {
    switch (category) {
      case 'Social': return socialPlans;
      case 'Web': return webPlans;
      case 'Grafica': return graphicsPlans;
      default: return socialPlans;
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="prezzi" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">I Nostri Servizi</h2>
          <motion.div 
            className="w-20 h-1 bg-purple-600 mt-2 mb-4 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <p className="text-gray-600 mb-8">Scopri i nostri pacchetti personalizzati per la tua presenza digitale</p>
          
          {/* Tabs per categorie */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1 inline-flex">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category === 'Social' ? 'Pacchetti Social' : 
                   category === 'Web' ? 'Pacchetti Web' : 
                   'Grafica'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          key={activeCategory}
        >
          {getPlansForCategory(activeCategory).map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col ${
                plan.popular 
                  ? 'ring-2 ring-purple-600 transform scale-105' 
                  : 'border border-gray-200'
              }`}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {plan.popular && (
                <motion.div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Più Popolare
                  </span>
                </motion.div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-purple-600">€{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                  <div className="text-xs text-gray-500">+IVA</div>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.7 + index * 0.2 + featureIndex * 0.1 }}
                  >
                    <svg className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href={`/checkout/${plan.id}`}
                className={`block w-full py-3 px-6 rounded-full font-semibold transition duration-300 text-center mt-auto ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
              >
                {plan.ctaText}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-gray-600 mb-4">
            Hai esigenze specifiche? Creiamo un piano personalizzato per te.
          </p>
          <motion.a
            href="#contatti"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Richiedi Preventivo Personalizzato
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}