import { useState } from 'react'

function IngredientsSlide({ product }) {
  return (
    <div className="relative flex flex-col items-center justify-center text-center h-full px-5 overflow-hidden" style={{ backgroundColor: product.soft }}>
      <p className="text-[10px] tracking-widest2 text-forest/45 uppercase font-body mb-6">Botanicals inside</p>
      <div className="flex flex-wrap gap-2 justify-center max-w-md">
        {product.ingredients.map((ingredient) => (
          <span key={ingredient} className="text-xs font-body text-forest/75 border border-forest/10 bg-white/80 px-3 py-1.5 rounded-full">
            {ingredient}
          </span>
        ))}
      </div>
    </div>
  )
}

function RitualSlide({ product }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-8" style={{ backgroundColor: product.soft }}>
      <p className="text-[10px] tracking-widest2 text-forest/45 uppercase font-body mb-5">The Ritual</p>
      <p className="font-body text-base text-forest font-medium leading-relaxed max-w-sm">“{product.desc}”</p>
      <div className="gold-line w-12 mt-6" />
      <p className="text-xs tracking-widest uppercase font-body mt-6" style={{ color: product.accent }}>{product.sub}</p>
    </div>
  )
}

function PackagingSlide({ product }) {
  return (
    <div className="relative h-full flex items-center justify-center" style={{ backgroundColor: product.soft }}>
      <img
        src={product.angleImg || product.img}
        alt={`${product.name} packaging`}
        className="max-w-full max-h-full w-full h-full object-contain"
        decoding="async"
      />
    </div>
  )
}

function PourSlide({ product }) {
  return (
    <div className="relative h-full bg-cream-dark">
      <img
        src={product.pourImg}
        alt={`${product.name} tea being poured`}
        className="w-full h-full object-contain"
        decoding="async"
      />
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
    <div className="flex flex-col items-center justify-center text-center h-full px-8" style={{ backgroundColor: product.soft }}>
      <p className="text-[10px] tracking-widest2 text-forest/45 uppercase font-body mb-6">How To Brew</p>
      <div className="space-y-4 max-w-xs">
        {steps.map((item) => (
          <div key={item.step} className="flex items-center gap-4 text-left">
            <span className="text-xs font-body tracking-widest" style={{ color: product.accent }}>{item.step}</span>
            <span className="text-sm text-forest/70 font-body leading-relaxed">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductCarousel({ product, className = '' }) {
  const slides = [
    { key: 'photo', node: (
      <img
        src={product.img}
        alt={product.name}
        className="max-w-full max-h-full w-full h-full object-contain"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    ) },
    { key: 'ingredients', node: <IngredientsSlide product={product} /> },
    { key: 'pour', node: <PourSlide product={product} /> },
    { key: 'packaging', node: <PackagingSlide product={product} /> },
    { key: 'ritual', node: <RitualSlide product={product} /> },
    { key: 'brew', node: <BrewSlide product={product} /> },
  ]
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((current) => (current - 1 + slides.length) % slides.length)
  const next = () => setIndex((current) => (current + 1) % slides.length)

  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#f4efe6] ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center p-2">
        {slides[index].node}
      </div>
      <span className="absolute top-4 right-4 text-[9px] tracking-widest px-2.5 py-1 uppercase font-body z-10 bg-white/95 text-forest rounded-md">{product.tag}</span>
      <button type="button" onClick={prev} aria-label="Previous slide" className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-forest/60 hover:text-forest bg-white/90 z-10">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button type="button" onClick={next} aria-label="Next slide" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-forest/60 hover:text-forest bg-white/90 z-10">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((slide, slideIndex) => (
          <button key={slide.key} type="button" onClick={() => setIndex(slideIndex)} aria-label={`Go to slide ${slideIndex + 1}`} className="p-1">
            <span className={`block h-1.5 rounded-full ${slideIndex === index ? 'w-6 bg-forest' : 'w-1.5 bg-forest/30'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
