'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CancelContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Icona di annullamento */}
          <motion.div
            className="mx-auto mb-6 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
          >
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </motion.div>

          {/* Titolo */}
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Pagamento Annullato
          </motion.h1>

          {/* Messaggio */}
          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Il pagamento è stato annullato. Non ti è stato addebitato alcun importo.
          </motion.p>

          {/* Informazioni */}
          <motion.div
            className="bg-blue-50 rounded-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="font-semibold text-gray-900 mb-3">Cosa puoi fare ora?</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Riprova il pagamento quando sei pronto</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Scegli un piano diverso che si adatta meglio alle tue esigenze</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Contattaci per ricevere assistenza o per un preventivo personalizzato</span>
              </li>
            </ul>
          </motion.div>

          {/* Pulsanti azione */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            {planId && (
              <motion.a
                href={`/checkout/${planId}`}
                className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg transition duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Riprova il Pagamento
              </motion.a>
            )}
            
            <motion.a
              href="/#prezzi"
              className="block w-full bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Vedi Altri Piani
            </motion.a>

            <motion.a
              href="/#contatti"
              className="block w-full border border-purple-600 text-purple-600 font-semibold py-3 px-6 rounded-full hover:bg-purple-50 transition duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contatta il Supporto
            </motion.a>
          </motion.div>

          {/* Supporto */}
          <motion.div
            className="mt-8 pt-6 border-t border-gray-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <p className="text-sm text-gray-500">
              Hai bisogno di aiuto? Siamo qui per te!{' '}
              <a href="mailto:info@hipeg.it" className="text-purple-600 hover:text-purple-700">
                info@hipeg.it
              </a>
              {' '}•{' '}
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

export default function CancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    }>
      <CancelContent />
    </Suspense>
  );
}