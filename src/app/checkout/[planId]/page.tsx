'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

// Definizione dei piani disponibili
const plans = {
  'a-tutto-meta': {
    id: 'a-tutto-meta',
    name: 'A tutto Meta',
    price: '99,90',
    period: 'mese',
    description: 'Gestione completa di Instagram e Facebook per la tua presenza digitale',
    features: [
      'Gestione Pagina Instagram e Facebook',
      '3 grafiche settimanali personalizzate (uguali per entrambi i canali)',
      '3 pubblicazioni a settimana + 3 stories',
      'Grafica personalizzata e copy'
    ]
  },
  'a-tutto-meta-20': {
    id: 'a-tutto-meta-20',
    name: 'A tutto Meta 2.0',
    price: '149,90',
    period: 'mese',
    description: 'Versione avanzata con campagne pubblicitarie e reporting',
    features: [
      'Gestione Pagina Instagram e Facebook',
      '3 grafiche settimanali (uguali per entrambi i canali)',
      '3 pubblicazioni a settimana + 3 stories',
      'Grafica personalizzata e copy',
      'Campagne a pagamento',
      'Report trimestrale'
    ]
  },
  'linkedin': {
    id: 'linkedin',
    name: 'LinkedIn',
    price: '69,90',
    period: 'mese',
    description: 'Gestione professionale della tua presenza LinkedIn',
    features: [
      'Gestione Pagina LinkedIn',
      '2 pubblicazioni a settimana',
      'Grafica personalizzata e copy'
    ]
  },
  'tiktok': {
    id: 'tiktok',
    name: 'TikTok',
    price: '199,90',
    period: 'mese',
    description: 'Gestione e montaggio professionale per TikTok',
    features: [
      'Gestione e montaggio',
      '2 pubblicazioni a settimana'
    ]
  },
  'pack-professionale': {
    id: 'pack-professionale',
    name: 'Pack Professionale',
    price: '499,90',
    period: 'mese',
    description: 'Gestione completa di tutti i canali social',
    features: [
      'Instagram - Facebook - TikTok - LinkedIn',
      'Creatività grafica + copy',
      '5 post + 5 stories a settimana (uguali)',
      'Pubblicazione',
      '1 Reel a settimana',
      '4 video TikTok al mese'
    ]
  },
  'sito-landing': {
    id: 'sito-landing',
    name: 'Sito Landing Page',
    price: '299,90',
    period: 'anno',
    description: 'Pagina singola efficace per presentare la tua attività',
    features: [
      '1 pagina',
      'Creazione Sito Efficace + dominio web .it o .com',
      'Ottimizzazione SEO base: Strutturazione SEO on-page per miglior posizionamento',
      'Design grafico personalizzato: Realizzazione grafica del sito, responsive design'
    ]
  },
  'sito-standard': {
    id: 'sito-standard',
    name: 'Sito Standard',
    price: '390,90',
    period: 'anno',
    description: 'Sito completo fino a 5 pagine per piccole e medie aziende',
    features: [
      'Fino a 5 pagine',
      'Creazione Sito Efficace + dominio web .it o .com',
      'Ottimizzazione SEO base: Strutturazione SEO on-page per miglior posizionamento',
      'Design grafico personalizzato: Realizzazione grafica del sito, responsive design'
    ]
  },
  'sito-large': {
    id: 'sito-large',
    name: 'Sito Large',
    price: '799,90',
    period: 'anno',
    description: 'Sito professionale fino a 32 pagine per aziende strutturate',
    features: [
      'Fino a 32 pagine',
      'Creazione Sito Efficace + dominio web .it o .com',
      'Ottimizzazione SEO base: Strutturazione SEO on-page per miglior posizionamento',
      'Design grafico personalizzato: Realizzazione grafica del sito, responsive design'
    ]
  },
  'e-shop-basic': {
    id: 'e-shop-basic',
    name: 'E-shop Basic',
    price: '999,90',
    period: 'anno',
    description: 'E-commerce completo fino a 100 prodotti',
    features: [
      'Analisi e consulenza: Definizione requisiti, target e funzionalità richieste',
      'Design grafico personalizzato: Realizzazione grafica del sito, responsive design',
      'Sviluppo e implementazione eShop: Creazione della piattaforma e-commerce',
      'Integrazione sistemi di pagamento: PayPal, carte di credito, altri metodi',
      'Inserimento prodotti (fino a 100 prodotti): Caricamento dati prodotti, descrizioni e immagini',
      'Formazione utilizzo CMS: Addestramento all\'uso della piattaforma',
      'Ottimizzazione SEO base: Strutturazione SEO on-page',
      'Hosting e dominio',
      'Manutenzione e supporto'
    ]
  },
  'e-shop-ultra': {
    id: 'e-shop-ultra',
    name: 'E-shop Ultra',
    price: '1499,90',
    period: 'anno',
    description: 'E-commerce avanzato fino a 500 prodotti',
    features: [
      'Analisi e consulenza: Definizione requisiti, target e funzionalità richieste',
      'Design grafico personalizzato: Realizzazione grafica del sito, responsive design',
      'Sviluppo e implementazione eShop: Creazione della piattaforma e-commerce',
      'Integrazione sistemi di pagamento: PayPal, carte di credito, altri metodi',
      'Inserimento prodotti (fino a 500 prodotti): Caricamento dati prodotti, descrizioni e immagini',
      'Formazione utilizzo CMS: Addestramento all\'uso della piattaforma',
      'Ottimizzazione SEO base: Strutturazione SEO on-page',
      'Hosting e dominio',
      'Manutenzione e supporto'
    ]
  },
  'sito-ricettive': {
    id: 'sito-ricettive',
    name: 'Sito Strutture Ricettive',
    price: '1499,90',
    period: 'anno',
    description: 'Piattaforma specializzata per hotel, B&B e strutture ricettive',
    features: [
      'Analisi e consulenza: Definizione esigenze specifiche e target clienti',
      'Design personalizzato: Sviluppo piattaforma eCommerce',
      'Catalogo servizi e prodotti, gestione disponibilità e prenotazioni',
      'Collegamento con software gestionale della struttura (PMS)',
      'Sistemi di pagamento sicuri: PayPal, carte di credito, bonifico',
      'Inserimento contenuti e prodotti: Caricamento pacchetti, servizi, descrizioni',
      'Formazione gestione piattaforma: Training per gestione ordini, disponibilità, offerte',
      'Ottimizzazione SEO base: Ottimizzazione per motori di ricerca e visibilità locale',
      'Hosting e dominio (12 mesi): Registrazione dominio e hosting dedicato',
      'Supporto e manutenzione: Aggiornamenti, assistenza e sicurezza'
    ]
  },
  'grafica': {
    id: 'grafica',
    name: 'Grafica',
    price: '59,90',
    period: 'mese',
    description: 'Servizio di grafica personalizzata per le tue esigenze',
    features: [
      '2 grafiche personalizzate a settimana'
    ]
  }
};

