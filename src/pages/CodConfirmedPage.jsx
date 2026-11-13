import { Link, useSearchParams } from 'react-router-dom'

export default function CodConfirmedPage() {
  const [params] = useSearchParams()
  const orderId = params.get('order_id')
  return <section className="min-h-[70vh] bg-cream px-4 sm:px-6 pt-32 pb-24 flex items-center justify-center"><div className="max-w-lg w-full bg-white border border-forest/10 rounded-2xl p-6 sm:p-10 text-center">
    <p className="font-body text-xs uppercase tracking-widest text-gold-dark mb-3">Cash on delivery</p>
    <h1 className="font-display text-4xl mb-4">Order received</h1>
    <p className="font-body text-sm text-forest/70 leading-relaxed mb-5">Your order is recorded. You’ll pay when it is delivered. We’ll confirm delivery availability before dispatch.</p>
    {orderId && <><p className="font-body text-sm text-forest/70 break-all mb-6">Order ID: <strong>{orderId}</strong></p><Link to={`/track?order_id=${encodeURIComponent(orderId)}`} className="inline-flex min-h-12 items-center px-6 bg-forest text-cream font-body text-sm rounded-lg">Track your order</Link></>}
  </div></section>
}
