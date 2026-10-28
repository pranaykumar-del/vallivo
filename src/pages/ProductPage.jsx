import { useState } from 'react'
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products, getProductBySlug, calcPrice, UNIT_STEP, DEFAULT_QTY, UNIT_GRAMS } from '../lib/products'
import { useCart } from '../lib/CartContext'
import MediaImage from '../components/MediaImage'
import TrustBar from '../components/TrustBar'
import ProductCarousel from '../components/ProductCarousel'

export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(DEFAULT_QTY)
  const [added, setAdded] = useState(false)

  const product = getProductBySlug(slug)
  if (!product) return <Navigate to="/" replace />

  const others = products.filter((p) => p.slug !== slug)

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
    <section className="bg-cream pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/#product"
          className="text-[10px] tracking-widest text-forest/40 uppercase font-body hover:text-forest transition-colors"
        >
          ← Back to Collection
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 mt-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductCarousel product={product} key={product.slug} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="rule-line text-[10px] tracking-widest2 uppercase font-body mb-4 max-w-[10rem]" style={{ color: product.accent }}>
              Lifestyle Tea
            </p>
            <h1 className="font-display text-5xl md:text-6xl tracking-wide mb-2" style={{ color: product.accent }}>
              {product.name}
            </h1>
            <p className="font-body text-xs tracking-widest uppercase text-forest/45 mb-6">{product.sub}</p>
            <div className="gold-line w-16 mb-6" />
            <p className="font-body text-forest/60 text-sm leading-relaxed mb-8">{product.longDesc}</p>

            <div className="mb-8">
              <div className="text-[10px] tracking-widest text-forest/35 uppercase font-body mb-3">Ingredients</div>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs font-body text-forest/70 border px-3 py-1.5 bg-cream-soft"
                    style={{ borderColor: `${product.accent}30` }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              {product.badges.map((b) => (
                <span key={b} className="text-[10px] tracking-widest uppercase font-body text-forest/45 border border-gold/30 px-3 py-1.5">
                  {b}
                </span>
              ))}
            </div>

            <div className="font-display text-3xl text-forest mb-8">
              {product.price} <span className="text-forest/35 text-sm font-body">/ {product.unitLabel || `${UNIT_GRAMS}g`}</span>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border border-forest/15">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(UNIT_STEP, q - UNIT_STEP))}
                  className="w-10 h-10 text-forest hover:text-gold-dark transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-24 text-center text-sm font-body text-forest">{quantity * UNIT_GRAMS}g</span>
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

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="px-8 py-3.5 border border-forest text-forest font-body text-xs tracking-widest uppercase hover:bg-forest hover:text-cream transition-colors duration-300"
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="px-8 py-3.5 bg-forest text-cream font-body text-xs tracking-widest uppercase hover:bg-forest-soft transition-colors duration-300"
              >
                Buy Now
              </button>
            </div>

            <TrustBar className="mt-10" />
          </motion.div>
        </div>

        <div className="mt-28">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest2 text-gold-dark uppercase font-body mb-4">More Blends</p>
            <h2 className="font-display text-3xl md:text-4xl text-forest">You May Also Like</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {others.map((p) => (
              <Link key={p.slug} to={`/product/${p.slug}`} className="group block product-lift">
                <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ backgroundColor: p.soft }}>
                  <MediaImage
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="font-display text-2xl" style={{ color: p.accent }}>{p.name}</div>
                <div className="text-[10px] tracking-widest text-forest/40 uppercase font-body mt-1">{p.price}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
