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
    <form onSubmit={handleSubmit} className="flex border-b border-cream/40 focus-within:border-gold transition-colors">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="flex-1 bg-transparent py-2.5 font-body text-sm text-cream placeholder-cream/55 focus:outline-none"
      />
      <button type="submit" disabled={status === 'loading'} className="text-[10px] tracking-[0.2em] text-gold-light uppercase font-body pl-3 font-medium">
        {status === 'loading' ? '…' : 'Join'}
      </button>
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="bg-forest-deep py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-display text-2xl tracking-[0.2em] text-cream font-semibold mb-2">VALLIVO</div>
            <p className="label-rule text-[9px] tracking-[0.28em] text-gold uppercase font-body mb-4 font-medium">Lifestyle Tea</p>
            <p className="font-body text-cream/85 text-sm leading-relaxed mb-5">Elevate Your Everyday.</p>
            <NewsletterForm />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.22em] text-gold uppercase font-body mb-4 font-medium">Navigate</div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Collection', href: '/#product' },
                { label: 'Rituals', href: '/#experience' },
                { label: 'About', href: '/#story' },
                { label: 'Reviews', href: '/reviews' },
                { label: 'Cart', href: '/cart' },
              ].map((l) => (
                <Link key={l.href} to={l.href} className="font-body text-sm text-cream/80 hover:text-gold-light transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.22em] text-gold uppercase font-body mb-4 font-medium">Connect</div>
            <div className="flex flex-col gap-2.5">
              <a href="https://instagram.com/vallivo" target="_blank" rel="noreferrer" className="font-body text-sm text-cream/80 hover:text-gold-light transition-colors">Instagram</a>
              <a href="https://wa.me/916304207706" target="_blank" rel="noreferrer" className="font-body text-sm text-cream/80 hover:text-gold-light transition-colors">WhatsApp</a>
              <a href="https://www.vallivo.com" target="_blank" rel="noreferrer" className="font-body text-sm text-cream/80 hover:text-gold-light transition-colors">www.vallivo.com</a>
            </div>
          </div>
        </div>
        <div className="gold-line mb-6" />
        <p className="font-body text-xs text-cream/55 tracking-wide">© 2026 Vallivo. All rights reserved.</p>
      </div>
    </footer>
  )
}
