'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const plans = {
  starter: {
    name: 'Starter',
    price: '299'
  },
  professional: {
    name: 'Professional',
    price: '599'
  },
  enterprise: {
    name: 'Enterprise',
    price: '999'
  }
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderID = searchParams.get('orderID');
  const planId = searchParams.get('planId');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const selectedPlan = planId ? plans[planId as keyof typeof plans] : null;

  useEffect(() => {
    // Simula il caricamento dei dettagli dell'ordine
    // In un'app reale, potresti fare una chiamata API per ottenere i dettagli
    const timer = setTimeout(() => {
      setOrderDetails({
        orderID,
        planId,
        planName: selectedPlan?.name,
        amount: selectedPlan?.price,
        timestamp: new Date().toLocaleString('it-IT')
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [orderID, planId, selectedPlan]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando il pagamento...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Icona di successo */}
          <motion.div
            className="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
          >
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          {/* Titolo */}
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Pagamento Completato!
          </motion.h1>

          {/* Messaggio di successo */}
          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Grazie per aver scelto HipeG! Il tuo piano {selectedPlan?.name} è stato attivato con successo.
          </motion.p>

          {/* Dettagli dell'ordine */}
          {orderDetails && (
            <motion.div
              className="bg-gray-50 rounded-lg p-6 mb-8 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h3 className="font-semibold text-gray-900 mb-4 text-center">Dettagli dell'ordine</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ordine ID:</span>
                  <span className="font-medium text-sm">{orderDetails.orderID}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Piano:</span>
                  <span className="font-medium">{orderDetails.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Importo:</span>
                  <span className="font-medium">€{orderDetails.amount}/mese</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium">{orderDetails.timestamp}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Prossimi passi */}
          <motion.div
            className="bg-purple-50 rounded-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h3 className="font-semibold text-gray-900 mb-3">Cosa succede ora?</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Riceverai una email di conferma entro 5 minuti</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Il nostro team ti contatterà entro 24 ore per iniziare</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Riceverai un link per accedere alla tua dashboard personale</span>
              </li>
            </ul>
          </motion.div>

          {/* Pulsanti azione */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <motion.a
              href="/#contatti"
              className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contatta il Team
            </motion.a>
            
            <motion.a
              href="/"
              className="block w-full bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Torna alla Home
            </motion.a>
          </motion.div>

          {/* Supporto */}
          <motion.div
            className="mt-8 pt-6 border-t border-gray-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-sm text-gray-500">
              Hai domande? Contattaci a{' '}
              <a href="mailto:info@hipeg.it" className="text-purple-600 hover:text-purple-700">
                info@hipeg.it
              </a>
              {' '}o chiamaci al{' '}
              <a href="tel:+390212345678" className="text-purple-600 hover:text-purple-700">
                +39 02 1234567
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}