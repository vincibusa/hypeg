'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="chi-siamo" className="bg-[var(--bg-secondary)] py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-3xl font-bold text-[var(--text-primary)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Agenzia Comunicazione Digitale Palermo | HipeG Creative Company
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-purple-600 mt-2 mb-6"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.div>
            <motion.p 
              className="text-[var(--text-secondary)] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <strong>HipeG</strong> è un'<strong>agenzia di comunicazione digitale</strong> con sede a <strong>Palermo</strong> che serve clienti in tutta la <strong>Sicilia</strong> e <strong>Italia</strong>. Siamo specializzati nella <strong>creazione di siti web professionali</strong>, nel <strong>social media management</strong>, nel <strong>video marketing</strong> e nella <strong>grafica pubblicitaria</strong>. 
              <br /><br />
              Il nostro team di <strong>social media manager</strong>, web designer e esperti di marketing digitale lavora con passione per far crescere la presenza online delle aziende siciliane. Trasformiamo idee creative in risultati concreti attraverso strategie digitali su misura per <strong>agenzie di comunicazione Palermo</strong>, <strong>web design Sicilia</strong> e <strong>marketing digitale Italia</strong>.
            </motion.p>
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a 
                href="#servizi" 
                className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('servizi')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                I nostri servizi
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <motion.div 
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/4.jpeg"
                  alt="Agenzia comunicazione Palermo - Team HipeG al lavoro su progetti digitali"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-indigo-600/20"></div>
              </motion.div>
              
              {/* Floating accent image */}
              <motion.div 
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src="/images/about/creative-workspace.jpg"
                  alt="Agenzia marketing digitale Sicilia - Spazio creativo HipeG"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-purple-600/40"></div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full opacity-80"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute -top-2 -right-8 w-4 h-4 bg-indigo-500 rounded-full opacity-60"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}