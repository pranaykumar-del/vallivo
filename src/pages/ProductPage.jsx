import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import { products, getProductBySlug, calcPrice, UNIT_STEP, DEFAULT_QTY, UNIT_GRAMS } from '../lib/products'
import { useCart } from '../lib/CartContext'
import MediaImage from '../components/MediaImage'
import TrustBar from '../components/TrustBar'
import ProductCarousel from '../components/ProductCarousel'

const productReviews = [
  { name: 'Aarav S.', city: 'Bengaluru', product: 'Fennette', rating: 5, text: 'Smooth, fragrant and easy every day. The fennel note is beautifully balanced.' },
  { name: 'Kabir V.', city: 'Chennai', product: 'Fennette', rating: 5, text: 'Ordered Fennette twice. Clean taste, no bitterness — exactly the everyday cup I wanted.' },
  { name: 'Nisha B.', city: 'Lucknow', product: 'Fennette', rating: 5, text: 'Light, fresh, and easy to repeat. The canister looks beautiful on the shelf.' },
  { name: 'Rhea D.', city: 'Goa', product: 'Fennette', rating: 4, text: 'Bright and clean. I drink it through the afternoon without it feeling heavy.' },
  { name: 'Vikram J.', city: 'Surat', product: 'Fennette', rating: 5, text: 'The spearmint is gentle, not sharp. This became my default cup in a week.' },
  { name: 'Tara S.', city: 'Indore', product: 'Fennette', rating: 5, text: 'Packaging feels like a gift, and the liquor stays light even after a longer steep.' },
  { name: 'Priya M.', city: 'Mumbai', product: 'Serenette', rating: 5, text: 'Delicate without being bland. A quiet pause that feels considered.' },
  { name: 'Dev P.', city: 'Ahmedabad', product: 'Serenette', rating: 4, text: 'A quieter kind of luxury. Steeps beautifully and looks elegant on the counter.' },
  { name: 'Leela K.', city: 'Mysuru', product: 'Serenette', rating: 5, text: 'Lavender stays soft. I use it when I want the evening to slow down.' },
  { name: 'Arjun N.', city: 'Nagpur', product: 'Serenette', rating: 5, text: 'Clear, floral, and easy to brew. No bitterness at the end of the cup.' },
  { name: 'Sana Q.', city: 'Hyderabad', product: 'Serenette', rating: 4, text: 'Calm and pretty. The colour alone makes the ritual feel special.' },
  { name: 'Sneha T.', city: 'Pune', product: 'Rosette', rating: 4, text: 'Lovely colour, fresh flavour, and no fussy preparation. I would gift this.' },
  { name: 'Ananya R.', city: 'Jaipur', product: 'Rosette', rating: 5, text: 'Bright and floral without being sweet. Packaging alone makes it feel special.' },
  { name: 'Mira H.', city: 'Kolkata', product: 'Rosette', rating: 5, text: 'Hibiscus and rose sit in perfect balance. I keep a tin for guests.' },
  { name: 'Farhan A.', city: 'Bhopal', product: 'Rosette', rating: 5, text: 'Looks as good as it tastes. The cup turns a soft rose and stays fresh.' },
  { name: 'Diya P.', city: 'Chandigarh', product: 'Rosette', rating: 4, text: 'Elegant and light. A nice change from heavier evening teas.' },
  { name: 'Rohan K.', city: 'New Delhi', product: 'Nightfall', rating: 5, text: 'The aroma is wonderful. Even the canister feels considered.' },
  { name: 'Meera L.', city: 'Hyderabad', product: 'Nightfall', rating: 5, text: 'My evening ritual now. Soft, floral, and easy to drink slowly.' },
  { name: 'Ishaan G.', city: 'Kochi', product: 'Nightfall', rating: 5, text: 'Closes the day better than anything else I have tried.' },
  { name: 'Pooja R.', city: 'Coimbatore', product: 'Nightfall', rating: 4, text: 'Gentle lavender, not perfume-like. I steep it after dinner.' },
  { name: 'Neil M.', city: 'Noida', product: 'Nightfall', rating: 5, text: 'Quiet cup, beautiful tin. This is the one I reach for last.' },
]

const PAGE_SIZE = 5

