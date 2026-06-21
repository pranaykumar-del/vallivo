import { createContext, useContext, useEffect, useState } from 'react'
import { calcPrice, DEFAULT_BAGS } from './products'

const CartContext = createContext(null)
const STORAGE_KEY = 'vallivo_cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const items = raw ? JSON.parse(raw) : []
    // Drop items saved by an older cart format (missing pricePer100) to avoid NaN totals.
    return Array.isArray(items) ? items.filter((i) => typeof i.pricePer100 === 'number') : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = DEFAULT_BAGS) => {
    setItems((current) => {
      const existing = current.find((i) => i.slug === product.slug)
      if (existing) {
        return current.map((i) =>
          i.slug === product.slug ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [
        ...current,
        {
          slug: product.slug,
          name: product.name,
          sub: product.sub,
          pricePer100: product.priceValue,
          img: product.img,
          quantity,
        },
      ]
    })
  }

  const removeItem = (slug) => {
    setItems((current) => current.filter((i) => i.slug !== slug))
  }

  const updateQuantity = (slug, quantity) => {
    if (quantity <= 0) {
      removeItem(slug)
      return
    }
    setItems((current) => current.map((i) => (i.slug === slug ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + calcPrice(i.pricePer100, i.quantity), 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
