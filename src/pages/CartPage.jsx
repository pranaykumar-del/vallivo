import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../lib/CartContext'
import { calcPrice, UNIT_STEP, UNIT_GRAMS } from '../lib/products'
import OrderForm from '../components/OrderForm'
import MediaImage from '../components/MediaImage'
import TrustBar from '../components/TrustBar'

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)

  if (items.length === 0 && !orderPlaced) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-cream px-6 pt-32 pb-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-widest2 text-gold-dark uppercase font-body mb-4">Your Cart</p>
          <h2 className="font-display text-3xl md:text-4xl text-forest mb-6">Your cart is empty</h2>
          <div className="gold-line w-16 mx-auto mb-8" />
          <Link
            to="/#product"
            className="inline-block px-8 py-3.5 bg-forest text-cream font-body text-xs tracking-widest uppercase hover:bg-forest-soft transition-colors duration-300"
          >
            Explore Collection
          </Link>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="bg-cream pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-widest2 text-gold-dark uppercase font-body mb-4">Your Cart</p>
          <h2 className="font-display text-4xl md:text-5xl text-forest mb-6">Cart &amp; WhatsApp Order</h2>
          <div className="gold-line w-16" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            {items.length > 0 ? (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.slug} className="flex gap-4 border-b border-forest/10 pb-6">
                    <Link to={`/product/${item.slug}`} className="w-24 h-28 bg-cream-dark shrink-0 overflow-hidden">
                      <MediaImage
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link to={`/product/${item.slug}`} className="font-display text-xl text-forest hover:opacity-70 transition-opacity">
                          {item.name}
                        </Link>
                        <div className="text-[10px] tracking-widest text-forest/40 uppercase font-body mt-1">{item.sub}</div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-forest/15">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity - UNIT_STEP)}
                            className="w-8 h-8 text-forest hover:text-gold-dark transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-24 text-center text-sm font-body text-forest">{item.quantity * UNIT_GRAMS}g</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity + UNIT_STEP)}
                            className="w-8 h-8 text-forest hover:text-gold-dark transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-display text-lg text-forest">Rs.{calcPrice(item.pricePer100, item.quantity)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      className="text-forest/30 hover:text-forest transition-colors text-xs self-start font-body"
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4">
                  <span className="font-body text-sm tracking-widest text-forest/45 uppercase">Total</span>
                  <span className="font-display text-2xl text-forest">Rs.{totalPrice}</span>
                </div>
              </div>
            ) : (
              <p className="font-body text-forest/50 text-sm leading-relaxed">
                Thank you — your order has been placed successfully.
              </p>
            )}
          </div>

          <div>
            <OrderForm items={items} total={totalPrice} onSuccess={() => setOrderPlaced(true)} />
            <TrustBar className="mt-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
