import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MediaImage from './MediaImage'

function IngredientsSlide({ product }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-10">
      <p className="text-[10px] tracking-widest2 text-gold/70 uppercase font-body mb-5">What's Inside</p>
      <div className="flex flex-wrap gap-2.5 justify-center max-w-sm">
        {product.ingredients.map((ing) => (
          <span key={ing} className="text-xs font-body text-cream/80 border border-gold/25 px-3.5 py-2">
            {ing}
          </span>
        ))}
      </div>
    </div>
  )
}

function RitualSlide({ product }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-10">
      <p className="text-[10px] tracking-widest2 text-gold/70 uppercase font-body mb-5">The Ritual</p>
      <p className="font-display text-xl text-cream italic leading-relaxed max-w-sm">"{product.desc}"</p>
      <div className="gold-line w-12 mt-6" />
      <p className="text-xs tracking-widest text-gold/60 uppercase font-body mt-6">{product.sub}</p>
    </div>
  )
}

function PackagingSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-10">
      <p className="text-[10px] tracking-widest2 text-gold/70 uppercase font-body mb-5">Packaging</p>
      <div className="font-display text-5xl text-gold mb-3">100</div>
      <p className="font-body text-sm text-cream/60 leading-relaxed max-w-xs">
        Pyramid tea bags, individually wrapped in edible pouches and presented in an elegant keepsake box.
      </p>
    </div>
  )
}

function BrewSlide() {
  const steps = [
    { step: '01', text: 'Heat water to 90°C, just before a full boil.' },
    { step: '02', text: 'Steep one pyramid bag for 3-4 minutes.' },
    { step: '03', text: 'Lift, breathe in, and sip slowly.' },
  ]
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-10">
      <p className="text-[10px] tracking-widest2 text-gold/70 uppercase font-body mb-6">How To Brew</p>
      <div className="space-y-4 max-w-xs">
        {steps.map((s) => (
          <div key={s.step} className="flex items-center gap-4 text-left">
            <span className="text-gold/50 text-xs font-body tracking-widest">{s.step}</span>
            <span className="text-sm text-cream/70 font-body leading-relaxed">{s.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductCarousel({ product, className = '' }) {
  const slides = [
    { key: 'photo', render: () => <MediaImage src={product.img} alt={product.name} className="w-full h-full object-cover" /> },
    { key: 'ingredients', render: () => <IngredientsSlide product={product} /> },
    { key: 'ritual', render: () => <RitualSlide product={product} /> },
    { key: 'packaging', render: () => <PackagingSlide /> },
    { key: 'brew', render: () => <BrewSlide /> },
  ]

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = (next) => {
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  const prev = () => goTo((index - 1 + slides.length) % slides.length)
  const next = () => goTo((index + 1) % slides.length)

  return (
    <div className={`relative h-[420px] lg:h-[560px] bg-navy-dark overflow-hidden group ${className}`}>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={slides[index].key}
          custom={direction}
          initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) next()
            else if (info.offset.x > 60) prev()
          }}
          className="absolute inset-0"
        >
          {slides[index].render()}
        </motion.div>
      </AnimatePresence>

      <span className="absolute top-5 right-5 text-[9px] tracking-widest px-2.5 py-1 bg-gold/90 text-navy uppercase font-body z-10">
        {product.tag}
      </span>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-cream/50 hover:text-gold bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-cream/50 hover:text-gold bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="p-1.5"
          >
            <span className={`block h-1 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-gold' : 'w-1.5 bg-cream/30'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
