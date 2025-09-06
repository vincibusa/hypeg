'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  text: string;
  image: string;
  service: string;
  date: string;
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials: Testimonial[] = [
    {
      id: "testimonial-1",
      name: "Maria Rossi",
      position: "Proprietaria",
      company: "Ristorante La Siciliana",
      rating: 5,
      text: "HipeG ha trasformato completamente la nostra presenza online. I nostri social sono cresciuti del 300% e abbiamo visto un aumento significativo delle prenotazioni. Il team è professionale, creativo e sempre disponibile.",
      image: "/images/testimonials/maria-rossi.jpg",
      service: "Social Media Management",
      date: "2025-08-15"
    },
    {
      id: "testimonial-2",
      name: "Giuseppe Bianchi",
      position: "CEO",
      company: "Bianchi Costruzioni",
      rating: 5,
      text: "Il nuovo sito web realizzato da HipeG ha superato ogni aspettativa. Design moderno, veloce e ottimizzato SEO. Abbiamo ottenuto il 40% di richieste in più attraverso il sito. Consigliatissimi!",
      image: "/images/testimonials/giuseppe-bianchi.jpg",
      service: "Sviluppo Sito Web",
      date: "2025-07-22"
    },
    {
      id: "testimonial-3",
      name: "Francesca Lombardi",
      position: "Marketing Manager",
      company: "Hotel Mediterraneo",
      rating: 5,
      text: "Collaboriamo con HipeG da oltre un anno per la gestione dei nostri social media e siamo estremamente soddisfatti. Contenuti di qualità, strategia mirata e risultati concreti. Il ROI è stato fantastico!",
      image: "/images/testimonials/francesca-lombardi.jpg",
      service: "Social Media & Video",
      date: "2025-06-10"
    },
    {
      id: "testimonial-4",
      name: "Antonio Russo",
      position: "Fondatore",
      company: "Russo E-commerce",
      rating: 5,
      text: "HipeG ha sviluppato il nostro e-commerce da zero e ci ha accompagnato nella crescita digitale. Piattaforma perfetta, formazione completa e supporto continuo. Le vendite online sono triplicate!",
      image: "/images/testimonials/antonio-russo.jpg",
      service: "E-commerce Development",
      date: "2025-05-18"
    },
    {
      id: "testimonial-5",
      name: "Elena Verde",
      position: "Direttrice",
      company: "Studio Legale Verde & Associati",
      rating: 4,
      text: "Professionalità, competenza e creatività. HipeG ha curato la nostra comunicazione digitale con grande attenzione ai dettagli. Il LinkedIn aziendale ha portato nuovi clienti qualificati al nostro studio.",
      image: "/images/testimonials/elena-verde.jpg",
      service: "LinkedIn Management",
      date: "2025-04-25"
    },
    {
      id: "testimonial-6",
      name: "Marco Neri",
      position: "Titolare",
      company: "Neri Automotive",
      rating: 5,
      text: "Grazie ad HipeG abbiamo finalmente una strategia di comunicazione digitale efficace. I video aziendali realizzati sono di qualità cinematografica e hanno dato una svolta alla nostra immagine aziendale.",
      image: "/images/testimonials/marco-neri.jpg",
      service: "Video Making & Branding",
      date: "2025-03-12"
    }
  ];

  // Generate Review structured data for all testimonials
  const reviewStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HipeG",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
      "reviewCount": testimonials.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map(testimonial => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": testimonial.text,
      "datePublished": testimonial.date,
      "publisher": {
        "@type": "Organization",
        "name": testimonial.company
      }
    }))
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section id="testimonials" className="py-20 bg-[var(--bg-primary)]" ref={ref}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewStructuredData) }}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">Cosa Dicono i Nostri Clienti</h2>
          <motion.div 
            className="w-20 h-1 bg-purple-600 mt-2 mb-4 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-[var(--text-secondary)]">
            La soddisfazione dei nostri clienti è la nostra priorità. Scopri le esperienze di chi ha scelto HipeG per la comunicazione digitale a Palermo.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">
              {(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              <StarRating rating={Math.round(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length)} />
            </div>
            <div className="text-[var(--text-secondary)]">Valutazione Media</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">{testimonials.length}+</div>
            <div className="text-[var(--text-secondary)]">Recensioni Positive</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">98%</div>
            <div className="text-[var(--text-secondary)]">Clienti Soddisfatti</div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-[var(--card-bg)] rounded-xl shadow-lg p-6 border border-[var(--card-border)] h-full flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              {/* Rating */}
              <div className="flex justify-between items-start mb-4">
                <StarRating rating={testimonial.rating} />
                <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-2 py-1 rounded-full">
                  {testimonial.service}
                </span>
              </div>

              {/* Review Text */}
              <blockquote className="text-[var(--text-secondary)] leading-relaxed mb-6 flex-grow">
                "{testimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {testimonial.position}
                  </div>
                  <div className="text-sm text-[var(--accent-primary)] font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-[var(--text-secondary)] mb-6">
            Vuoi diventare il nostro prossimo cliente soddisfatto?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              Richiedi Preventivo
            </motion.a>
            <motion.a
              href="#prezzi"
              className="inline-block border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] font-semibold py-3 px-8 rounded-full hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('prezzi')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Vedi i Prezzi
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}