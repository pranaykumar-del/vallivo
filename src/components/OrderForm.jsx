import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../lib/CartContext'
import { createCashfreeOrder, openCashfreeCheckout } from '../lib/cashfree'
import { whatsappOrderUrl } from '../lib/whatsapp'

export default function OrderForm({ items, total, onSuccess }) {
  const { clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address || !items.length) return

    setStatus('loading')
    setError('')

    try {
      const order = await createCashfreeOrder({
        customer: form,
        items: items.map((item) => ({
          slug: item.slug,
          name: item.name,
          quantity: item.quantity,
        })),
        total,
      })
      clearCart()
      onSuccess?.()
      await openCashfreeCheckout(order.paymentSessionId)
    } catch (err) {
      setStatus('idle')
      setError(err.message || 'Payment could not be started.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-cream-soft border border-forest/10 p-8 rounded-2xl">
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-gold-dark font-body mb-2 font-medium">Checkout</p>
        <h3 className="font-display text-2xl text-forest font-semibold">Pay securely</h3>
        <p className="font-body text-sm text-forest/65 mt-2 leading-relaxed">
          Enter delivery details and continue to Cashfree checkout.
        </p>
      </div>

      {[
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '10-digit mobile', required: true },
        { name: 'email', label: 'Email (optional)', type: 'email', placeholder: 'you@email.com', required: false },
        { name: 'address', label: 'Delivery Address', type: 'text', placeholder: 'Street, city, pincode', required: true },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-[10px] tracking-widest text-forest/55 uppercase font-body mb-2 font-medium">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full bg-transparent border-b border-forest/20 py-3 font-body text-sm text-forest placeholder-forest/35 focus:outline-none focus:border-gold transition-colors duration-200"
          />
        </div>
      ))}

      {error && (
        <p role="alert" className="font-body text-xs text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={!items.length || status === 'loading'}
        className="w-full py-4 bg-forest text-cream font-body text-xs tracking-widest uppercase hover:bg-forest-soft transition-colors duration-200 disabled:opacity-50 mt-2"
      >
        {status === 'loading' ? 'Opening Cashfree…' : `Pay Rs.${total}`}
      </button>

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
