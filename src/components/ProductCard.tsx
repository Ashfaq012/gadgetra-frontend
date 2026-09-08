import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { formatCurrency } from '../utils/order'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <Link to={`/product/${product.id}`} className="aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-brand-600">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="font-semibold text-slate-900 hover:underline">
          {product.name}
        </Link>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <span className="font-bold text-slate-900">{formatCurrency(product.price)}</span>
          <button
            onClick={() => addToCart(product)}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
