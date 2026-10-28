import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products, DEFAULT_QTY } from '../lib/products'
import { useCart } from '../lib/CartContext'
import MediaImage from './MediaImage'

const ease = [0.22, 1, 0.36, 1]

export default function Product() {
  const { addItem } = useCart()
  const [justAdded, setJustAdded] = useState(null)

  const handleAdd = (product) => {
    addItem(product, DEFAULT_QTY)
    setJustAdded(product.slug)
    setTimeout(() => setJustAdded((s) => (s === product.slug ? null : s)), 1400)
  }

  return (
    <section id="product" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-[11px] tracking-[0.32em] uppercase text-fennette font-body mb-4 font-medium">The Collection</p>
          <h2 className="font-display text-4xl md:text-5xl text-forest font-semibold mb-4">Four blends. One ritual.</h2>
          <p className="font-body text-sm md:text-[15px] text-forest/70 max-w-lg mx-auto leading-relaxed">
            Four small upgrades for how you live — Fennette, Serenette, Rosette, Nightfall.
          </p>
          <motion.div
            className="gold-line w-14 mx-auto mt-7 origin-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-14">
          {products.map((p, i) => (
            <motion.article
              key={p.slug}
              className="group"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05, duration: 0.35, ease }}
            >
              <Link to={`/product/${p.slug}`} className="block">
                <motion.div
                  className="relative aspect-[3/4] overflow-hidden mb-5 bg-[#F7F9F5]"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <MediaImage
                    src={p.img}
                    alt={`${p.name} tea canister`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <motion.span
                    className="absolute top-4 left-4 text-[9px] tracking-[0.2em] px-2.5 py-1 uppercase font-body bg-white/90 text-forest"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.1 }}
                  >
                    {p.tag}
                  </motion.span>
                </motion.div>
              </Link>

              <p className="label-rule text-[9px] tracking-[0.28em] uppercase font-body mb-2" style={{ color: p.accent }}>
                Lifestyle Tea
              </p>
              <Link to={`/product/${p.slug}`}>
                <h3 className="font-display text-[1.85rem] tracking-wide leading-none mb-2 group-hover:opacity-80 transition-opacity" style={{ color: p.accent }}>
                  {p.name}
                </h3>
              </Link>
              <p className="font-body text-[10px] tracking-[0.18em] uppercase text-forest/60 mb-3 font-medium">{p.sub}</p>
              <p className="font-body text-sm text-forest/75 leading-relaxed mb-5">{p.desc}</p>

              <div className="flex items-center justify-between pt-4 border-t border-forest/15">
                <span className="font-display text-xl text-forest font-semibold">
                  {p.price}
                  <span className="font-body text-[10px] text-forest/50 ml-1">/ {p.unitLabel}</span>
                </span>
                <motion.button
                  type="button"
                  onClick={() => handleAdd(p)}
                  className="text-[10px] tracking-[0.18em] uppercase font-body border-b pb-0.5"
                  style={{ color: p.accent, borderColor: `${p.accent}55` }}
                  whileTap={{ scale: 0.96 }}
                >
                  {justAdded === p.slug ? 'Added ✓' : 'Add to cart'}
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
