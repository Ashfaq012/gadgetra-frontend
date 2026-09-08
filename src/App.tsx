import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderPlacedPage from './pages/OrderPlacedPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import ComingSoonPage from './pages/ComingSoonPage'

// Set VITE_COMING_SOON=true (in .env / Vercel project settings) to show a
// simple holding page at every route instead of the store. Flip it back to
// false (or remove it) and redeploy to bring the real site back — no other
// code changes needed.
const COMING_SOON = import.meta.env.VITE_COMING_SOON === 'true'

export default function App() {
  if (COMING_SOON) {
    return <ComingSoonPage />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:categoryId" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-placed" element={<OrderPlacedPage />} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