export default function CheckoutPage() {
  const params = useParams();
  const planId = params.planId as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [planLoading, setPlanLoading] = useState(true);

  // Carica il piano dal database
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setPlanLoading(true);
        const response = await fetch(`/api/plans/${planId}`);
        const data = await response.json();
        
        if (data.success) {
          setSelectedPlan(data.plan);
        } else {
          // Fallback ai dati hardcoded se il piano non è nel database
          const fallbackPlan = plans[planId as keyof typeof plans];
          if (fallbackPlan) {
            setSelectedPlan({
              ...fallbackPlan,
              paypal_plan_id: null // Indicatore che non ha plan ID PayPal
            });
          } else {
            setError('Piano non trovato');
          }
        }
      } catch (err) {
        console.error('Error fetching plan:', err);
        // Fallback ai dati hardcoded
        const fallbackPlan = plans[planId as keyof typeof plans];
        if (fallbackPlan) {
          setSelectedPlan({
            ...fallbackPlan,
            paypal_plan_id: null
          });
        } else {
          setError('Errore nel caricamento del piano');
        }
      } finally {
        setPlanLoading(false);
      }
    };

    fetchPlan();
  }, [planId]);

  if (planLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento piano...</p>
        </div>
      </div>
    );
  }

  if (!selectedPlan || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Piano non trovato'}
          </h1>
          <p className="text-gray-600 mb-6">Il piano selezionato non esiste.</p>
          <a href="/prezzi" className="text-purple-600 hover:text-purple-700">
            ← Torna ai prezzi
          </a>
        </div>
      </div>
    );
  }

  const initialPayPalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
    currency: 'EUR',
    intent: 'capture', // Always use one-time payments
    components: 'buttons',
    'disable-funding': 'credit,card',
    'enable-funding': 'paypal'
  };

  // Per ora manteniamo createOrder per compatibilità (fallback per piani senza PayPal plan ID)
  const createOrder = (_data: any, actions: any) => {
    const amount = typeof selectedPlan.price === 'number' ? 
      selectedPlan.price.toString() : 
      selectedPlan.price.replace(',', '.');
    
    return actions.order.create({
      purchase_units: [
        {
          reference_id: `HIPEG_${selectedPlan.name.replace(/\s+/g, '_').toUpperCase()}_${Date.now()}`,
          description: `HipeG - ${selectedPlan.name} - Comunicazione Digitale`,
          custom_id: selectedPlan.id,
          amount: {
            currency_code: selectedPlan.currency || 'EUR',
            value: amount,
          },
        },
      ],
      application_context: {
        brand_name: 'HipeG Creative Company',
        landing_page: 'NO_PREFERENCE',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
      },
    });
  };


  const onApprove = async (data: any, actions: any) => {
    setLoading(true);
    setError(null);

    try {
      // Gestione pagamento one-time
      if (data.orderID) {
        console.log('Order approved:', data.orderID);
        
        // Ottieni i dettagli dell'ordine da PayPal
        const order = await actions.order.get();
        
        // Estrai informazioni del pagatore
        const payerName = order.payer?.name?.given_name || '';
        const payerEmail = order.payer?.email_address || '';
        
        const amount = typeof selectedPlan.price === 'number' ? 
          selectedPlan.price.toString() : 
          selectedPlan.price.replace(',', '.');
        
        const paymentData = {
          name: payerName,
          email: payerEmail,
          amount: amount,
          orderID: data.orderID,
          planId: selectedPlan.id
        };
        
        console.log('Sending payment data to capture API:', paymentData);
        
        // Cattura il pagamento tramite la nostra API
        const response = await fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderID: data.orderID,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API error response:', errorText);
          throw new Error('Errore nella cattura del pagamento');
        }

        const captureData = await response.json();
        console.log('Payment captured successfully:', captureData);
        
        // Redirect alla pagina di successo order
        window.location.href = `/checkout/success?orderID=${data.orderID}&planId=${selectedPlan.id}`;
      }
      
    } catch (error) {
      console.error('Payment/Subscription failed:', error);
      setError('Errore nel completamento del pagamento. Riprova o contatta il supporto.');
    } finally {
      setLoading(false);
    }
  };

  const onError = (error: any) => {
    console.error('PayPal Error:', error);
    setError('Errore durante il pagamento. Riprova o contatta il supporto.');
  };

  // Componente per i bottoni PayPal con controllo dello stato di caricamento
  const PayPalButtonsWrapper = () => {
    const [{ isResolved, isPending }] = usePayPalScriptReducer();

    if (isPending) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-600">Caricamento PayPal...</span>
        </div>
      );
    }

    if (!isResolved) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Errore nel caricamento di PayPal. Ricarica la pagina.</p>
        </div>
      );
    }

    return (
      <PayPalButtons
        style={{
          shape: 'rect',
          layout: 'vertical',
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Checkout</h1>
          <p className="text-[var(--text-secondary)]">Completa il tuo acquisto per il piano {selectedPlan.name}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Dettagli del piano */}
          <motion.div
            className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 border border-[var(--card-border)]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Piano {selectedPlan.name}</h2>
            <div className="mb-6">
              <span className="text-4xl font-bold text-purple-600">
                €{typeof selectedPlan.price === 'number' ? selectedPlan.price.toFixed(2) : selectedPlan.price}
              </span>
              <span className="text-[var(--text-secondary)]">
                /{selectedPlan.period || (selectedPlan.interval === 'MONTH' ? 'mese' : 'anno')}
              </span>
              <div className="text-sm text-[var(--text-secondary)] opacity-75">+IVA</div>
            </div>
            <p className="text-[var(--text-secondary)] mb-6">{selectedPlan.description}</p>
            
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Cosa include:</h3>
            <ul className="space-y-3">
              {selectedPlan.features.map((feature: string, index: number) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <svg className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--text-primary)]">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Sezione pagamento */}
          <motion.div
            className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 border border-[var(--card-border)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Pagamento</h2>
            
            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="bg-[var(--bg-secondary)] rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-secondary)]">Piano {selectedPlan.name}</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  €{typeof selectedPlan.price === 'number' ? selectedPlan.price.toFixed(2) : selectedPlan.price}/
                  {selectedPlan.period || (selectedPlan.interval === 'MONTH' ? 'mese' : 'anno')} +IVA
                </span>
              </div>
              <div className="border-t border-[var(--border-primary)] mt-2 pt-2">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-[var(--text-primary)]">Totale</span>
                  <span className="text-purple-600">
                    €{typeof selectedPlan.price === 'number' ? selectedPlan.price.toFixed(2) : selectedPlan.price} +IVA
                  </span>
                </div>
              </div>
              {selectedPlan.paypal_plan_id && (
                <div className="mt-2 text-xs text-green-600">
                  🔄 Pagamento ricorrente attivo - rinnovo automatico
                </div>
              )}
            </div>

            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <span className="ml-3 text-[var(--text-secondary)]">Elaborazione...</span>
              </div>
            )}

            {!loading && (
              <PayPalScriptProvider options={initialPayPalOptions}>
                <PayPalButtonsWrapper />
              </PayPalScriptProvider>
            )}

            <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
              <p>Pagamento sicuro tramite PayPal</p>
              <p className="mt-2">
                <a href="/#prezzi" className="text-purple-600 hover:text-purple-700">
                  ← Torna ai piani
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}