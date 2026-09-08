import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/order'

export default function CartPage() {
  const { items, updateQty, removeFromCart, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-brand-600"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Your Cart</h1>

      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex items-center gap-4 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-20 w-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">{product.name}</p>
              <p className="text-sm text-slate-500">{formatCurrency(product.price)} each</p>
            </div>

            <div className="flex items-center rounded-lg border border-slate-300">
              <button
                onClick={() => updateQty(product.id, qty - 1)}
                className="px-2 py-1 text-slate-600 hover:text-slate-900"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => updateQty(product.id, qty + 1)}
                className="px-2 py-1 text-slate-600 hover:text-slate-900"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <p className="w-24 text-right font-semibold text-slate-900">
              {formatCurrency(product.price * qty)}
            </p>

            <button
              onClick={() => removeFromCart(product.id)}
              className="text-slate-400 hover:text-red-500"
              aria-label={`Remove ${product.name}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-end gap-4">
        <div className="text-lg font-bold text-slate-900">
          Subtotal: {formatCurrency(subtotal)}
        </div>
        <p className="text-sm text-slate-500">Shipping is calculated at checkout.</p>
        <Link
          to="/checkout"
          className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white hover:bg-brand-600"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
