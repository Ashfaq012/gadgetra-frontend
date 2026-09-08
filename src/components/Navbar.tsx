import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { itemCount } = useCart()
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap border-b-2 pb-0.5 text-sm font-medium transition-colors ${
      isActive ? 'border-gold text-charcoal' : 'border-transparent text-muted hover:text-charcoal'
    }`

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-ink text-white' : 'text-muted hover:bg-paper hover:text-charcoal'
    }`

  function closeMenu() {
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="shrink-0" onClick={closeMenu}>
          <img src="/logo.svg" alt="Gadgetra.lk" className="h-10 w-auto sm:h-12" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/shop" className={linkClass}>
            Shop
          </NavLink>
          <NavLink to="/track-order" className={linkClass}>
            Track Order
          </NavLink>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/cart"
            onClick={closeMenu}
            className="relative flex items-center gap-1 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-deep"
          >
            Cart
            {itemCount > 0 && (
              <span className="ml-1 rounded-full bg-ink px-2 py-0.5 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-charcoal transition-colors hover:bg-paper md:hidden"
          >
            <span aria-hidden>{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-hairline bg-paper px-4 py-3 md:hidden">
          <NavLink to="/" className={mobileLinkClass} end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/shop" className={mobileLinkClass} onClick={closeMenu}>
            Shop
          </NavLink>
          <NavLink to="/track-order" className={mobileLinkClass} onClick={closeMenu}>
            Track Order
          </NavLink>
        </nav>
      )}
    </header>
  )
}
