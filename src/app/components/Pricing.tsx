'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pricingPlans = [
    {
      name: "Starter",
      price: "299",
      period: "mese",
      description: "Perfetto per piccole attività che vogliono iniziare con la presenza digitale",
      features: [
        "Sito web responsive (5 pagine)",
        "Ottimizzazione SEO base",
        "Gestione social (2 piattaforme)",
        "3 post a settimana",
        "Supporto email",
        "Analytics mensili"
      ],
      popular: false,
      ctaText: "Inizia ora"
    },
    {
      name: "Professional",
      price: "599",
      period: "mese",
      description: "La soluzione completa per aziende che vogliono crescere online",
      features: [
        "Sito web avanzato (10 pagine)",
        "E-commerce base (fino a 50 prodotti)",
        "Gestione social (4 piattaforme)",
        "5 post a settimana + stories",
        "Campagne pubblicitarie (budget escluso)",
        "Video promozionali (2/mese)",
        "Supporto prioritario",
        "Analytics dettagliati"
      ],
      popular: true,
      ctaText: "Scegli Professional"
    },
    {
      name: "Enterprise",
      price: "999",
      period: "mese",
      description: "Soluzione su misura per grandi aziende con esigenze specifiche",
      features: [
        "Sito web personalizzato (illimitate)",
        "E-commerce avanzato (prodotti illimitati)",
        "Gestione social completa",
        "Post quotidiani + contenuti premium",
        "Campagne pubblicitarie avanzate",
        "Video professionali (4/mese)",
        "Branding e identità visiva",
        "Corsi e-learning personalizzati",
        "Account manager dedicato",
        "Supporto 24/7"
      ],
      popular: false,
      ctaText: "Contattaci"
    }
  ];

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
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">I Nostri Prezzi</h2>
          <motion.div 
            className="w-20 h-1 bg-purple-600 mt-2 mb-4 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <p className="text-gray-600">Scegli il piano perfetto per le tue esigenze digitali</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
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
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
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

              <motion.button
                className={`w-full py-3 px-6 rounded-full font-semibold transition duration-300 ${
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
              </motion.button>
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