'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const contactInfoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="contatti" className="bg-[var(--bg-secondary)] py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">Contattaci</h2>
          <motion.div 
            className="w-20 h-1 bg-purple-600 mt-2 mb-4 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <p className="text-[var(--text-secondary)]">Hai un progetto in mente? Parliamone!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <motion.form 
            className="bg-[var(--card-bg)] p-8 rounded-xl shadow-lg border border-[var(--card-border)]" 
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div className="mb-4" variants={fieldVariants}>
              <label htmlFor="name" className="block text-[var(--text-primary)] text-sm font-medium mb-2">
                Nome
              </label>
              <motion.input
                type="text"
                id="name"
                placeholder="Il tuo nome"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                whileFocus={{ scale: 1.02 }}
                required
              />
            </motion.div>
            
            <motion.div className="mb-4" variants={fieldVariants}>
              <label htmlFor="email" className="block text-[var(--text-primary)] text-sm font-medium mb-2">
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                placeholder="La tua email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                whileFocus={{ scale: 1.02 }}
                required
              />
            </motion.div>
            
            <motion.div className="mb-4" variants={fieldVariants}>
              <label htmlFor="subject" className="block text-[var(--text-primary)] text-sm font-medium mb-2">
                Oggetto
              </label>
              <motion.input
                type="text"
                id="subject"
                placeholder="Oggetto del messaggio"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                whileFocus={{ scale: 1.02 }}
                required
              />
            </motion.div>
            
            <motion.div className="mb-6" variants={fieldVariants}>
              <label htmlFor="message" className="block text-[var(--text-primary)] text-sm font-medium mb-2">
                Messaggio
              </label>
              <motion.textarea
                id="message"
                rows={5}
                placeholder="Il tuo messaggio"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                whileFocus={{ scale: 1.02 }}
                required
              />
            </motion.div>
            
            <motion.div variants={fieldVariants}>
              <motion.button
                type="submit"
                className="inline-block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Invia
              </motion.button>
            </motion.div>
          </motion.form>

          <motion.div
            variants={contactInfoVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Indirizzo",
                  content: "Via Roma 123, 20100 Milano, Italia"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Email",
                  content: "info@hipeg.it"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  title: "Telefono",
                  content: "+39 02 1234567"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-4"
                  variants={fieldVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div 
                    className="text-purple-600 mt-1"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)]">{item.title}</h4>
                    <p className="text-[var(--text-secondary)]">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="mt-8 bg-[var(--bg-secondary)] h-80 rounded-lg flex items-center justify-center text-[var(--text-secondary)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              Mappa Google
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}