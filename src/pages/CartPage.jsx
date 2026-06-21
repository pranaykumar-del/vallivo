import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../lib/CartContext'
import { calcPrice, BAG_STEP } from '../lib/products'
import OrderForm from '../components/OrderForm'

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)

  if (items.length === 0 && !orderPlaced) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-ink px-6 pt-32 pb-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-widest2 text-gold uppercase font-body mb-4">Your Cart</p>
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-6">Your cart is empty</h2>
          <div className="gold-line w-20 mx-auto mb-8" />
          <Link
            to="/#product"
            className="inline-block px-8 py-3.5 bg-gold text-navy font-body text-xs tracking-widest uppercase hover:bg-gold-light transition-colors duration-300 font-medium"
          >
            Explore Collection
          </Link>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="bg-ink pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-widest2 text-gold uppercase font-body mb-4">Your Cart</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">Cart &amp; Checkout</h2>
          <div className="gold-line w-20" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            {items.length > 0 ? (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.slug} className="flex gap-4 border-b border-cream/10 pb-6">
                    <Link to={`/product/${item.slug}`} className="w-24 h-24 bg-navy-dark shrink-0 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link to={`/product/${item.slug}`} className="font-display text-lg text-cream hover:text-gold transition-colors">
                          {item.name}
                        </Link>
                        <div className="text-[10px] tracking-widest text-gold/60 uppercase font-body mt-1">{item.sub}</div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-cream/20">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity - BAG_STEP)}
                            className="w-8 h-8 text-cream hover:text-gold transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-20 text-center text-sm font-body text-cream">{item.quantity} bags</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity + BAG_STEP)}
                            className="w-8 h-8 text-cream hover:text-gold transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-display text-lg text-cream">Rs.{calcPrice(item.pricePer100, item.quantity)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      className="text-cream/30 hover:text-gold transition-colors text-xs self-start font-body"
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4">
                  <span className="font-body text-sm tracking-widest text-cream/60 uppercase">Total</span>
                  <span className="font-display text-2xl text-gold">Rs.{totalPrice}</span>
                </div>
              </div>
            ) : (
              <p className="font-body text-cream/50 text-sm leading-relaxed">
                Thank you — your order has been placed successfully.
              </p>
            )}
          </div>

          <OrderForm items={items} total={totalPrice} onSuccess={() => setOrderPlaced(true)} />
        </div>
      </div>
    </section>
  )
}
