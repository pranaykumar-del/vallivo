import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { verifyCashfreeOrder } from '../lib/cashfree'

export default function PaymentStatusPage() {
  const [params] = useSearchParams()
  const orderId = params.get('order_id')
  const [status, setStatus] = useState('loading')
  const [details, setDetails] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    if (!orderId) {
      setStatus('error')
      setError('Missing order id.')
      return
    }

    verifyCashfreeOrder(orderId)
      .then((data) => {
        if (!active) return
        setDetails(data)
        const paid = ['PAID', 'SUCCESS'].includes(String(data.orderStatus || '').toUpperCase())
        setStatus(paid ? 'success' : 'pending')
      })
      .catch((err) => {
        if (!active) return
        setStatus('error')
        setError(err.message || 'Verification failed.')
      })

    return () => {
      active = false
    }
  }, [orderId])

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-cream px-6 pt-32 pb-24">
      <div className="max-w-lg w-full text-center bg-cream-soft border border-forest/10 rounded-2xl px-8 py-12">
        {status === 'loading' && (
          <>
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-body mb-3">Payment</p>
            <h1 className="font-display text-3xl text-forest mb-3">Confirming payment…</h1>
            <p className="font-body text-sm text-forest/60">Please wait a moment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <p className="text-[11px] tracking-[0.22em] uppercase text-fennette font-body mb-3">Paid</p>
            <h1 className="font-display text-3xl text-forest mb-3">Thank you</h1>
            <p className="font-body text-sm text-forest/70 mb-2">
              Payment received{details?.orderAmount ? ` for Rs.${details.orderAmount}` : ''}.
            </p>
            <p className="font-body text-xs text-forest/45 mb-8">Order ID: {orderId}</p>
            <Link to={`/track?order_id=${encodeURIComponent(orderId)}`} className="inline-flex px-7 py-3 border border-forest text-forest text-[10px] tracking-[0.2em] uppercase font-body rounded-lg mb-3">Track order</Link>
            <br />
            <Link to="/#product" className="inline-flex px-7 py-3 bg-forest text-cream text-[10px] tracking-[0.2em] uppercase font-body rounded-lg">
              Continue shopping
            </Link>
          </>
        )}

        {status === 'pending' && (
          <>
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-body mb-3">Pending</p>
            <h1 className="font-display text-3xl text-forest mb-3">Payment not completed</h1>
            <p className="font-body text-sm text-forest/70 mb-2">
              Status: {details?.orderStatus || 'PENDING'}. If money was deducted, it will update shortly.
            </p>
            <p className="font-body text-xs text-forest/45 mb-8">Order ID: {orderId}</p>
            <Link to="/cart" className="inline-flex px-7 py-3 bg-forest text-cream text-[10px] tracking-[0.2em] uppercase font-body rounded-lg">
              Back to cart
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <p className="text-[11px] tracking-[0.22em] uppercase text-rosette font-body mb-3">Error</p>
            <h1 className="font-display text-3xl text-forest mb-3">Could not verify</h1>
            <p className="font-body text-sm text-forest/70 mb-8">{error}</p>
            <Link to="/cart" className="inline-flex px-7 py-3 bg-forest text-cream text-[10px] tracking-[0.2em] uppercase font-body rounded-lg">
              Back to cart
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
