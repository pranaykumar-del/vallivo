import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../lib/CartContext'

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
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
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Collection', href: '/#product' },
    { label: 'Rituals', href: '/#experience' },
    { label: 'About', href: '/#story' },
    { label: 'Reviews', href: '/reviews' },
  ]

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(249,231,196,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196,161,90,0.28)' : '1px solid transparent',
      }}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[4.5rem] flex items-center justify-between">
        <Link
          to="/"
          className={`font-display text-lg tracking-[0.22em] font-semibold transition-colors ${
            scrolled ? 'text-forest' : 'text-cream'
          }`}
        >
          VALLIVO
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-[11px] tracking-[0.2em] uppercase font-body transition-colors font-medium ${
                scrolled ? 'text-forest/70 hover:text-forest' : 'text-cream/75 hover:text-cream'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            to="/cart"
            className={`relative transition-colors ${
              scrolled ? 'text-forest/55 hover:text-forest' : 'text-cream/70 hover:text-cream'
            }`}
            aria-label="Cart"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 flex items-center justify-center bg-forest text-cream text-[8px] font-body rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            to="/#product"
            className={`hidden sm:inline-flex px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-body transition-colors ${
              scrolled
                ? 'bg-forest text-cream hover:bg-forest-soft'
                : 'bg-cream text-forest hover:bg-cream-soft'
            }`}
          >
            Shop
          </Link>
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-px transition-all ${scrolled ? 'bg-forest' : 'bg-cream'} ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-px transition-all ${scrolled ? 'bg-forest' : 'bg-cream'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px transition-all ${scrolled ? 'bg-forest' : 'bg-cream'} ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-cream-soft border-t border-gold/20 px-6 py-7 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-[0.2em] uppercase font-body text-forest"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </motion.header>
  )
}
