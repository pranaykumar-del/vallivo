import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-cream">
      <div className="absolute inset-0">
        <img
          src="/images/valleys-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-cream/40 to-cream/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.35)_10%,transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pt-24 pb-20">
        <motion.h1
          className="font-display text-forest font-semibold leading-none tracking-[0.12em] mb-6 select-none drop-shadow-[0_2px_24px_rgba(255,255,255,0.55)] text-[clamp(3.25rem,14vw,9.5rem)] tracking-[0.08em] sm:tracking-[0.12em]"
          aria-label="VALLIVO"
          initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.05, ease, delay: 0.08 }}
        >
          VALLIVO
        </motion.h1>

        <motion.div
          className="gold-line w-24 mx-auto mb-6"
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
        />

        <motion.p
          className="font-display text-2xl sm:text-3xl md:text-4xl italic text-forest mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease, delay: 0.55 }}
        >
          Elevate Your Everyday.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.72 }}
        >
          <p className="label-rule font-body text-[11px] tracking-[0.36em] uppercase text-forest/75 font-medium">
            Lifestyle Tea
          </p>
        </motion.div>
      </div>
    </section>
  )
}
