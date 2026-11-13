import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuthClient } from '../lib/supabase'

export default function AccountPage() {
  const [user, setUser] = useState(null)
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const verifier = useRef(null)

  useEffect(() => {
    let unsubscribe = () => {}
    getAuthClient().then(async (auth) => {
      const { onAuthStateChanged } = await import('firebase/auth')
      unsubscribe = onAuthStateChanged(auth, setUser)
    }).catch(() => setError('Login is not configured yet.'))
    return () => { unsubscribe(); verifier.current?.clear(); verifier.current = null }
  }, [])

  useEffect(() => {
    if (!user) return undefined
    let active = true
    const load = async () => {
      try {
        const response = await fetch('/.netlify/functions/my-orders', { method: 'POST', headers: { Authorization: `Bearer ${await user.getIdToken()}` } })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Could not load orders.')
        if (active) { setOrders(data.orders || []); setError('') }
      } catch (err) { if (active) setError(err.message) }
    }
    load()
    const timer = setInterval(load, 30000)
    return () => { active = false; clearInterval(timer) }
  }, [user])

  const sendCode = async (event) => {
    event.preventDefault(); setError(''); setStatus('sending')
    try {
      const digits = phone.replace(/\D/g, '').slice(-10)
      if (digits.length !== 10) throw new Error('Enter a valid 10-digit mobile number.')
      const auth = await getAuthClient()
      const { RecaptchaVerifier, signInWithPhoneNumber } = await import('firebase/auth')
      if (!verifier.current) verifier.current = new RecaptchaVerifier(auth, 'otp-recaptcha', { size: 'invisible' })
      setConfirmation(await signInWithPhoneNumber(auth, `+91${digits}`, verifier.current))
      setStatus('sent')
    } catch (err) {
      setError(err.message || 'Could not send the code.')
      setStatus('idle')
      verifier.current?.clear(); verifier.current = null
    }
  }

  const confirmCode = async (event) => {
    event.preventDefault(); setError(''); setStatus('checking')
    try { await confirmation.confirm(code.trim()); setConfirmation(null); setStatus('idle') }
    catch (err) { setError(err.message || 'Invalid code.'); setStatus('sent') }
  }

  return <section className="min-h-[70vh] bg-cream px-4 sm:px-6 pt-28 pb-20"><div className="max-w-3xl mx-auto">
    <p className="font-body text-xs tracking-widest uppercase text-gold-dark mb-3">Vallivo account</p>
    <h1 className="font-display text-4xl sm:text-5xl mb-4">Your orders</h1>
    {user ? <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8"><p className="font-body text-sm text-forest/70">Signed in as {user.phoneNumber}</p><button className="font-body text-sm underline" onClick={async () => { const { signOut } = await import('firebase/auth'); await signOut(await getAuthClient()); setOrders([]) }}>Sign out</button></div>
      {orders.length ? <div className="grid gap-4">{orders.map((order) => <article key={order.orderId} className="bg-white rounded-2xl border border-forest/10 p-5 sm:p-6 flex flex-wrap justify-between gap-4"><div><p className="font-body text-xs text-forest/50 break-all">{order.orderId}</p><h2 className="font-display text-2xl capitalize mt-2">{order.status.replaceAll('_', ' ')}</h2><p className="font-body text-sm text-forest/60 mt-1">{new Date(order.createdAt).toLocaleDateString()} · Rs.{order.amount}</p></div><Link to={`/track?order_id=${encodeURIComponent(order.orderId)}`} className="self-center font-body text-sm underline">View tracking</Link></article>)}</div> : <p className="font-body text-sm text-forest/70">No orders found for this number yet. Orders placed before account tracking was enabled may need their order ID.</p>}
    </> : <div className="bg-white border border-forest/10 rounded-2xl p-5 sm:p-8"><p className="font-body text-sm text-forest/70 mb-6">Sign in with the mobile number used at checkout. We’ll text you a one-time code.</p>
      {!confirmation ? <form onSubmit={sendCode} className="space-y-4"><label className="block font-body text-sm">Mobile number<input type="tel" inputMode="tel" autoComplete="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="10-digit number" className="mt-2 w-full min-h-12 px-3 border border-forest/20 rounded-lg text-base" /></label><button disabled={status === 'sending'} className="min-h-12 px-6 bg-forest text-cream rounded-lg font-body text-sm disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send code'}</button></form> : <form onSubmit={confirmCode} className="space-y-4"><label className="block font-body text-sm">Verification code<input type="text" inputMode="numeric" autoComplete="one-time-code" required value={code} onChange={(event) => setCode(event.target.value)} className="mt-2 w-full min-h-12 px-3 border border-forest/20 rounded-lg text-base" /></label><button disabled={status === 'checking'} className="min-h-12 px-6 bg-forest text-cream rounded-lg font-body text-sm disabled:opacity-60">{status === 'checking' ? 'Checking…' : 'Sign in'}</button></form>}
      <div id="otp-recaptcha" />
    </div>}
    {error && <p role="alert" className="font-body text-sm text-red-700 mt-5">{error}</p>}
  </div></section>
}
