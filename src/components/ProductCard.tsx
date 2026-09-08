import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { formatCurrency } from '../utils/order'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const outOfStock = !product.inStock

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-hairline bg-white transition-shadow hover:shadow-md">
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-paper">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform group-hover:scale-105 ${
            outOfStock ? 'grayscale' : ''
          }`}
          loading="lazy"
        />
        {outOfStock && (
          <span className="absolute right-2 top-2 rounded-full bg-ink/80 px-2 py-1 text-xs font-semibold text-white">
            Out of Stock
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="font-semibold text-charcoal hover:underline">
          {product.name}
        </Link>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <span className="font-bold text-charcoal">{formatCurrency(product.price)}</span>
          <button
            onClick={() => addToCart(product)}
            disabled={outOfStock}
            className="rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-gold-deep disabled:cursor-not-allowed disabled:bg-hairline disabled:text-muted"
          >
            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
