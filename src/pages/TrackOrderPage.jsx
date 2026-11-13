import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const steps = [
  ['confirmed', 'Order confirmed', 'Your payment is complete and we have your order.'],
  ['packing', 'Preparing your order', 'Your blends are being packed.'],
  ['shipped', 'Shipped', 'Your parcel has left us.'],
  ['out_for_delivery', 'Out for delivery', 'Your parcel is on its way today.'],
  ['delivered', 'Delivered', 'Your order has arrived.'],
]

export default function TrackOrderPage() {
  const [params] = useSearchParams()
  const [orderId, setOrderId] = useState(params.get('order_id') || '')
  const [phone, setPhone] = useState('')
  const [lookup, setLookup] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!lookup) return undefined
    let active = true
    const refresh = async () => {
      try {
        const response = await fetch('/.netlify/functions/track-order', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lookup),
        })
        const data = await response.json()
        if (!active) return
        if (!response.ok) throw new Error(data.error || 'Could not find this order.')
        setResult(data)
        setError('')
      } catch (err) {
        if (active) setError(err.message || 'Could not find this order.')
      } finally {
        if (active) setLoading(false)
      }
    }
    refresh()
    const timer = setInterval(refresh, 30000)
    return () => { active = false; clearInterval(timer) }
  }, [lookup])

  const current = steps.findIndex(([key]) => key === result?.tracking?.status)
  const onSubmit = (event) => {
    event.preventDefault()
    setResult(null)
    setError('')
    setLoading(true)
    setLookup({ orderId: orderId.trim(), phone: phone.trim() })
  }

  return (
    <section className="min-h-[70vh] bg-cream px-4 sm:px-6 pt-28 pb-20">
      <div className="max-w-4xl mx-auto">
        <p className="font-body text-xs tracking-widest uppercase text-gold-dark mb-3">Your order</p>
        <h1 className="font-display text-4xl sm:text-5xl text-forest mb-3">Track your order</h1>
        <p className="font-body text-forest/70 mb-8">See the latest status of your Vallivo order. Updates refresh every 30 seconds.</p>

        <form onSubmit={onSubmit} className="bg-cream-soft border border-forest/10 rounded-2xl p-5 sm:p-8 grid sm:grid-cols-[1fr_1fr_auto] gap-4 sm:items-end">
          <label className="block font-body text-sm text-forest">Order ID
            <input required value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="vallivo_..." autoComplete="off" className="mt-2 w-full min-h-12 px-3 bg-white border border-forest/20 rounded-lg text-base" />
          </label>
          <label className="block font-body text-sm text-forest">Checkout phone
            <input required type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="10-digit mobile number" className="mt-2 w-full min-h-12 px-3 bg-white border border-forest/20 rounded-lg text-base" />
          </label>
          <button disabled={loading} type="submit" className="min-h-12 px-6 bg-forest text-cream font-body text-sm uppercase tracking-wide rounded-lg disabled:opacity-60">{loading ? 'Checking…' : 'Track order'}</button>
        </form>
        {error && <p role="alert" className="mt-5 text-red-700 font-body text-sm">{error}</p>}
        {result && <div className="mt-8 bg-white border border-forest/10 rounded-2xl p-5 sm:p-8" aria-live="polite">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-7">
            <div><p className="font-body text-xs uppercase tracking-wide text-forest/50">Order {result.orderId}</p><h2 className="font-display text-3xl mt-2">{result.tracking ? steps[current]?.[1] || 'Order confirmed' : 'Payment pending'}</h2></div>
            <span className="font-body text-xs uppercase tracking-wide bg-cream px-3 py-2 rounded-full">Payment: {result.paymentStatus}</span>
          </div>
          {result.tracking ? <>
            {result.tracking.status === 'cancelled' ? <p className="font-body text-sm text-forest/70">This order was cancelled. Please contact us if you need help.</p> : <ol className="space-y-5 border-l border-gold/40 ml-2 pl-6">
              {steps.map(([key, title, description], index) => <li key={key} className={index <= current ? 'text-forest' : 'text-forest/40'}><h3 className="font-body font-medium text-base">{title}</h3><p className="font-body text-sm mt-1">{description}</p></li>)}
            </ol>}
            {result.tracking.updatedAt && <p className="font-body text-xs text-forest/50 mt-7">Last updated: {new Date(result.tracking.updatedAt).toLocaleString()}</p>}
            {result.tracking.carrier && <p className="font-body text-sm text-forest mt-4">Courier: {result.tracking.carrier}</p>}
            {result.tracking.trackingNumber && <p className="font-body text-sm text-forest">Tracking number: {result.tracking.trackingNumber}</p>}
            {/^https:\/\//.test(result.tracking.trackingUrl) && <a href={result.tracking.trackingUrl} target="_blank" rel="noreferrer" className="inline-block mt-4 underline text-forest font-body text-sm">View courier tracking</a>}
          </> : <p className="font-body text-sm text-forest/70">Payment has not been confirmed yet. Please check again shortly.</p>}
        </div>}
      </div>
    </section>
  )
}
