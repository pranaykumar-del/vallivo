import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../lib/CartContext'
import { createCashfreeOrder, openCashfreeCheckout } from '../lib/cashfree'
import { whatsappOrderUrl } from '../lib/whatsapp'

export default function OrderForm({ items, total }) {
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', pincode: '' })
  const [paymentMethod, setPaymentMethod] = useState('online')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address || !items.length) return

    setStatus('loading')
    setError('')

    try {
      if (paymentMethod === 'cod') {
        const response = await fetch('/.netlify/functions/create-cod-order', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customer: form, items: items.map((item) => ({ slug: item.slug, quantity: item.quantity })) }),
        })
        const data = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(data.error || 'Could not place COD order.')
        clearCart()
        navigate(`/cod/confirmed?order_id=${encodeURIComponent(data.orderId)}`)
        return
      }
      const order = await createCashfreeOrder({
        customer: form,
        items: items.map((item) => ({
          slug: item.slug,
          name: item.name,
          quantity: item.quantity,
        })),
        total,
      })
      await openCashfreeCheckout(order.paymentSessionId)
    } catch (err) {
      setStatus('idle')
      setError(err.message || 'Payment could not be started.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-cream-soft border border-forest/10 p-5 sm:p-8 rounded-2xl min-w-0">
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-gold-dark font-body mb-2 font-medium">Checkout</p>
        <h3 className="font-display text-2xl text-forest font-semibold">Complete your order</h3>
        <p className="font-body text-sm text-forest/65 mt-2 leading-relaxed">
          No account needed. Enter your delivery details and continue to secure payment.
        </p>
        <p className="font-body text-sm text-forest/65 mt-3">
          Want your orders in one place? <Link to="/account" className="underline text-forest">Sign in with your mobile number</Link> first, then return to your cart.
        </p>
      </div>

      {[
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '10-digit mobile', required: true },
        { name: 'email', label: 'Email (optional)', type: 'email', placeholder: 'you@email.com', required: false },
        { name: 'address', label: 'Delivery Address', type: 'text', placeholder: 'Street, city, pincode', required: true },
        { name: 'pincode', label: 'Delivery PIN code', type: 'text', placeholder: '110001', required: paymentMethod === 'cod' },
      ].map((field) => (
        <div key={field.name}>
          <label htmlFor={`checkout-${field.name}`} className="block text-xs tracking-wide text-forest/70 uppercase font-body mb-2 font-medium">
            {field.label}
          </label>
          <input
            id={`checkout-${field.name}`}
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            inputMode={field.name === 'pincode' ? 'numeric' : undefined}
            className="w-full min-w-0 bg-transparent border-b border-forest/20 py-3 font-body text-base text-forest placeholder-forest/35 focus:outline-none focus:border-gold transition-colors duration-200"
          />
        </div>
      ))}

      <fieldset className="space-y-3 border-t border-forest/10 pt-5">
        <legend className="font-body text-sm text-forest font-medium">Payment method</legend>
        <label className="flex items-center gap-3 font-body text-sm text-forest"><input type="radio" name="paymentMethod" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} /> Pay online with Cashfree</label>
        <label className="flex items-center gap-3 font-body text-sm text-forest"><input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> Cash on delivery <span className="text-forest/55">(Delhi PIN codes only)</span></label>
        {paymentMethod === 'cod' && <p className="font-body text-xs text-forest/65">You pay Rs.{total} when your order is delivered. We will confirm delivery availability before dispatch.</p>}
      </fieldset>

      {error && (
        <p role="alert" className="font-body text-xs text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={!items.length || status === 'loading'}
        className="w-full py-4 bg-forest text-cream font-body text-xs tracking-widest uppercase hover:bg-forest-soft transition-colors duration-200 disabled:opacity-50 mt-2"
      >
        {status === 'loading' ? 'Placing order…' : paymentMethod === 'cod' ? `Place COD order · Rs.${total}` : `Pay Rs.${total} online`}
      </button>
      {status === 'loading' && paymentMethod === 'cod' && (
        <p role="status" className="font-body text-sm text-forest/70 text-center">
          Saving your order securely. Please keep this page open until you see your order number.
        </p>
      )}

      <a
        href={whatsappOrderUrl(items, total, form)}
        target="_blank"
        rel="noreferrer"
        className="block text-center text-[10px] tracking-[0.18em] uppercase font-body text-forest/45 hover:text-forest"
      >
        Or order on WhatsApp
      </a>

      <div className="pt-2 text-center">
        <Link to="/" className="text-[10px] tracking-widest text-forest/40 uppercase font-body hover:text-forest">
          Continue shopping
        </Link>
      </div>
    </form>
  )
}
