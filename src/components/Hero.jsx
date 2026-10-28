import { motion } from 'framer-motion'

const letters = 'VALLIVO'.split('')
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
        <h1
          className="font-display text-forest font-semibold leading-none tracking-[0.12em] mb-6 select-none drop-shadow-[0_2px_24px_rgba(255,255,255,0.55)]"
          aria-label="VALLIVO"
        >
          <span className="inline-flex justify-center flex-wrap text-[clamp(3.25rem,14vw,9.5rem)] tracking-[0.08em] sm:tracking-[0.12em]">
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        <div className="gold-line w-24 mx-auto mb-6" />

        <p className="font-display text-2xl sm:text-3xl md:text-4xl italic text-forest mb-6">
          Elevate Your Everyday.
        </p>

        <div className="flex justify-center">
          <p className="label-rule font-body text-[11px] tracking-[0.36em] uppercase text-forest/75 font-medium">
            Lifestyle Tea
          </p>
        </div>
      </div>
    </section>
  )
}
