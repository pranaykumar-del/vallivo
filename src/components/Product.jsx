import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products, DEFAULT_BAGS } from '../lib/products'
import { useCart } from '../lib/CartContext'

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } }),
}

export default function Product() {
  const { addItem } = useCart()
  const [justAdded, setJustAdded] = useState(null)

  const handleAddToCart = (product) => {
    addItem(product, DEFAULT_BAGS)
    setJustAdded(product.slug)
    setTimeout(() => setJustAdded((current) => (current === product.slug ? null : current)), 1500)
  }

  return (
    <section id="product" className="py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-widest2 text-gold uppercase font-body mb-4">The Collection</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">Premium Wellness Teas</h2>
          <div className="gold-line w-20 mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.slug}
              className="card-hover group relative overflow-hidden"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Link to={`/product/${p.slug}`} className="block">
                <div className="relative h-80 overflow-hidden bg-ink">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <span className="absolute top-4 right-4 text-[9px] tracking-widest px-2.5 py-1 bg-gold/90 text-navy uppercase font-body">
                    {p.tag}
                  </span>
                  <div className="absolute bottom-0 left-0 p-5">
                    <div className="font-display text-xl text-white font-medium">{p.name}</div>
                    <div className="text-[10px] tracking-widest text-white/60 uppercase font-body mt-1">{p.sub}</div>
                  </div>
                </div>
              </Link>

              <div className="bg-ink p-6 border border-gold/10 border-t-0">
                <p className="font-body text-sm text-cream/50 leading-relaxed mb-4">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl text-cream">
                    {p.price}<span className="text-cream/40 text-xs font-body"> /100 bags</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(p)}
                    className="text-[10px] tracking-widest text-gold uppercase font-body border-b border-gold/40 hover:border-gold transition-colors"
                  >
                    {justAdded === p.slug ? 'Added' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
