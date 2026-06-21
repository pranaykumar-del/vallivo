import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import AmbientSound from './components/AmbientSound'
import ScrollToHash from './components/ScrollToHash'
import { CartProvider } from './lib/CartContext'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <CartProvider>
      <div className="grain">
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
        <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <Navbar />
          <ScrollToHash />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <AmbientSound />
        </div>
      </div>
    </CartProvider>
  )
}