function Stars({ value }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-sm ${star <= value ? 'text-gold' : 'text-forest/15'}`}>★</span>
      ))}
    </div>
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(DEFAULT_QTY)
  const [added, setAdded] = useState(false)
  const [reviewPage, setReviewPage] = useState(0)

  const product = getProductBySlug(slug)
  const reviews = useMemo(
    () => (product ? productReviews.filter((review) => review.product === product.name) : []),
    [product],
  )

  useEffect(() => {
    setReviewPage(0)
  }, [slug])

  if (!product) return <Navigate to="/" replace />

  const others = products.filter((p) => p.slug !== slug)
  const pageCount = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE))
  const safePage = Math.min(reviewPage, pageCount - 1)
  const visibleReviews = reviews.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    navigate('/cart')
  }

  return (
    <section className="bg-cream pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        <Link
          to="/#product"
          className="text-[10px] tracking-widest text-forest/40 uppercase font-body hover:text-forest transition-colors"
        >
          ← Back to Collection
        </Link>

        <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] gap-6 lg:gap-8 mt-5 items-start">
          <ProductCarousel product={product} key={product.slug} />

          <div className="lg:sticky lg:top-24">
            <p className="text-[10px] tracking-widest2 uppercase font-body mb-3" style={{ color: product.accent }}>
              Lifestyle Tea
            </p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wide mb-2" style={{ color: product.accent }}>
              {product.name}
            </h1>
            <p className="font-body text-xs tracking-widest uppercase text-forest/50 mb-5">{product.sub}</p>
            <div className="font-display text-3xl text-forest mb-6">
              {product.price} <span className="text-forest/40 text-sm font-body">/ {product.unitLabel || `${UNIT_GRAMS}g`}</span>
            </div>

            <div className="flex items-center gap-5 mb-6">
              <div className="flex items-center border border-forest/15 rounded-lg">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(UNIT_STEP, q - UNIT_STEP))}
                  className="w-10 h-10 text-forest hover:text-gold-dark transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-20 text-center text-sm font-body text-forest">{quantity * UNIT_GRAMS}g</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + UNIT_STEP)}
                  className="w-10 h-10 text-forest hover:text-gold-dark transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="font-display text-xl text-forest">Rs.{calcPrice(product.priceValue, quantity)}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="min-h-12 px-2 sm:px-7 py-3 border border-forest text-forest font-body text-[11px] sm:text-xs tracking-wide sm:tracking-widest uppercase rounded-lg hover:bg-forest hover:text-cream transition-colors duration-300"
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="min-h-12 px-2 sm:px-7 py-3 bg-forest text-cream font-body text-[11px] sm:text-xs tracking-wide sm:tracking-widest uppercase rounded-lg hover:bg-forest-soft transition-colors duration-300"
              >
                Buy Now
              </button>
            </div>
            <TrustBar className="mt-8" />
          </div>
        </div>

        <div className="mt-12 border-t border-forest/10 pt-10">
          <h2 className="font-display text-3xl text-forest mb-4">Description</h2>
          <p className="font-body text-forest/75 text-[15px] leading-relaxed max-w-3xl">{product.longDesc}</p>
          <div className="mt-6">
            <div className="text-[10px] tracking-widest text-forest/40 uppercase font-body mb-3">Ingredients</div>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="text-xs font-body text-forest/75 border px-3 py-1.5 bg-white rounded-full"
                  style={{ borderColor: `${product.accent}30` }}
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            {product.badges.map((b) => (
              <span key={b} className="text-[10px] tracking-widest uppercase font-body text-forest/55 border border-gold/30 px-3 py-1.5 rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-forest/10 pt-10">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="font-display text-3xl text-forest">Reviews</h2>
            <p className="font-body text-xs text-forest/45">{reviews.length} reviews</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-3">
            {visibleReviews.map((review) => (
              <article key={`${review.name}-${review.city}`} className="bg-white border border-forest/10 rounded-2xl px-4 py-4">
                <Stars value={review.rating} />
                <p className="font-body text-sm text-forest font-medium leading-relaxed mt-3">“{review.text}”</p>
                <div className="mt-4 font-body text-sm text-forest">{review.name}</div>
                <div className="font-body text-[10px] tracking-[0.16em] uppercase text-forest/45">{review.city}</div>
              </article>
            ))}
          </div>
          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setReviewPage((page) => Math.max(0, page - 1))}
                disabled={safePage === 0}
                className="w-9 h-9 rounded-xl border border-forest/15 text-forest/50 disabled:opacity-30"
                aria-label="Previous reviews"
              >
                ‹
              </button>
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setReviewPage(index)}
                  className={`h-1.5 rounded-full ${index === safePage ? 'w-6 bg-forest' : 'w-1.5 bg-forest/25'}`}
                  aria-label={`Reviews page ${index + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() => setReviewPage((page) => Math.min(pageCount - 1, page + 1))}
                disabled={safePage === pageCount - 1}
                className="w-9 h-9 rounded-xl border border-forest/15 text-forest/50 disabled:opacity-30"
                aria-label="Next reviews"
              >
                ›
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 border-t border-forest/10 pt-10">
          <h2 className="font-display text-3xl text-forest mb-4">Contact</h2>
          <p className="font-body text-sm text-forest/70 max-w-xl mb-5">
            Questions about this blend, an order, or a gift? Write to us — we reply on the same day.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 max-w-3xl">
            <a href="mailto:hello@vallivo.in" className="bg-white border border-forest/10 rounded-2xl px-4 py-4 font-body text-sm text-forest hover:border-gold">
              <span className="block text-[10px] tracking-[0.16em] uppercase text-forest/40 mb-1">Email</span>
              hello@vallivo.in
            </a>
            <a href="https://wa.me/916304207706" target="_blank" rel="noreferrer" className="bg-white border border-forest/10 rounded-2xl px-4 py-4 font-body text-sm text-forest hover:border-gold">
              <span className="block text-[10px] tracking-[0.16em] uppercase text-forest/40 mb-1">WhatsApp</span>
              +91 63042 07706
            </a>
            <a href="https://instagram.com/vallivo" target="_blank" rel="noreferrer" className="bg-white border border-forest/10 rounded-2xl px-4 py-4 font-body text-sm text-forest hover:border-gold">
              <span className="block text-[10px] tracking-[0.16em] uppercase text-forest/40 mb-1">Instagram</span>
              @vallivo
            </a>
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-6">
            <p className="text-xs tracking-widest2 text-gold-dark uppercase font-body mb-2">More Blends</p>
            <h2 className="font-display text-3xl text-forest">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((p) => (
              <Link key={p.slug} to={`/product/${p.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden mb-3 rounded-2xl" style={{ backgroundColor: p.soft }}>
                  <MediaImage
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="font-display text-xl sm:text-2xl" style={{ color: p.accent }}>{p.name}</div>
                <div className="text-[10px] tracking-widest text-forest/40 uppercase font-body mt-1">{p.price}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
