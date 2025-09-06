'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db from '@/lib/firebase';

interface Payment {
  id: string;
  plan_id: string;
  plan_name: string;
  amount: number;
  currency: string;
  status: string;
  paid_at?: Date;
  next_payment_reminder?: Date;
  paypal_order_id?: string;
  created_at?: Date;
}

export default function DashboardPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      
      // TODO: Sostituire con l'ID cliente reale quando avremo l'autenticazione
      // Per ora mostriamo tutti i pagamenti
      const paymentsCollection = collection(db, 'subscription_payments');
      const q = query(paymentsCollection, orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const paymentsData: Payment[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        paymentsData.push({
          id: doc.id,
          plan_id: data.plan_id,
          plan_name: data.plan_name || getPlanName(data.plan_id),
          amount: data.amount || 0,
          currency: data.currency || 'EUR',
          status: data.status || 'UNKNOWN',
          paid_at: data.paid_at?.toDate(),
          next_payment_reminder: data.next_payment_reminder?.toDate(),
          paypal_order_id: data.paypal_order_id,
          created_at: data.created_at?.toDate(),
        });
      });
      
      setPayments(paymentsData);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('Errore nel caricamento dei pagamenti');
      
      // Fallback a dati mock
      const mockPayments: Payment[] = [
        {
          id: '1',
          plan_id: 'a-tutto-meta-20',
          plan_name: 'A tutto Meta 2.0',
          amount: 149.90,
          currency: 'EUR',
          status: 'COMPLETED',
          paid_at: new Date('2025-09-05'),
          next_payment_reminder: new Date('2025-10-05'),
          paypal_order_id: 'ORDER_456'
        },
        {
          id: '2',
          plan_id: 'linkedin',
          plan_name: 'LinkedIn',
          amount: 69.90,
          currency: 'EUR',
          status: 'COMPLETED',
          paid_at: new Date('2025-08-15'),
          next_payment_reminder: new Date('2025-09-15'),
          paypal_order_id: 'ORDER_789'
        }
      ];
      
      setPayments(mockPayments);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-secondary)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Caricamento pagamenti...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">I Tuoi Pagamenti</h1>
          <p className="text-[var(--text-secondary)]">Storico di tutti i tuoi pagamenti</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Payments Table */}
        <div className="bg-[var(--card-bg)] rounded-xl shadow-lg border border-[var(--card-border)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--card-border)]">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Storico Pagamenti ({payments.length})
            </h2>
          </div>

          {payments.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-[var(--text-primary)]">Nessun pagamento</h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Non hai ancora effettuato nessun pagamento.
              </p>
              <div className="mt-6">
                <Link
                  href="/prezzi"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Scegli un Piano
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--card-border)]">
                <thead className="bg-[var(--bg-secondary)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                      Piano
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                      Importo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                      Data Pagamento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                      Prossimo Reminder
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                      ID Transazione
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[var(--card-bg)] divide-y divide-[var(--card-border)]">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[var(--text-primary)]">
                          {payment.plan_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                        {formatPrice(payment.amount, payment.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                        {formatDate(payment.paid_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                        {formatDate(payment.next_payment_reminder)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                        {payment.paypal_order_id ? (
                          <span className="font-mono text-xs">
                            {payment.paypal_order_id}
                          </span>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Torna alla Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}