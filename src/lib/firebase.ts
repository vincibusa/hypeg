import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

// Connect to Firestore emulator only if explicitly enabled
if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true' && process.env.NODE_ENV === 'development' && !(global as any)._firestoreEmulatorConnected) {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    (global as any)._firestoreEmulatorConnected = true;
    console.log('Connected to Firebase Emulator');
  } catch {
    // Emulator already connected or not available
  }
}

export { db, app };
export default db;