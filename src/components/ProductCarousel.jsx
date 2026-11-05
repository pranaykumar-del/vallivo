import { useEffect, useState } from 'react'

function slidesFor(product) {
  return [
    { src: product.img, alt: `${product.name} canister` },
    { src: product.angleImg, alt: `${product.name} from the side` },
    { src: product.pourImg, alt: `${product.name} being poured` },
    { src: '/images/brew-step-1.jpg', alt: 'Adding loose leaf' },
    { src: '/images/brew-step-2.jpg', alt: 'Steeping the tea' },
    { src: '/images/brew-step-3.jpg', alt: 'Pouring the tea' },
  ].filter((slide) => slide.src)
}

export default function ProductCarousel({ product, className = '' }) {
  const slides = slidesFor(product)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
    slides.forEach((slide) => {
      const image = new Image()
      image.src = slide.src
    })
  }, [product.slug])

  const prev = () => setIndex((current) => (current - 1 + slides.length) % slides.length)
  const next = () => setIndex((current) => (current + 1) % slides.length)

  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#f4efe6] ${className}`}>
      {slides.map((slide, slideIndex) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-contain ${slideIndex === index ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
          decoding="async"
          fetchPriority={slideIndex === 0 ? 'high' : 'low'}
        />
      ))}
      <span className="absolute top-4 right-4 text-[9px] tracking-widest px-2.5 py-1 uppercase font-body z-10 bg-white/95 text-forest rounded-md">{product.tag}</span>
      <button type="button" onClick={prev} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-forest/60 hover:text-forest bg-white/90 z-10">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button type="button" onClick={next} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-forest/60 hover:text-forest bg-white/90 z-10">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((slide, slideIndex) => (
          <button key={slide.src} type="button" onClick={() => setIndex(slideIndex)} aria-label={`Photo ${slideIndex + 1}`} className="p-1">
            <span className={`block h-1.5 rounded-full ${slideIndex === index ? 'w-6 bg-forest' : 'w-1.5 bg-forest/30'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
