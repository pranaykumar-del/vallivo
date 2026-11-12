import { useState } from 'react'
import './ProductCarousel.css'

// Positions in the existing photographic botanical sheet (four columns, two rows).
const botanicalPhotos = {
  'Fennel Seeds': [0, 0], Spearmint: [1, 0], 'Lemon Peel': [2, 0],
  'Butterfly Pea': [3, 0], Hibiscus: [0, 1], Rose: [1, 1], Lavender: [3, 1],
}

function IngredientsSlide({ product }) {
  const pictured = product.ingredients.filter((name) => botanicalPhotos[name])
  return (
    <div className="ingredients-slide" style={{ backgroundColor: product.soft }}>
      <p className="carousel-eyebrow">{product.name} · Loose tea</p>
      <h2>Ingredients</h2>
      <div className="botanical-grid">
        {pictured.map((name) => {
          const [column, row] = botanicalPhotos[name]
          return (
            <figure key={name}>
              <div className="botanical-photo" role="img" aria-label={name} style={{ backgroundPosition: `${column * 100 / 3}% ${row * 100}%` }} />
              <figcaption>{name}</figcaption>
            </figure>
          )
        })}
      </div>
      <div className="ingredient-list">
        <p className="carousel-eyebrow">The complete blend</p>
        <p>{product.ingredients.join(' · ')}</p>
      </div>
    </div>
  )
}

function PourSlide({ product }) {
  return <img src={product.pourImg} alt={`${product.name} loose tea being poured from a glass teapot into a cup`} className="carousel-photo" decoding="async" />
}

function BrewSlide({ product }) {
  const steps = [
    ['Add loose tea', `Place a spoon of ${product.name} loose tea in a teapot or reusable infuser.`],
    ['Pour hot water', 'Add water at about 90°C.'],
    ['Let it steep', 'Infuse for 3–4 minutes.'],
    ['Strain & enjoy', 'Remove the infuser or strain into your cup. Sip slowly.'],
  ]
  return (
    <div className="brew-slide" style={{ backgroundColor: product.soft }}>
      <div className="brew-copy">
        <p className="carousel-eyebrow">The {product.name} ritual</p>
        <h2>How to make</h2>
        <p className="brew-subtitle">A little loose tea. A moment for you.</p>
        <ol>
          {steps.map(([title, text], index) => (
            <li key={title}>
              <span className="brew-number">0{index + 1}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </div>
      <img src={product.pourImg} alt={`A freshly poured cup of ${product.name}`} className="brew-photo" decoding="async" />
    </div>
  )
}

export default function ProductCarousel({ product, className = '' }) {
  const slides = [
    { key: 'photo', label: 'Product', node: <img src={product.img} alt={`${product.name} loose tea canister`} className="carousel-photo product-photo" loading="eager" decoding="async" fetchPriority="high" /> },
    { key: 'ingredients', label: 'Ingredients', node: <IngredientsSlide product={product} /> },
    { key: 'pour', label: 'The pour', node: <PourSlide product={product} /> },
    { key: 'brew', label: 'How to make', node: <BrewSlide product={product} /> },
  ]
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((current) => (current - 1 + slides.length) % slides.length)
  const next = () => setIndex((current) => (current + 1) % slides.length)

  return (
    <section className={`product-carousel ${className}`} aria-label={`${product.name} product gallery`} aria-roledescription="carousel" style={{ '--blend-accent': product.accent }} onKeyDown={(event) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); prev() }
      if (event.key === 'ArrowRight') { event.preventDefault(); next() }
    }}>
      <div className="carousel-stage">
        <div className="carousel-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slides[index].label}`}>
          {slides[index].node}
        </div>
        {index === 0 && <span className="carousel-tag">{product.tag}</span>}
        <button type="button" onClick={prev} aria-label="Previous slide" className="carousel-arrow carousel-prev">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" onClick={next} aria-label="Next slide" className="carousel-arrow carousel-next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      <div className="carousel-navigation">
        {slides.map((slide, slideIndex) => (
          <button key={slide.key} type="button" onClick={() => setIndex(slideIndex)} aria-label={`Show ${slide.label.toLowerCase()}`} aria-current={slideIndex === index ? 'true' : undefined}>
            <span className="carousel-dot" />{slide.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{slides[index].label}, slide {index + 1} of {slides.length}</p>
    </section>
  )
}
