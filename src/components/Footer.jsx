import { useState } from 'react'
import { Link } from 'react-router-dom'
import { subscribeNewsletter } from '../lib/supabase'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      await subscribeNewsletter(email)
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="font-body text-sm text-gold-light">You're on the list.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex border-b border-cream/20 focus-within:border-gold transition-colors">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="flex-1 bg-transparent py-2.5 font-body text-sm text-cream placeholder-cream/30 focus:outline-none"
      />
      <button type="submit" disabled={status === 'loading'} className="text-[10px] tracking-[0.2em] text-gold uppercase font-body pl-3">
        {status === 'loading' ? '…' : 'Join'}
      </button>
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="bg-forest-deep py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="font-display text-2xl tracking-[0.2em] text-cream mb-2">VALLIVO</div>
            <p className="label-rule text-[9px] tracking-[0.28em] text-gold/60 uppercase font-body mb-5">Lifestyle Tea</p>
            <p className="font-body text-cream/40 text-sm leading-relaxed mb-5">Elevate Your Everyday.</p>
            <NewsletterForm />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.22em] text-gold/55 uppercase font-body mb-5">Navigate</div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Collection', href: '/#product' },
                { label: 'Rituals', href: '/#experience' },
                { label: 'About', href: '/#story' },
                { label: 'Reviews', href: '/reviews' },
                { label: 'Cart', href: '/cart' },
              ].map((l) => (
                <Link key={l.href} to={l.href} className="font-body text-sm text-cream/45 hover:text-gold transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.22em] text-gold/55 uppercase font-body mb-5">Connect</div>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com/vallivo" target="_blank" rel="noreferrer" className="font-body text-sm text-cream/45 hover:text-gold transition-colors">Instagram</a>
              <a href="https://wa.me/916304207706" target="_blank" rel="noreferrer" className="font-body text-sm text-cream/45 hover:text-gold transition-colors">WhatsApp</a>
              <a href="https://www.vallivo.com" target="_blank" rel="noreferrer" className="font-body text-sm text-cream/45 hover:text-gold transition-colors">www.vallivo.com</a>
            </div>
          </div>
        </div>
        <div className="gold-line mb-7" />
        <p className="font-body text-xs text-cream/25 tracking-wide">© 2026 Vallivo. All rights reserved.</p>
      </div>
    </footer>
  )
}
