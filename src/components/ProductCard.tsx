import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { formatCurrency } from '../utils/order'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const outOfStock = !product.inStock

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform group-hover:scale-105 ${
            outOfStock ? 'grayscale' : ''
          }`}
          loading="lazy"
        />
        {outOfStock && (
          <span className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2 py-1 text-xs font-semibold text-white">
            Out of Stock
          </span>
        )}
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
            disabled={outOfStock}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
