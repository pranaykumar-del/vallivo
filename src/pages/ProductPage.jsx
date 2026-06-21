import { useState } from 'react'
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products, getProductBySlug, calcPrice, BAG_STEP, DEFAULT_BAGS } from '../lib/products'
import { useCart } from '../lib/CartContext'

export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(DEFAULT_BAGS)
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
    <section className="bg-ink pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/#product"
          className="text-[10px] tracking-widest text-gold/60 uppercase font-body hover:text-gold transition-colors"
        >
          &larr; Back to Collection
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 mt-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-[420px] lg:h-[560px] bg-navy-dark overflow-hidden"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <span className="absolute top-5 right-5 text-[9px] tracking-widest px-2.5 py-1 bg-gold/90 text-navy uppercase font-body">
              {product.tag}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs tracking-widest2 text-gold uppercase font-body mb-4">{product.sub}</p>
            <h1 className="font-display text-4xl md:text-5xl text-cream mb-4">{product.name}</h1>
            <div className="gold-line w-20 mb-6" />
            <p className="font-body text-cream/60 text-sm leading-relaxed mb-8">{product.longDesc}</p>

            <div className="mb-8">
              <div className="text-[10px] tracking-widest text-cream/40 uppercase font-body mb-3">Ingredients</div>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="text-xs font-body text-cream/70 border border-gold/20 px-3 py-1.5">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="font-display text-3xl text-gold mb-8">
              {product.price} <span className="text-cream/40 text-sm font-body">/ 100 pyramid bags</span>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border border-cream/20">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(BAG_STEP, q - BAG_STEP))}
                  className="w-10 h-10 text-cream hover:text-gold transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-20 text-center text-sm font-body text-cream">{quantity} bags</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + BAG_STEP)}
                  className="w-10 h-10 text-cream hover:text-gold transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="font-display text-xl text-cream">Rs.{calcPrice(product.priceValue, quantity)}</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="px-8 py-3.5 border border-gold text-gold font-body text-xs tracking-widest uppercase hover:bg-gold hover:text-navy transition-colors duration-300 font-medium"
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="px-8 py-3.5 bg-gold text-navy font-body text-xs tracking-widest uppercase hover:bg-gold-light transition-colors duration-300 font-medium"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>

        <div className="mt-28">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest2 text-gold/70 uppercase font-body mb-4">More Rituals</p>
            <h2 className="font-display text-3xl md:text-4xl text-cream">You May Also Like</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {others.map((p) => (
              <Link key={p.slug} to={`/product/${p.slug}`} className="group relative overflow-hidden card-hover block">
                <div className="relative h-56 bg-navy-dark overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <div className="font-display text-base text-white">{p.name}</div>
                    <div className="text-[9px] tracking-widest text-white/60 uppercase font-body mt-1">{p.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
