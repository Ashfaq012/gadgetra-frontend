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
    return <div className="mx-auto max-w-6xl px-4 py-16 text-center text-slate-500">Loading…</div>
  }

  if (notFound || !product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-slate-600">Product not found.</p>
        <Link to="/shop" className="mt-4 inline-block text-brand-600 hover:underline">
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
      <Link to="/shop" className="text-sm text-brand-600 hover:underline">
        ← Back to shop
      </Link>

      <div className="mt-4 grid gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-xl bg-slate-100">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-brand-600">
            {product.category}
          </span>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold text-slate-900">{formatCurrency(product.price)}</p>
          {outOfStock ? (
            <p className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-500">
              Out of Stock
            </p>
          ) : product.stockQty <= 5 ? (
            <p className="mt-2 text-sm text-amber-600">Only {product.stockQty} left in stock</p>
          ) : null}
          <p className="mt-4 text-slate-600">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-slate-300">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg text-slate-600 hover:text-slate-900"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stockQty, q + 1))}
                className="px-3 py-2 text-lg text-slate-600 hover:text-slate-900"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={outOfStock}
              className="flex-1 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {outOfStock ? 'Out of Stock' : added ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
