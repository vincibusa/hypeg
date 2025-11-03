'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Siti Web & eCommerce",
      description: "Realizziamo siti web professionali, e-commerce e portali aziendali ottimizzati SEO, responsive e veloci. Creiamo siti su misura per far crescere il tuo business online con design moderno e funzionalità avanzate.",
      technologies: "WordPress, Shopify, Next.js, SEO ottimizzato",
      image: "/5.jpeg"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Social Media Management",
      description: "Gestiamo i tuoi profili social per far crescere il tuo brand. Contenuti creativi, strategie mirate e campagne pubblicitarie efficaci su Instagram, Facebook, TikTok e LinkedIn per aumentare engagement e conversioni.",
      technologies: "Instagram, Facebook, TikTok, LinkedIn, Meta Ads",
      image: "/6.jpeg"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Video & Foto Making",
      description: "Realizziamo video aziendali, spot pubblicitari e contenuti visual per social media. Dallo shooting al montaggio, raccontiamo la tua attività con immagini e video capaci di emozionare e coinvolgere il tuo pubblico.",
      technologies: "Video editing, Motion graphics, Fotografia aziendale",
      image: "/images/services/video-production.jpg"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Grafica & Branding",
      description: "Costruiamo o rinnoviamo l'immagine del tuo brand con loghi, identità visive, brochure e materiali di comunicazione. Creiamo un'identità visiva forte e coerente che rende unico il tuo brand.",
      technologies: "Logo design, Brand identity, Grafica stampa e digital",
      image: "/1.jpeg"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "E-learning & Formazione Online",
      description: "Progettiamo piattaforme e-learning e corsi online personalizzati. Formazione digitale, webinar interattivi e contenuti didattici multimediali per far crescere le competenze del tuo team e della tua azienda.",
      technologies: "Piattaforme LMS, Contenuti interattivi, Webinar",
      image: "/7.jpeg"
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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="servizi" className="relative py-20 overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-indigo-500/15 to-purple-600/15 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">Servizi di Comunicazione Digitale a Palermo</h2>
          <motion.div 
            className="w-20 h-1 bg-purple-600 mt-2 mb-4 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <p className="text-[var(--text-secondary)]">
            <strong>HipeG</strong> offre servizi completi di marketing digitale per aziende a <strong>Palermo</strong>, <strong>Sicilia</strong> e tutta <strong>Italia</strong>. Dalla creazione di siti web al social media management, dal video marketing alla grafica pubblicitaria.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative rounded-xl shadow-lg overflow-hidden h-[400px] group"
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Full image background */}
              <div className="absolute inset-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 group-hover:from-black/80 group-hover:via-black/60 group-hover:to-black/40 transition-all duration-300"></div>
              
              {/* Icon */}
              <motion.div 
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-lg text-white z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {service.icon}
              </motion.div>
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-white/90 leading-relaxed mb-3">
                  {service.description}
                </p>
                {service.technologies && (
                  <small className="text-purple-300 opacity-90 mt-3 block font-medium">{service.technologies}</small>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}