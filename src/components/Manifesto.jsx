import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

export default function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-forest text-cream overflow-hidden">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-cream/10 blur-3xl" />

      <motion.p
        className="absolute top-1/2 left-0 whitespace-nowrap font-display text-[18vw] leading-none text-cream/[0.07] pointer-events-none select-none -translate-y-1/2"
        style={{ x }}
      >
        ELEVATE.
      </motion.p>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          className="font-body text-[11px] tracking-[0.4em] uppercase text-gold mb-8 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Mood
        </motion.p>
        <motion.h2
          className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.15] mb-8 text-white font-semibold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Some things you wear.<br />
          Some things you drive.<br />
          <span className="italic text-gold">This one, you sip.</span>
        </motion.h2>
        <motion.div
          className="gold-line w-16 mx-auto mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />
        <motion.p
          className="font-body text-cream/85 text-sm md:text-base leading-[1.9] max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          Vallivo is a lifestyle choice — quiet, considered, and made for the moments that return you to yourself.
        </motion.p>
      </div>
    </section>
  )
}
