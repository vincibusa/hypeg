'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="py-24 sm:py-32">
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="max-w-2xl">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              Comunicazione Digitale a 360°
            </span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg text-[var(--text-secondary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Siamo HipeG: un team giovane, creativo e affamato di innovazione. Ci occupiamo di comunicazione digitale a 360°, con un approccio umano, diretto e sempre orientato ai risultati.
          </motion.p>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <motion.a 
              href="#" 
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Scopri di più
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}