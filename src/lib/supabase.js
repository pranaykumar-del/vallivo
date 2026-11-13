const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let appPromise

function getApp() {
  if (!appPromise) {
    appPromise = import('firebase/app').then(({ initializeApp }) => initializeApp(firebaseConfig))
  }
  return appPromise
}

async function getDb() {
  const [{ getFirestore }, app] = await Promise.all([import('firebase/firestore'), getApp()])
  return getFirestore(app, 'default')
}

export async function getAuthClient() {
  const [{ getAuth }, app] = await Promise.all([import('firebase/auth'), getApp()])
  return getAuth(app)
}

async function getStorageBucket() {
  const [{ getStorage }, app] = await Promise.all([import('firebase/storage'), getApp()])
  return getStorage(app)
}

export async function placeOrder({ name, phone, address, email, items, total }) {
  const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
  const db = await getDb()
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
  const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
  const db = await getDb()
  const docRef = await addDoc(collection(db, 'subscribers'), {
    email: email.trim().toLowerCase(),
    created_at: serverTimestamp(),
  })
  return docRef
}

export async function getReviews() {
  const { collection, getDocs, query, where } = await import('firebase/firestore')
  const db = await getDb()
  const approvedReviews = query(collection(db, 'reviews'), where('status', '==', 'approved'))
  const snapshot = await getDocs(approvedReviews)

  return snapshot.docs
    .map((review) => ({ id: review.id, ...review.data() }))
    .sort((a, b) => {
      const aTime = a.created_at?.toMillis?.() || 0
      const bTime = b.created_at?.toMillis?.() || 0
      return bTime - aTime
    })
}

export async function submitReview({ name, city, product, rating, text, files }) {
  const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
  const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage')
  const db = await getDb()
  const storage = await getStorageBucket()
  const reviewId = crypto.randomUUID()
  const media = []

  for (const [index, file] of files.entries()) {
    const extension = file.name.split('.').pop()?.toLowerCase() || 'file'
    const fileRef = ref(storage, `reviews/${reviewId}/${index}-${crypto.randomUUID()}.${extension}`)
    await uploadBytes(fileRef, file, { contentType: file.type })
    media.push({
      url: await getDownloadURL(fileRef),
      type: file.type.startsWith('video/') ? 'video' : 'image',
    })
  }

  const docRef = await addDoc(collection(db, 'reviews'), {
    reviewId,
    name: name.trim(),
    city: city.trim(),
    product,
    rating: Number(rating),
    text: text.trim(),
    media,
    status: 'pending',
    created_at: serverTimestamp(),
  })

  return { docRef, reviewId }
}
