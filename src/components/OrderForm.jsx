import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../lib/CartContext'
import { whatsappOrderUrl } from '../lib/whatsapp'

export default function OrderForm({ items, total, onSuccess }) {
  const { clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [waUrl, setWaUrl] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address || !items.length) return

    const url = whatsappOrderUrl(items, total, form)
    setWaUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
    clearCart()
    onSuccess?.()
  }

  if (waUrl) {
    return (
      <div className="bg-cream-soft p-10 text-center border border-gold/25">
        <h3 className="font-display text-2xl text-forest font-semibold mb-3">Opening WhatsApp</h3>
        <div className="gold-line w-16 mx-auto mb-6" />
        <p className="font-body text-forest/75 text-sm leading-relaxed mb-8">
          Complete your order in WhatsApp. If it didn’t open, tap below.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex px-8 py-3.5 bg-[#25D366] text-white font-body text-xs tracking-widest uppercase"
        >
          Open WhatsApp
        </a>
        <div className="mt-6">
          <Link to="/" className="text-xs tracking-widest text-forest uppercase font-body border-b border-gold/50 pb-1">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-cream-soft border border-forest/10 p-8">
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-gold-dark font-body mb-2 font-medium">Checkout</p>
        <h3 className="font-display text-2xl text-forest font-semibold">Order via WhatsApp</h3>
        <p className="font-body text-sm text-forest/65 mt-2 leading-relaxed">
          Share your details and we’ll confirm your order on WhatsApp.
        </p>
      </div>

      {[
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
        { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
        { name: 'address', label: 'Delivery Address', type: 'text', placeholder: 'Street, city, pincode' },
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
            required
            className="w-full bg-transparent border-b border-forest/20 py-3 font-body text-sm text-forest placeholder-forest/35 focus:outline-none focus:border-gold transition-colors duration-200"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={!items.length}
        className="w-full py-4 bg-[#25D366] text-white font-body text-xs tracking-widest uppercase hover:bg-[#1ebe57] transition-colors duration-200 disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Order through WhatsApp — Rs.{total}
      </button>
    </form>
  )
}
