import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../lib/CartContext'
import { calcPrice, UNIT_STEP, UNIT_GRAMS } from '../lib/products'
import OrderForm from '../components/OrderForm'
import MediaImage from '../components/MediaImage'
import TrustBar from '../components/TrustBar'

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()
  if (items.length === 0) {
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
    <section className="bg-cream pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-widest2 text-gold-dark uppercase font-body mb-4">Your Cart</p>
          <h2 className="font-display text-4xl md:text-5xl text-forest mb-6">Cart &amp; Checkout</h2>
          <div className="gold-line w-16" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.slug} className="grid grid-cols-[5.5rem_minmax(0,1fr)] sm:grid-cols-[6rem_minmax(0,1fr)_auto] gap-x-4 gap-y-3 border-b border-forest/10 pb-6">
                    <Link to={`/product/${item.slug}`} className="w-[5.5rem] h-28 sm:w-24 bg-cream-dark overflow-hidden row-span-2 sm:row-span-1">
                      <MediaImage
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </Link>
                    <div className="min-w-0 flex flex-col justify-between">
                      <div>
                        <Link to={`/product/${item.slug}`} className="font-display text-xl text-forest hover:opacity-70 transition-opacity">
                          {item.name}
                        </Link>
                        <div className="text-[10px] tracking-widest text-forest/40 uppercase font-body mt-1">{item.sub}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <div className="flex items-center border border-forest/15">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity - UNIT_STEP)}
                            className="w-10 h-10 text-forest hover:text-gold-dark transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-16 sm:w-20 text-center text-sm font-body text-forest">{item.quantity * UNIT_GRAMS}g</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, item.quantity + UNIT_STEP)}
                            className="w-10 h-10 text-forest hover:text-gold-dark transition-colors"
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
                      className="text-forest/60 hover:text-forest transition-colors text-xs self-start justify-self-start font-body sm:col-start-3 sm:row-start-1"
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
          </div>

          <div>
            <OrderForm items={items} total={totalPrice} />
            <TrustBar className="mt-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
