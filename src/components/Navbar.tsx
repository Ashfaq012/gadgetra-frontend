import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { itemCount } = useCart()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap border-b-2 pb-0.5 text-sm font-medium transition-colors ${
      isActive ? 'border-gold text-charcoal' : 'border-transparent text-muted hover:text-charcoal'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link to="/" className="shrink-0">
          <img src="/logo.svg" alt="Gadgetra.lk" className="h-12 w-auto" />
        </Link>

        <nav className="flex items-center gap-5 sm:gap-6">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/shop" className={linkClass}>
            Shop
          </NavLink>
          <NavLink to="/track-order" className={linkClass}>
            Track Order
          </NavLink>
          <Link
            to="/cart"
            className="relative flex items-center gap-1 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-deep"
          >
            Cart
            {itemCount > 0 && (
              <span className="ml-1 rounded-full bg-ink px-2 py-0.5 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
