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
const db = getFirestore(app, 'default')

export async function placeOrder({ name, phone, address, email, items, total }) {
  const orderId = crypto.randomUUID()
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Firestore timeout — database may not be set up')), 10000)
  )
  const write = addDoc(collection(db, 'orders'), {
    orderId,
    name: name.trim(),
    phone: phone.trim(),
    address: address.trim(),
    email: email?.trim() || '',
    items: items.map((i) => ({ product: i.name, quantity: i.quantity })),
    total: Number(total),
    status: 'pending',
    created_at: serverTimestamp(),
  })
  const docRef = await Promise.race([write, timeout])
  return { docRef, orderId }
}

export async function subscribeNewsletter(email) {
  const docRef = await addDoc(collection(db, 'subscribers'), {
    email: email.trim().toLowerCase(),
    created_at: serverTimestamp(),
  })
  return docRef
}
