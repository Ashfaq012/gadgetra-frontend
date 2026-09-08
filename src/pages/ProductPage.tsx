import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Product } from '../types'
import { fetchProduct } from '../api/client'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/order'

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setNotFound(false)
    fetchProduct(id)
      .then(setProduct)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="mx-auto max-w-6xl px-4 py-16 text-center text-muted">Loading…</div>
  }

  if (notFound || !product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-muted">Product not found.</p>
        <Link to="/shop" className="mt-4 inline-block text-charcoal hover:text-gold-deep hover:underline">
          ← Back to shop
        </Link>
      </div>
    )
  }

  const outOfStock = !product.inStock

  function handleAdd() {
    addToCart(product!, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/shop" className="text-sm text-charcoal hover:text-gold-deep hover:underline">
        ← Back to shop
      </Link>

      <div className="mt-4 grid gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-xl bg-paper">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            {product.category}
          </span>
          <h1 className="mt-1 text-3xl font-bold text-charcoal">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold text-charcoal">{formatCurrency(product.price)}</p>
          {outOfStock ? (
            <p className="mt-2 inline-block rounded-full bg-paper px-3 py-1 text-sm font-semibold text-muted">
              Out of Stock
            </p>
          ) : product.stockQty <= 5 ? (
            <p className="mt-2 text-sm text-gold-deep">Only {product.stockQty} left in stock</p>
          ) : null}
          <p className="mt-4 text-muted">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-hairline">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg text-muted hover:text-charcoal"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center font-medium text-charcoal">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stockQty, q + 1))}
                className="px-3 py-2 text-lg text-muted hover:text-charcoal"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={outOfStock}
              className="flex-1 rounded-lg bg-gold px-6 py-3 font-semibold text-ink transition-colors hover:bg-gold-deep disabled:cursor-not-allowed disabled:bg-hairline disabled:text-muted"
            >
              {outOfStock ? 'Out of Stock' : added ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
