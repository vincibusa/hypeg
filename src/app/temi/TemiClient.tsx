'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

interface Theme {
  id: string;
  name: string;
  description: string;
  category: 'E-commerce' | 'Corporate' | 'Portfolio' | 'Blog' | 'Landing Page';
  technologies: string[];
  image: string;
  demoUrl: string;
  featured: boolean;
}

const themes: Theme[] = [
  {
    id: '1',
    name: 'Business Pro',
    description: 'Un tema professionale per aziende di ogni dimensione con design elegante e funzionalità avanzate.',
    category: 'Corporate',
    technologies: ['Next.Js', 'Typescript', 'Tailwind', 'Framer Motion'],
    image: '/images/themes/landing.png',
    demoUrl: 'https://agency-landing-theta.vercel.app/',
    featured: true
  },
  {
    id: '2',
    name: 'Portfolio X',
    description: 'Mostra il tuo lavoro con questo tema creativo per portfolio con gallerie interattive.',
    category: 'Portfolio',
    technologies: ['Next.Js', 'Typescript', 'Tailwind', 'Framer Motion'],
    image: '/images/themes/portfolio.png',
    demoUrl: 'https://portfolio-template-dusky-nu.vercel.app/',
    featured: true
  },
  {
    id: '3',
    name: 'Restaurant Template',
    description: 'Template per ristoranti con menu interattivo e sistema prenotazioni integrato.',
    category: 'Landing Page',
    technologies: ['Next.Js', 'Typescript', 'Tailwind', 'Framer Motion'],
    image: '/images/themes/restaurant.png',
    demoUrl: 'https://rest-template-six.vercel.app/',
    featured: false
  },
  
];

function ThemeCard({ theme, index }: { theme: Theme; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group transform-gpu overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col"
    >
      <div className="relative">
        <div className="h-48 w-full overflow-hidden">
          <Image
            src={theme.image}
            alt={theme.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <motion.a
            href={theme.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-[var(--accent-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-secondary)] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Demo
          </motion.a>
        </div>
        {theme.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-[var(--accent-primary)] text-white px-3 py-1 rounded-full text-sm font-medium">
              In Evidenza
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[var(--text-primary)] mb-2">{theme.name}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4 flex-1">{theme.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {theme.technologies.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] px-2 py-1 rounded text-xs font-medium border border-[var(--border-primary)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const testimonials = [
  {
    name: 'Sofia Rossi',
    rating: 5,
    text: 'Sono entusiasta del tema che ho acquistato da HipeG! È stato facile da personalizzare e ha un aspetto fantastico su tutti i dispositivi. Lo consiglio vivamente!',
    avatar: '/images/about/team-work.jpg'
  },
  {
    name: 'Marco Bianchi',
    rating: 4,
    text: 'Il tema è fantastico, ma ho avuto un piccolo problema con la personalizzazione. Il supporto è stato utile, ma ci è voluto un po più del previsto per risolverlo.',
    avatar: '/images/about/creative-workspace.jpg'
  },
  {
    name: 'Giulia Conti',
    rating: 5,
    text: 'Adoro assolutamente il design e la funzionalità del mio nuovo tema. È esattamente ciò di cui avevo bisogno per elevare la mia presenza online.',
    avatar: '/images/hero/digital-workspace.jpg'
  }
];

export default function TemiClient() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const categories = ['Tutti', 'E-commerce', 'Corporate', 'Portfolio', 'Blog', 'Landing Page'];
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutti');

  const filteredThemes = selectedCategory === 'Tutti' 
    ? themes 
    : themes.filter(theme => theme.category === selectedCategory);

  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center py-20 text-white md:min-h-[80vh]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("/images/backgrounds/gradient-bg.jpg")'
          }}
          ref={heroRef}
        >
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-6xl">
                Crea la Tua Presenza Online con <br />
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                  Temi Straordinari
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg font-light md:text-xl">
                Esplora la nostra collezione curata di temi per siti web, progettati per elevare il tuo brand e catturare il tuo pubblico.
              </p>
              <motion.button
                className="mt-8 inline-flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[var(--accent-primary)] text-base font-bold leading-normal tracking-[0.015em] text-white transition-transform hover:scale-105 hover:bg-[var(--accent-secondary)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('themes')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="truncate">Esplora i Temi</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Themes Section */}
        <section className="py-20" id="themes">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">Galleria Temi</h2>
              <p className="mt-2 text-[var(--text-secondary)]">Trova il design perfetto per il tuo prossimo progetto.</p>
            </div>

            {/* Filter Buttons */}
            <div className="mb-12 flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Themes Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {filteredThemes.map((theme, index) => (
                <ThemeCard key={theme.id} theme={theme} index={index} />
              ))}
            </div>
            
            {filteredThemes.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[var(--text-secondary)] text-lg">
                  Nessun tema trovato per questa categoria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[var(--card-bg)] py-20 border-t border-[var(--border-primary)]" id="testimonials">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">Cosa Dicono i Nostri Clienti</h2>
              <p className="mt-2 text-[var(--text-secondary)]">Le esperienze di chi ha già scelto HipeG.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                      <span className="text-[var(--accent-primary)] font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">{testimonial.name}</p>
                      <div className="mt-1 flex items-center text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)]">{testimonial.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20" id="benefits">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">Perché Scegliere HipeG?</h2>
              <p className="mt-2 text-[var(--text-secondary)]">I vantaggi che rendono i nostri temi la scelta migliore.</p>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: (
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: 'Design Responsive',
                  description: 'I temi si adattano perfettamente a tutte le dimensioni dello schermo.'
                },
                {
                  icon: (
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: 'Personalizzazione Facile',
                  description: 'Interfaccia intuitiva per personalizzare senza codice.'
                },
                {
                  icon: (
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: 'Completamente Personalizzabile',
                  description: 'Adatta ogni aspetto del tema alla tua identità di brand.'
                },
                {
                  icon: (
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: 'Supporto Dedicato',
                  description: 'Il nostro team di esperti è a disposizione per assisterti.'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]">
                    {benefit.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-[var(--text-primary)]">{benefit.title}</h3>
                  <p className="mt-2 text-[var(--text-secondary)]">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[var(--card-bg)] py-20 border-t border-[var(--border-primary)]">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">Pronto a Trasformare il Tuo Sito Web?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
                Unisciti a centinaia di clienti soddisfatti. Inizia oggi stesso a costruire il sito web dei tuoi sogni con HipeG.
              </p>
              <motion.a
                href="/#contatti"
                className="mt-8 inline-flex min-w-[150px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[var(--accent-primary)] text-base font-bold leading-normal tracking-[0.015em] text-white transition-transform hover:scale-105 hover:bg-[var(--accent-secondary)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="truncate">Contattaci Oggi</span>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}