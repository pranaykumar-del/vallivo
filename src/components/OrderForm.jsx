import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { placeOrder } from '../lib/supabase'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../lib/CartContext'

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

export default function OrderForm({ items, total, onSuccess }) {
  const { clearCart } = useCart()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address || !form.email) return
    setStatus('loading')
    try {
      for (const item of items) {
        await placeOrder({ ...form, product: item.name, quantity: item.quantity })
      }

      if (!EMAILJS_SERVICE_ID.startsWith('YOUR_')) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            to_name: form.name,
            to_email: form.email,
            phone: form.phone,
            address: form.address,
            order_summary: items.map((i) => `${i.name} x${i.quantity}`).join(', '),
            total: `Rs.${total}`,
          },
          EMAILJS_PUBLIC_KEY
        )
      }

      setStatus('success')
      clearCart()
      onSuccess?.()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-navy-dark p-12 text-center border border-gold/10"
      >
        <div className="text-gold text-4xl mb-6">OK</div>
        <h3 className="font-display text-2xl text-cream mb-3">Order Confirmed!</h3>
        <div className="gold-line w-16 mx-auto mb-6" />
        <p className="font-body text-cream/60 text-sm leading-relaxed">
          A confirmation email has been sent to <span className="text-gold">{form.email}</span>.<br />
          We'll dispatch within 1-2 business days.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block text-xs tracking-widest text-gold uppercase font-body border-b border-gold/40 pb-1"
        >
          Continue shopping
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {[
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
        { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
        { name: 'address', label: 'Delivery Address', type: 'text', placeholder: 'Street, city, pincode' },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-[10px] tracking-widest text-cream/40 uppercase font-body mb-2">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required
            className="w-full bg-transparent border-b border-cream/20 py-3 font-body text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-colors duration-300"
          />
        </div>
      ))}

      {status === 'error' && (
        <p className="text-red-400 text-xs font-body">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-gold text-navy font-body text-xs tracking-widest uppercase hover:bg-gold-light transition-colors duration-300 disabled:opacity-50 mt-4 font-medium"
      >
        {status === 'loading' ? 'Placing Order...' : `Place Order - Rs.${total}`}
      </button>
    </motion.form>
  )
}
