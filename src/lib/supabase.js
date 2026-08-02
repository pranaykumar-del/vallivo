import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCb-KET-o87R4SfnmtFHNSsy1bYIApf4I8',
  authDomain: 'vallivo-1c875.firebaseapp.com',
  projectId: 'vallivo-1c875',
  storageBucket: 'vallivo-1c875.firebasestorage.app',
  messagingSenderId: '90533768902',
  appId: '1:90533768902:web:074e5a4f16945c3c19f1c7',
}

if (!firebaseConfig.projectId) {
  console.warn('Firebase credentials missing. Copy .env.example to .env and fill in your keys.')
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function placeOrder({ name, phone, address, email, items, total }) {
  const orderId = crypto.randomUUID()
  const docRef = await addDoc(collection(db, 'orders'), {
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
  return { docRef, orderId }
}

export async function subscribeNewsletter(email) {
  const docRef = await addDoc(collection(db, 'subscribers'), {
    email: email.trim().toLowerCase(),
    created_at: serverTimestamp(),
  })
  return docRef
}
