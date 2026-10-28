import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToHash from './components/ScrollToHash'
import { CartProvider } from './lib/CartContext'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ReviewsPage from './pages/ReviewsPage'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <ScrollToHash />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </CartProvider>
  )
}
