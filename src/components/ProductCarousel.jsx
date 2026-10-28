import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MediaImage from './MediaImage'

const ingredientSprites = {
  'Fennel Seeds': [0, 0], 'Spearmint': [1, 0], 'Lemon Peel': [2, 0], 'Butterfly Pea': [3, 0],
  Hibiscus: [0, 1], Rose: [1, 1], Chamomile: [2, 1], Lavender: [3, 1],
  'Assam Tea': [1, 0], 'Assam Green Tea': [1, 0], Tulsi: [1, 0], Rosemary: [3, 1],
  Ashwagandha: [0, 0], Apple: [2, 0], Lemongrass: [2, 0],
}

function IngredientCutout({ name, index }) {
  const [column, row] = ingredientSprites[name] || [index % 4, index % 2]
  return (
    <motion.div className="flex flex-col items-center gap-2 w-[30%] min-w-[76px]" initial={{ opacity: 0, y: -90, rotate: index % 2 ? 9 : -9 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.08 + index * 0.09, type: 'spring', stiffness: 72, damping: 13 }}>
      <motion.div
        className="w-16 h-16 sm:w-20 sm:h-20 bg-no-repeat"
        style={{ backgroundImage: 'url(/images/ingredient-sprite.png)', backgroundSize: '400% 200%', backgroundPosition: `${column * 33.333}% ${row * 100}%`, filter: 'drop-shadow(0 10px 9px rgba(31, 51, 40, .12))' }}
        animate={{ y: [0, 6, 0], rotate: [0, index % 2 ? 2.5 : -2.5, 0] }}
        transition={{ duration: 4.5 + index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="text-[9px] sm:text-[10px] tracking-[0.11em] uppercase font-body text-forest/55">{name}</span>
    </motion.div>
  )
}

function IngredientsSlide({ product }) {
  return (
    <div className="relative flex flex-col items-center justify-center text-center h-full px-5 overflow-hidden" style={{ backgroundColor: product.soft }}>
      <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.8),transparent_65%)]" />
      <p className="relative text-[10px] tracking-widest2 text-forest/45 uppercase font-body mb-7">Botanicals inside</p>
      <div className="relative flex flex-wrap gap-x-2 gap-y-5 justify-center w-full max-w-md">
        {product.ingredients.slice(0, 6).map((ingredient, index) => <IngredientCutout key={ingredient} name={ingredient} index={index} />)}
      </div>
      {product.ingredients.length > 6 && <p className="relative mt-5 font-display italic text-sm text-forest/45">and {product.ingredients.length - 6} more considered botanicals</p>}
    </div>
  )
}

function RitualSlide({ product }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-10" style={{ backgroundColor: product.soft }}>
      <p className="text-[10px] tracking-widest2 text-forest/45 uppercase font-body mb-5">The Ritual</p>
      <p className="font-display text-xl text-forest italic leading-relaxed max-w-sm">“{product.desc}”</p>
      <div className="gold-line w-12 mt-6" />
      <p className="text-xs tracking-widest uppercase font-body mt-6" style={{ color: product.accent }}>{product.sub}</p>
    </div>
  )
}

