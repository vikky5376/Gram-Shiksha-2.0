// Firebase v10 Modular SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDRVT1vwckL5wMXStmqR6DiRz_rij-eoWw",
  authDomain: "social-engine-ai-be8d6.firebaseapp.com",
  projectId: "social-engine-ai-be8d6",
  storageBucket: "social-engine-ai-be8d6.firebasestorage.app",
  messagingSenderId: "473575726772",
  appId: "1:473575726772:web:3842203c76caba44ce01e1",
  measurementId: "G-XXV9P0KP6C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
