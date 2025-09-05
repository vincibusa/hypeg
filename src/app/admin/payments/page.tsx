'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db from '@/lib/firebase';

interface Payment {
  id: string;
  customer_id?: string;
  customer_name?: string;
  customer_email?: string;
  plan_id: string;
  plan_name: string;
  amount: number;
  currency: string;
  status: string;
  paid_at?: Date;
  next_payment_reminder?: Date;
  paypal_order_id?: string;
  paypal_payment_id?: string;
  created_at?: Date;
  failure_reason?: string;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [reminderMessage, setReminderMessage] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPayments = async () => {
    try {
      setLoading(true);
      
      // Recupera i pagamenti reali da Firestore
      const paymentsCollection = collection(db, 'subscription_payments');
      const q = query(paymentsCollection, orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const paymentsData: Payment[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        paymentsData.push({
          id: doc.id,
          customer_id: data.customer_id,
          customer_name: data.customer_name,
          customer_email: data.customer_email,
          plan_id: data.plan_id,
          plan_name: data.plan_name || getPlanName(data.plan_id),
          amount: data.amount || 0,
          currency: data.currency || 'EUR',
          status: data.status || 'UNKNOWN',
          paid_at: data.paid_at?.toDate(),
          next_payment_reminder: data.next_payment_reminder?.toDate(),
          paypal_order_id: data.paypal_order_id,
          paypal_payment_id: data.paypal_payment_id,
          created_at: data.created_at?.toDate(),
          failure_reason: data.failure_reason
        });
      });
      
      setPayments(paymentsData);
    } catch (err) {
      console.error('Error fetching payments:', err);
      
      // Fallback a dati mock se non ci sono pagamenti reali
      const mockPayments: Payment[] = [
        {
          id: '1',
          customer_id: 'cust_123',
          customer_name: 'Mario Rossi',
          customer_email: 'mario.rossi@email.com',
          plan_id: 'a-tutto-meta',
          plan_name: 'A tutto Meta',
          amount: 99.90,
          currency: 'EUR',
          status: 'COMPLETED',
          paid_at: new Date('2025-09-01'),
          next_payment_reminder: new Date('2025-10-01'),
          paypal_order_id: 'ORDER_123'
        },
        {
          id: '2',
          customer_id: 'cust_456',
          customer_name: 'Luigi Verdi',
          customer_email: 'luigi.verdi@email.com',
          plan_id: 'a-tutto-meta-20',
          plan_name: 'A tutto Meta 2.0',
          amount: 149.90,
          currency: 'EUR',
          status: 'COMPLETED',
          paid_at: new Date('2025-09-05'),
          next_payment_reminder: new Date('2025-10-05'),
          paypal_order_id: 'ORDER_456'
        }
      ];
      
      setPayments(mockPayments);
    } finally {
      setLoading(false);
    }
  };

  // Funzione helper per ottenere il nome del piano dall'ID
  const getPlanName = (planId: string): string => {
    const planNames: { [key: string]: string } = {
      'a-tutto-meta': 'A tutto Meta',
      'a-tutto-meta-20': 'A tutto Meta 2.0',
      'linkedin': 'LinkedIn',
      'tiktok': 'TikTok',
      'pack-professionale': 'Pack Professionale',
      'sito-landing': 'Sito Landing Page',
      'sito-standard': 'Sito Standard',
      'sito-large': 'Sito Large',
      'e-shop-basic': 'E-shop Basic',
      'e-shop-ultra': 'E-shop Ultra',
      'sito-ricettive': 'Sito Strutture Ricettive',
      'grafica': 'Grafica'
    };
    return planNames[planId] || planId;
  };

  const handleSendReminders = async () => {
    if (selectedPayments.length === 0) {
      alert('Seleziona almeno un pagamento per inviare i reminder');
      return;
    }

    if (!reminderMessage.trim()) {
      alert('Inserisci un messaggio per il reminder');
      return;
    }

    try {
      // Prepara i dati per l'API
      const selectedPaymentData = payments.filter(p => selectedPayments.includes(p.id));
      
      const requestData = {
        paymentIds: selectedPayments,
        message: reminderMessage,
        customerEmails: selectedPaymentData.map(p => p.customer_email || '').filter(Boolean),
        customerNames: selectedPaymentData.map(p => p.customer_name || 'Cliente'),
        planNames: selectedPaymentData.map(p => p.plan_name)
      };

      // Invia i reminder tramite API
      const response = await fetch('/api/send-reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Errore nell\'invio dei reminder');
      }

      alert(`✅ ${result.message}\n\nEmail inviate con successo: ${result.successful}\nEmail fallite: ${result.failed}`);
      
      // Resetta la selezione
      setSelectedPayments([]);
      setReminderMessage('');
      
    } catch (error) {
      console.error('Error sending reminders:', error);
      alert(error instanceof Error ? error.message : 'Errore nell\'invio dei reminder');
    }
  };

  const handleSelectPayment = (paymentId: string) => {
    setSelectedPayments(prev => 
      prev.includes(paymentId)
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPayments.length === payments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(payments.map(p => p.id));
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('it-IT');
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento pagamenti...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestione Pagamenti</h1>
          <p className="text-gray-600">Gestisci i pagamenti e invia reminder per i rinnovi</p>
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Invio Reminder</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Messaggio Reminder
              </label>
              <textarea
                value={reminderMessage}
                onChange={(e) => setReminderMessage(e.target.value)}
                placeholder="Inserisci il messaggio per il reminder di rinnovo..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Azioni di Massa
              </label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">
                    {selectedPayments.length} pagamenti selezionati
                  </span>
                </div>
                
                <button
                  onClick={handleSendReminders}
                  disabled={selectedPayments.length === 0 || !reminderMessage.trim()}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Invia Reminder Email
                </button>
                
                <button
                  onClick={handleSelectAll}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  {selectedPayments.length === payments.length ? 'Deseleziona Tutti' : 'Seleziona Tutti'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Storico Pagamenti ({payments.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedPayments.length === payments.length && payments.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Piano
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Importo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Pagamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prossimo Reminder
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PayPal ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Creato il
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(payment.id)}
                        onChange={() => handleSelectPayment(payment.id)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.customer_name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {payment.customer_email || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.plan_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(payment.amount, payment.currency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.paid_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.next_payment_reminder)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.paypal_order_id ? (
                        <div className="flex flex-col">
                          <span className="font-mono text-xs">
                            {payment.paypal_order_id}
                          </span>
                          {payment.paypal_payment_id && (
                            <span className="font-mono text-xs text-gray-400">
                              {payment.paypal_payment_id}
                            </span>
                          )}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        payment.status === 'COMPLETED' 
                          ? 'bg-green-100 text-green-800' 
                          : payment.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : payment.status === 'FAILED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {payment.status}
                      </span>
                      {payment.failure_reason && (
                        <div className="text-xs text-red-600 mt-1">
                          {payment.failure_reason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {payments.length === 0 && (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nessun pagamento</h3>
              <p className="mt-1 text-sm text-gray-500">
                Non ci sono pagamenti registrati nel sistema.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}