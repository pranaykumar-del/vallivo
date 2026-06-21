import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../lib/CartContext'

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinejoin="round" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Collection', href: '/#product' },
    { label: 'Rituals', href: '/#experience' },
    { label: 'About', href: '/#story' },
    { label: 'Gifting', href: '/cart' },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(7,9,9,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(199,156,83,0.2)' : '1px solid transparent',
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-display text-xl font-normal text-gold tracking-widest2">VALLIVO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link key={l.href} to={l.href}
              className="text-xs tracking-widest font-body font-medium text-cream/70 hover:text-gold transition-colors duration-300 uppercase">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/cart" className="relative text-cream/70 hover:text-gold transition-colors duration-300" aria-label="Cart">
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 flex items-center justify-center bg-gold text-navy text-[9px] font-body rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/#product"
            className="inline-flex px-6 py-2.5 bg-gold text-navy text-xs tracking-widest font-body uppercase hover:bg-gold-light transition-colors duration-300">
            Shop Rituals
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-5">
          <Link to="/cart" className="relative text-cream/70" aria-label="Cart">
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 flex items-center justify-center bg-gold text-navy text-[9px] font-body rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2">
            <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          className="md:hidden bg-ink border-t border-gold/20 px-6 py-8 flex flex-col gap-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          {links.map((l) => (
            <Link key={l.href} to={l.href} onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest font-body text-cream uppercase">{l.label}</Link>
          ))}
          <Link to="/#product" onClick={() => setMenuOpen(false)}
            className="text-center px-6 py-3 bg-gold text-navy text-xs tracking-widest font-body uppercase">
            Shop Rituals
          </Link>
        </motion.div>
      )}
    </motion.header>
  )
}
