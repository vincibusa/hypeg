'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

interface RequestForm {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requestDetails: string;
  identityVerification: string;
  urgency: string;
}

export default function DataSubjectRightsClient() {
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState<RequestForm>({
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    requestDetails: '',
    identityVerification: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const rightsInfo = [
    {
      id: 'access',
      title: 'Diritto di Accesso',
      icon: '👁️',
      description: 'Ottieni informazioni sui tuoi dati personali che trattiamo.',
      details: 'Puoi richiedere una copia di tutti i dati personali che abbiamo su di te, incluse le finalità del trattamento, le categorie di dati e i destinatari.',
    },
    {
      id: 'rectification',
      title: 'Diritto di Rettifica',
      icon: '✏️',
      description: 'Correggi dati inesatti o incompleti.',
      details: 'Se i tuoi dati personali sono inesatti o incompleti, puoi richiedere la correzione o l\'integrazione.',
    },
    {
      id: 'erasure',
      title: 'Diritto alla Cancellazione',
      icon: '🗑️',
      description: 'Richiedi la cancellazione dei tuoi dati ("Diritto all\'oblio").',
      details: 'Puoi richiedere la cancellazione dei tuoi dati personali in determinate circostanze previste dal GDPR.',
    },
    {
      id: 'portability',
      title: 'Diritto alla Portabilità',
      icon: '📤',
      description: 'Ottieni i tuoi dati in formato strutturato.',
      details: 'Puoi richiedere di ricevere i tuoi dati in un formato strutturato, di uso comune e leggibile da dispositivo automatico.',
    },
    {
      id: 'restriction',
      title: 'Diritto di Limitazione',
      icon: '⏸️',
      description: 'Limita il trattamento dei tuoi dati.',
      details: 'Puoi richiedere la limitazione del trattamento dei tuoi dati personali in determinate circostanze.',
    },
    {
      id: 'objection',
      title: 'Diritto di Opposizione',
      icon: '🚫',
      description: 'Opponi il trattamento per marketing diretto.',
      details: 'Puoi opporti in qualsiasi momento al trattamento dei tuoi dati per finalità di marketing diretto.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      // In a real implementation, this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('GDPR Request submitted:', formData);
      
      // For now, just show success
      setSubmitSuccess(true);
      setFormData({
        type: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        requestDetails: '',
        identityVerification: '',
        urgency: 'normal'
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Errore nell\'invio della richiesta. Riprova o contattaci direttamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Header />
        <Breadcrumb />
        <main className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                Richiesta Inviata con Successo
              </h1>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                La tua richiesta per l'esercizio dei diritti privacy è stata ricevuta. 
                Ti risponderemo entro 30 giorni all'indirizzo email fornito.
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-8">
                <strong>Numero di riferimento:</strong> GDPR-{Date.now()}
              </p>
              <motion.button
                onClick={() => setSubmitSuccess(false)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Invia Nuova Richiesta
              </motion.button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />
      <Breadcrumb />
      
      <main className="py-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Diritti Privacy GDPR
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-3xl mx-auto">
              Esercita i tuoi diritti previsti dal Regolamento Generale sulla Protezione dei Dati (GDPR). 
              Gestisci i tuoi dati personali in modo semplice e sicuro.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[var(--card-bg)] rounded-lg p-2 border border-[var(--card-border)]">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                I Tuoi Diritti
              </button>
              <button
                onClick={() => setActiveTab('request')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'request'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Fai Richiesta
              </button>
            </div>
          </motion.div>

          {activeTab === 'overview' ? (
            /* Rights Overview */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rightsInfo.map((right, index) => (
                <motion.div
                  key={right.id}
                  className="bg-[var(--card-bg)] rounded-xl shadow-lg p-6 border border-[var(--card-border)]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-4">{right.icon}</div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                    {right.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-4">
                    {right.description}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] opacity-75">
                    {right.details}
                  </p>
                  <motion.button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, type: right.id }));
                      setActiveTab('request');
                    }}
                    className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Richiedi Ora
                  </motion.button>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Request Form */
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-[var(--card-bg)] rounded-xl shadow-lg p-8 border border-[var(--card-border)]">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Modulo Richiesta Diritti Privacy
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Request Type */}
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2">
                      Tipo di Richiesta *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                    >
                      <option value="">Seleziona il tipo di richiesta</option>
                      <option value="access">Diritto di Accesso</option>
                      <option value="rectification">Diritto di Rettifica</option>
                      <option value="erasure">Diritto alla Cancellazione</option>
                      <option value="portability">Diritto alla Portabilità</option>
                      <option value="restriction">Diritto di Limitazione</option>
                      <option value="objection">Diritto di Opposizione</option>
                    </select>
                  </div>

                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[var(--text-primary)] font-medium mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[var(--text-primary)] font-medium mb-2">
                        Cognome *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[var(--text-primary)] font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[var(--text-primary)] font-medium mb-2">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                      />
                    </div>
                  </div>

                  {/* Request Details */}
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2">
                      Dettagli della Richiesta *
                    </label>
                    <textarea
                      name="requestDetails"
                      value={formData.requestDetails}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Descrivi in dettaglio la tua richiesta..."
                      className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                    />
                  </div>

                  {/* Identity Verification */}
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2">
                      Verifica Identità
                    </label>
                    <select
                      name="identityVerification"
                      value={formData.identityVerification}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                    >
                      <option value="">Seleziona documento di identità</option>
                      <option value="carta-identita">Carta d'Identità</option>
                      <option value="patente">Patente di Guida</option>
                      <option value="passaporto">Passaporto</option>
                      <option value="altro">Altro documento</option>
                    </select>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      Per verificare la tua identità, potremmo richiederti di fornire una copia del documento selezionato.
                    </p>
                  </div>

                  {/* Urgency */}
                  <div>
                    <label className="block text-[var(--text-primary)] font-medium mb-2">
                      Urgenza
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                    >
                      <option value="normal">Normale (30 giorni)</option>
                      <option value="urgent">Urgente (motivazione richiesta)</option>
                    </select>
                  </div>

                  {/* Legal Notice */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Informazioni Legali
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      • Risponderemo entro 30 giorni dalla ricezione della richiesta<br/>
                      • Potremmo richiedere documenti aggiuntivi per verificare la tua identità<br/>
                      • La richiesta è gratuita, salvo richieste manifestamente eccessive<br/>
                      • Hai il diritto di presentare reclamo al Garante Privacy
                    </p>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Invio in corso...
                      </div>
                    ) : (
                      'Invia Richiesta'
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}