import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/order'

export default function CartPage() {
  const { items, updateQty, removeFromCart, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-charcoal">Your cart is empty</h1>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-ink hover:bg-gold-deep"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-charcoal">Your Cart</h1>

      <div className="divide-y divide-hairline rounded-xl border border-hairline bg-white">
        {items.map(({ product, qty }) => (
          <div
            key={product.id}
            className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4"
          >
            <div className="flex items-start gap-4 sm:flex-1">
              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-20 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-charcoal">{product.name}</p>
                <p className="text-sm text-muted">{formatCurrency(product.price)} each</p>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="shrink-0 text-muted hover:text-red-500 sm:hidden"
                aria-label={`Remove ${product.name}`}
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 pl-24 sm:pl-0">
              <div className="flex items-center rounded-lg border border-hairline">
                <button
                  onClick={() => updateQty(product.id, qty - 1)}
                  className="px-2 py-1 text-muted hover:text-charcoal"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium text-charcoal">{qty}</span>
                <button
                  onClick={() => updateQty(product.id, qty + 1)}
                  className="px-2 py-1 text-muted hover:text-charcoal"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <p className="text-right font-semibold text-charcoal sm:w-24">
                {formatCurrency(product.price * qty)}
              </p>

              <button
                onClick={() => removeFromCart(product.id)}
                className="hidden text-muted hover:text-red-500 sm:block"
                aria-label={`Remove ${product.name}`}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-end gap-4">
        <div className="text-lg font-bold text-charcoal">
          Subtotal: {formatCurrency(subtotal)}
        </div>
        <p className="text-sm text-muted">Shipping is calculated at checkout.</p>
        <Link
          to="/checkout"
          className="rounded-full bg-gold px-8 py-3 font-semibold text-ink hover:bg-gold-deep"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
