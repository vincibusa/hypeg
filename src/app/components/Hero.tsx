'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/95 to-[var(--bg-primary)]/80"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center md:text-left relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              Agenzia Comunicazione Digitale Palermo | Siti Web e Social Media
            </span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg text-[var(--text-secondary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <strong>HipeG</strong> è la tua <strong>agenzia di comunicazione digitale a Palermo</strong> specializzata in <strong>siti web professionali</strong>, <strong>gestione social media</strong>, <strong>video marketing</strong> e <strong>branding aziendale</strong>. Serviamo aziende in tutta la <strong>Sicilia</strong> e <strong>Italia</strong> con strategie digitali personalizzate per far crescere il tuo business online.
          </motion.p>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <motion.a 
              href="#chi-siamo" 
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('chi-siamo')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Scopri di più
            </motion.a>
          </motion.div>
          </div>
          
          {/* Right column with image */}
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/3.jpeg"
                alt="Agenzia comunicazione digitale Palermo - HipeG team al lavoro"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full opacity-80"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-60"
              animate={{ 
                y: [0, 15, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}