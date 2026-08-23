import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TrustBar from './TrustBar'

const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: i % 3 === 0 ? 3 : 2,
  duration: 8 + (i % 7) * 1.2,
  delay: i * 0.35,
  drift: -18 - (i % 5) * 6,
}))

const CREST_DOTS = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
  const rad = (deg * Math.PI) / 180
  return { cx: 60 + 44 * Math.cos(rad), cy: 60 + 44 * Math.sin(rad) }
})

export default function Hero() {
  const [ready, setReady] = useState(false)
  useEffect(() => { setTimeout(() => setReady(true), 100) }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-ink px-6 pt-32 pb-24">
      <img
        src="/images/vallivo-lineup.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.22]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#060a10_0%,#091426_50%,#0d1520_100%)] opacity-95" />
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(199,156,83,0.08)_0%,transparent_70%)]" />

      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle absolute rounded-full bg-gold"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--drift': `${p.drift}px`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 30 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 120 120" fill="none" className="w-[90px] h-[90px] mx-auto mb-8">
          <circle cx="60" cy="60" r="55" stroke="#C79C53" strokeWidth="0.5" strokeDasharray="4 4" className="spin-slow" />
          <circle cx="60" cy="60" r="44" stroke="#C79C53" strokeWidth="0.5" opacity="0.4" />
          <circle cx="60" cy="60" r="33" stroke="#C79C53" strokeWidth="0.5" opacity="0.2" />
          <path d="M42 36 L60 78 L78 36" stroke="#C79C53" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {CREST_DOTS.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r="1.5" fill="#C79C53" opacity="0.6" />
          ))}
        </svg>

        <motion.p
          className="inline-block text-xs tracking-widest2 text-gold/80 uppercase font-body mb-6 pb-2 border-b border-gold/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Lifestyle Tea
        </motion.p>

        <motion.h1
          className="font-display gold-text-glow text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-cream leading-[1.05] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          An upgrade,<br />
          <span className="text-gold italic">not a habit.</span>
        </motion.h1>

        <motion.p
          className="font-body text-cream/55 text-sm md:text-base leading-[1.8] max-w-lg mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Every upgrade in life feels the same — better fit, better feel, better you. Your ride. Your wardrobe. Your coffee order. Vallivo brings that same upgrade to your cup. Not health tea. Not another wellness fad. Just the upgrade of you — reflected in what you drink.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a href="#product"
            className="px-8 py-3.5 bg-gold text-navy font-body text-xs tracking-widest uppercase hover:bg-gold-light transition-colors duration-300 font-medium">
            Shop the Upgrade →
          </a>
          <a href="#experience"
            className="px-8 py-3.5 border border-cream/30 text-cream font-body text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-300">
            Find Your Ritual
          </a>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" className="w-3 h-3 fill-gold">
                <path d="M10 1.5l2.59 5.62 6.18.6-4.67 4.21 1.34 6.07L10 14.9l-5.44 3.1 1.34-6.07-4.67-4.21 6.18-.6L10 1.5z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-cream/50 font-body tracking-wide">4.9/5 &middot; loved by 1,200+ ritual seekers</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <TrustBar className="mt-10 max-w-md mx-auto" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
      >
        <span className="text-[9px] tracking-widest text-gold/40 uppercase font-body">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-gold/40 to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
