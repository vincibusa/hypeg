'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { consentTracker } from '@/lib/consentTracking';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be changed
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const existingConsent = consentTracker.getLatestConsent();
    const needsRenewal = consentTracker.needsConsentRenewal();
    
    if (!existingConsent || needsRenewal) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 2000);
    } else {
      // Load existing preferences
      setPreferences(existingConsent);
      // Apply preferences
      applyCookiePreferences(existingConsent);
    }
  }, []);

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Enable/disable Google Analytics
    if (prefs.analytics) {
      // Initialize Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      }
    } else {
      // Disable Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'analytics_storage': 'denied'
        });
      }
    }

    // Enable/disable Marketing cookies (Facebook Pixel, etc.)
    if (prefs.marketing) {
      // Initialize marketing tools
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('consent', 'grant');
      }
    } else {
      // Disable marketing tools
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('consent', 'revoke');
      }
    }

    // Store preferences using consent tracker
    consentTracker.recordConsent(prefs, 'banner');
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    applyCookiePreferences(allAccepted);
    setShowBanner(false);
    setShowDetails(false);
  };

  const handleAcceptNecessaryOnly = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(necessaryOnly);
    applyCookiePreferences(necessaryOnly);
    setShowBanner(false);
    setShowDetails(false);
  };

  const handleSavePreferences = () => {
    applyCookiePreferences(preferences);
    setShowBanner(false);
    setShowDetails(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const cookieTypes = [
    {
      key: 'necessary' as keyof CookiePreferences,
      title: 'Cookie Necessari',
      description: 'Questi cookie sono essenziali per il funzionamento del sito web e non possono essere disabilitati.',
      examples: 'Sessione utente, sicurezza, preferenze del sito',
      required: true,
    },
    {
      key: 'functional' as keyof CookiePreferences,
      title: 'Cookie Funzionali',
      description: 'Questi cookie migliorano la funzionalità del sito, ricordando le tue scelte e preferenze.',
      examples: 'Preferenze lingua, impostazioni tema, contenuti personalizzati',
      required: false,
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: 'Cookie Analitici',
      description: 'Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito web.',
      examples: 'Google Analytics, statistiche di utilizzo, performance del sito',
      required: false,
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      title: 'Cookie di Marketing',
      description: 'Questi cookie vengono utilizzati per mostrare annunci pubblicitari personalizzati.',
      examples: 'Facebook Pixel, cookie pubblicitari, remarketing',
      required: false,
    },
  ];

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Banner */}
          <motion.div
            className="relative w-full max-w-4xl bg-[var(--card-bg)] rounded-xl shadow-2xl border border-[var(--card-border)] max-h-[80vh] overflow-hidden"
            initial={{ y: 100, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {!showDetails ? (
              // Simple Banner
              <div className="p-6 sm:p-8">
                <div className="flex items-start space-x-4">
                  {/* Cookie Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                      Rispettiamo la Tua Privacy
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                      Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza sul nostro sito, 
                      analizzare il traffico e personalizzare i contenuti. Puoi scegliere quali cookie accettare.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        onClick={handleAcceptAll}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Accetta Tutti
                      </motion.button>
                      
                      <motion.button
                        onClick={handleAcceptNecessaryOnly}
                        className="border-2 border-[var(--border-primary)] text-[var(--text-primary)] font-semibold py-3 px-6 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Solo Necessari
                      </motion.button>
                      
                      <motion.button
                        onClick={() => setShowDetails(true)}
                        className="text-[var(--accent-primary)] font-semibold py-3 px-6 hover:text-[var(--accent-secondary)] transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Personalizza
                      </motion.button>
                    </div>

                    <div className="mt-4 text-sm text-[var(--text-secondary)]">
                      <a href="/privacy" className="hover:text-[var(--accent-primary)] transition-colors">
                        Privacy Policy
                      </a>
                      {' • '}
                      <a href="/cookie-policy" className="hover:text-[var(--accent-primary)] transition-colors">
                        Cookie Policy
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Detailed Settings
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-[var(--border-primary)]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      Impostazioni Cookie
                    </h3>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-[var(--text-secondary)] mt-2">
                    Personalizza le tue preferenze sui cookie. Puoi modificare queste impostazioni in qualsiasi momento.
                  </p>
                </div>

                {/* Cookie Types */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cookieTypes.map((cookie) => (
                    <div key={cookie.key} className="border border-[var(--border-primary)] rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-[var(--text-primary)]">
                              {cookie.title}
                            </h4>
                            {cookie.required && (
                              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                Richiesti
                              </span>
                            )}
                          </div>
                          <p className="text-[var(--text-secondary)] text-sm mb-2">
                            {cookie.description}
                          </p>
                          <p className="text-xs text-[var(--text-secondary)] opacity-75">
                            <strong>Esempi:</strong> {cookie.examples}
                          </p>
                        </div>
                        
                        <div className="ml-4">
                          <motion.button
                            onClick={() => togglePreference(cookie.key)}
                            disabled={cookie.required}
                            className={`w-12 h-6 rounded-full p-1 transition-colors ${
                              preferences[cookie.key]
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                                : 'bg-gray-300'
                            } ${cookie.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div
                              className="w-4 h-4 bg-white rounded-full shadow-sm"
                              animate={{
                                x: preferences[cookie.key] ? 24 : 0
                              }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[var(--border-primary)] flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={handleSavePreferences}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Salva Preferenze
                  </motion.button>
                  
                  <motion.button
                    onClick={handleAcceptAll}
                    className="border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] font-semibold py-3 px-6 rounded-lg hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Accetta Tutti
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}