function PackagingSlide({ product }) {
  return (
    <div className="relative h-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: product.soft, perspective: '1100px' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_38%,rgba(255,255,255,.95),transparent_45%)]" />
      <motion.div className="absolute left-[10%] top-[18%] w-[48%] h-[66%] overflow-hidden shadow-[0_25px_55px_rgba(31,51,40,.16)]" initial={{ rotate: -13, x: -32, opacity: 0 }} animate={{ rotate: -8, x: 0, opacity: 0.42 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
        <img src={product.img} alt="" className="w-full h-full object-cover" />
      </motion.div>
      <motion.div className="absolute right-[10%] top-[11%] w-[56%] h-[73%] overflow-hidden shadow-[0_30px_70px_rgba(31,51,40,.24)] border border-white/50" initial={{ rotateY: -24, rotateZ: 7, x: 45, opacity: 0 }} animate={{ rotateY: -10, rotateZ: 3, x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} style={{ transformStyle: 'preserve-3d' }}>
        <img src={product.angleImg || product.img} alt={`${product.name} packaging from an angled view`} className="w-full h-full object-cover" />
        <div className="absolute inset-y-0 right-0 w-5 bg-gradient-to-l from-black/15 to-transparent" />
      </motion.div>
      <div className="absolute left-6 bottom-7 text-left z-10">
        <p className="text-[9px] tracking-[0.24em] uppercase font-body text-forest/40 mb-1">Packaging study</p>
        <p className="font-display text-xl text-forest">Designed from every angle.</p>
      </div>
    </div>
  )
}

function PourSlide({ product }) {
  return (
    <div className="relative h-full overflow-hidden bg-cream-dark">
      <motion.img src={product.pourImg} alt={`${product.name} tea being poured from a clear glass pot into a clear glass cup`} className="w-full h-full object-cover" initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-forest/55 to-transparent" />
      <div className="absolute left-6 bottom-7 text-cream z-10">
        <p className="text-[9px] tracking-[0.24em] uppercase font-body text-cream/65 mb-1">The pour</p>
        <p className="font-display text-xl">Colour, clarity, ritual.</p>
      </div>
    </div>
  )
}

function BrewSlide({ product }) {
  const steps = [
    { step: '01', text: 'Add a spoon of loose leaf to your pot or infuser.' },
    { step: '02', text: 'Pour water at about 90°C and steep 3–4 minutes.' },
    { step: '03', text: 'Pour, breathe in, and sip slowly.' },
  ]
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-10" style={{ backgroundColor: product.soft }}>
      <p className="text-[10px] tracking-widest2 text-forest/45 uppercase font-body mb-6">How To Brew</p>
      <div className="space-y-4 max-w-xs">
        {steps.map((item) => (
          <div key={item.step} className="flex items-center gap-4 text-left">
            <span className="text-xs font-body tracking-widest" style={{ color: product.accent }}>{item.step}</span>
            <span className="text-sm text-forest/65 font-body leading-relaxed">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductCarousel({ product, className = '' }) {
  const slides = [
    { key: 'photo', render: () => <MediaImage src={product.img} alt={product.name} className="w-full h-full object-cover object-center" /> },
    { key: 'ingredients', render: () => <IngredientsSlide product={product} /> },
    { key: 'pour', render: () => <PourSlide product={product} /> },
    { key: 'packaging', render: () => <PackagingSlide product={product} /> },
    { key: 'ritual', render: () => <RitualSlide product={product} /> },
    { key: 'brew', render: () => <BrewSlide product={product} /> },
  ]
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const goTo = (nextIndex) => { setDirection(nextIndex > index ? 1 : -1); setIndex(nextIndex) }
  const prev = () => goTo((index - 1 + slides.length) % slides.length)
  const next = () => goTo((index + 1) % slides.length)

  return (
    <div className={`relative h-[420px] lg:h-[560px] overflow-hidden group bg-cream-dark ${className}`}>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div key={slides[index].key} custom={direction} initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }} transition={{ duration: 0.4, ease: 'easeOut' }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={(_, info) => { if (info.offset.x < -60) next(); else if (info.offset.x > 60) prev() }} className="absolute inset-0">
          {slides[index].render()}
        </motion.div>
      </AnimatePresence>
      <span className="absolute top-5 right-5 text-[9px] tracking-widest px-2.5 py-1 uppercase font-body z-10 bg-cream-soft/95 text-forest">{product.tag}</span>
      <button type="button" onClick={prev} aria-label="Previous slide" className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-forest/50 hover:text-forest bg-cream-soft/80 opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button type="button" onClick={next} aria-label="Next slide" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-forest/50 hover:text-forest bg-cream-soft/80 opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((slide, slideIndex) => <button key={slide.key} type="button" onClick={() => goTo(slideIndex)} aria-label={`Go to slide ${slideIndex + 1}`} className="p-1.5"><span className={`block h-1 rounded-full transition-all duration-300 ${slideIndex === index ? 'w-6 bg-gold' : 'w-1.5 bg-forest/25'}`} /></button>)}
      </div>
    </div>
  )
}
