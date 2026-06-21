import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          <div>
            <div className="font-display text-2xl text-cream tracking-widest mb-1">VALLIVO</div>
            <div className="text-[9px] tracking-widest2 text-gold/60 uppercase font-body mb-5">Premium Wellness Teas</div>
            <p className="font-body text-cream/40 text-sm leading-relaxed">
              Premium wellness teas.<br />Rituals are not routines.
            </p>
          </div>

          <div>
            <div className="text-[10px] tracking-widest text-gold/60 uppercase font-body mb-5">Navigate</div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Product', href: '/#product' },
                { label: 'Experience', href: '/#experience' },
                { label: 'Our Story', href: '/#story' },
                { label: 'Order', href: '/cart' },
              ].map((l) => (
                <Link key={l.label} to={l.href}
                  className="font-body text-sm text-cream/50 hover:text-gold transition-colors tracking-wide">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-widest text-gold/60 uppercase font-body mb-5">Connect</div>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com/vallivo" target="_blank" rel="noreferrer"
                className="font-body text-sm text-cream/50 hover:text-gold transition-colors tracking-wide">
                Instagram
              </a>
              <a href="https://wa.me/916304207706" target="_blank" rel="noreferrer"
                className="font-body text-sm text-cream/50 hover:text-gold transition-colors tracking-wide">
                WhatsApp
              </a>
              <a href="mailto:hello@vallivo.in"
                className="font-body text-sm text-cream/50 hover:text-gold transition-colors tracking-wide">
                hello@vallivo.in
              </a>
            </div>
          </div>
        </div>

        <div className="gold-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/30 tracking-wide">
            (c) 2026 Vallivo. All rights reserved.
          </p>
          <p className="font-body text-xs text-cream/20 tracking-widest uppercase">
            Made for modern rituals
          </p>
        </div>
      </div>
    </footer>
  )
}
