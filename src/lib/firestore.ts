import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import db from './firebase';
import type {
  Customer,
  SubscriptionPlan,
  Subscription,
  SubscriptionPayment
} from '@/types/subscription';

// Collections references
export const customersCollection = collection(db, 'customers');
export const plansCollection = collection(db, 'subscription_plans');
export const subscriptionsCollection = collection(db, 'subscriptions');
export const paymentsCollection = collection(db, 'subscription_payments');

// Helper function to convert Firestore timestamp to Date
const timestampToDate = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  return timestamp instanceof Date ? timestamp : new Date(timestamp);
};

// Helper function to convert Date to Firestore timestamp
const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};

// Customer operations
export const createCustomer = async (customerData: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Promise<string> => {
  const now = new Date();
  const customer: Omit<Customer, 'id'> = {
    ...customerData,
    created_at: now,
    updated_at: now
  };

  const docRef = await addDoc(customersCollection, {
    ...customer,
    created_at: dateToTimestamp(customer.created_at),
    updated_at: dateToTimestamp(customer.updated_at)
  });
  
  return docRef.id;
};

export const getCustomerByEmail = async (email: string): Promise<Customer | null> => {
  const q = query(customersCollection, where('email', '==', email), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }
  
  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data();
  
  return {
    id: docSnap.id,
    ...data,
    created_at: timestampToDate(data.created_at),
    updated_at: timestampToDate(data.updated_at)
  } as Customer;
};

export const updateCustomer = async (id: string, updateData: Partial<Omit<Customer, 'id' | 'created_at'>>): Promise<void> => {
  const customerRef = doc(customersCollection, id);
  const updates = {
    ...updateData,
    updated_at: dateToTimestamp(new Date())
  };
  
  await updateDoc(customerRef, updates);
};

// Subscription Plan operations
export const createSubscriptionPlan = async (planData: Omit<SubscriptionPlan, 'id' | 'created_at' | 'updated_at'>): Promise<string> => {
  const now = new Date();
  const plan: Omit<SubscriptionPlan, 'id'> = {
    ...planData,
    created_at: now,
    updated_at: now
  };

  const docRef = await addDoc(plansCollection, {
    ...plan,
    created_at: dateToTimestamp(plan.created_at),
    updated_at: dateToTimestamp(plan.updated_at)
  });
  
  return docRef.id;
};

export const getSubscriptionPlan = async (id: string): Promise<SubscriptionPlan | null> => {
  const docRef = doc(plansCollection, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    created_at: timestampToDate(data.created_at),
    updated_at: timestampToDate(data.updated_at)
  } as SubscriptionPlan;
};

export const getAllSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  const q = query(plansCollection, where('active', '==', true), orderBy('price', 'asc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      created_at: timestampToDate(data.created_at),
      updated_at: timestampToDate(data.updated_at)
    } as SubscriptionPlan;
  });
};

// Subscription operations
export const createSubscription = async (subscriptionData: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>): Promise<string> => {
  const now = new Date();
  const subscription: Omit<Subscription, 'id'> = {
    ...subscriptionData,
    created_at: now,
    updated_at: now
  };

  const docRef = await addDoc(subscriptionsCollection, {
    ...subscription,
    start_time: subscription.start_time ? dateToTimestamp(subscription.start_time) : null,
    next_billing_date: subscription.next_billing_date ? dateToTimestamp(subscription.next_billing_date) : null,
    last_payment_date: subscription.last_payment_date ? dateToTimestamp(subscription.last_payment_date) : null,
    created_at: dateToTimestamp(subscription.created_at),
    updated_at: dateToTimestamp(subscription.updated_at)
  });
  
  return docRef.id;
};

export const getSubscription = async (id: string): Promise<Subscription | null> => {
  const docRef = doc(subscriptionsCollection, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    start_time: data.start_time ? timestampToDate(data.start_time) : undefined,
    next_billing_date: data.next_billing_date ? timestampToDate(data.next_billing_date) : undefined,
    last_payment_date: data.last_payment_date ? timestampToDate(data.last_payment_date) : undefined,
    created_at: timestampToDate(data.created_at),
    updated_at: timestampToDate(data.updated_at)
  } as Subscription;
};

export const getCustomerSubscriptions = async (customerId: string): Promise<Subscription[]> => {
  const q = query(subscriptionsCollection, where('customer_id', '==', customerId), orderBy('created_at', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      start_time: data.start_time ? timestampToDate(data.start_time) : undefined,
      next_billing_date: data.next_billing_date ? timestampToDate(data.next_billing_date) : undefined,
      last_payment_date: data.last_payment_date ? timestampToDate(data.last_payment_date) : undefined,
      created_at: timestampToDate(data.created_at),
      updated_at: timestampToDate(data.updated_at)
    } as Subscription;
  });
};

export const updateSubscription = async (id: string, updateData: Partial<Omit<Subscription, 'id' | 'created_at'>>): Promise<void> => {
  const subscriptionRef = doc(subscriptionsCollection, id);
  
  const updates: any = {
    ...updateData,
    updated_at: dateToTimestamp(new Date())
  };

  // Convert dates to timestamps
  if (updates.start_time) {
    updates.start_time = dateToTimestamp(updates.start_time);
  }
  if (updates.next_billing_date) {
    updates.next_billing_date = dateToTimestamp(updates.next_billing_date);
  }
  if (updates.last_payment_date) {
    updates.last_payment_date = dateToTimestamp(updates.last_payment_date);
  }
  
  await updateDoc(subscriptionRef, updates);
};

// Payment operations
export const createSubscriptionPayment = async (paymentData: Omit<SubscriptionPayment, 'id' | 'created_at'>): Promise<string> => {
  const payment: Omit<SubscriptionPayment, 'id'> = {
    ...paymentData,
    created_at: new Date()
  };

  const docRef = await addDoc(paymentsCollection, {
    ...payment,
    paid_at: payment.paid_at ? dateToTimestamp(payment.paid_at) : null,
    created_at: dateToTimestamp(payment.created_at)
  });
  
  return docRef.id;
};

export const getSubscriptionPayments = async (subscriptionId: string): Promise<SubscriptionPayment[]> => {
  const q = query(paymentsCollection, where('subscription_id', '==', subscriptionId), orderBy('created_at', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      paid_at: data.paid_at ? timestampToDate(data.paid_at) : undefined,
      created_at: timestampToDate(data.created_at)
    } as SubscriptionPayment;
  });
};