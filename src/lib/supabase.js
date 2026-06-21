import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

if (!firebaseConfig.projectId) {
  console.warn('Firebase credentials missing. Copy .env.example to .env and fill in your keys.')
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function placeOrder({ name, phone, address, quantity, product = 'Focus Flow Tea', email }) {
  const docRef = await addDoc(collection(db, 'orders'), {
    name: name.trim(),
    phone: phone.trim(),
    address: address.trim(),
    email: email?.trim() || '',
    quantity: Number(quantity),
    product,
    created_at: serverTimestamp(),
  })
  return docRef
}
