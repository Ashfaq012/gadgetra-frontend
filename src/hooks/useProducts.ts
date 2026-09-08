import { useEffect, useState } from 'react'
import type { Product } from '../types'
import { fetchProducts } from '../api/client'

interface UseProductsResult {
  products: Product[]
  categories: string[]
  loading: boolean
  error: string | null
}

/** Fetches the live catalog from the backend once on mount. */
export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchProducts()
      .then((data) => {
        if (!cancelled) setProducts(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load products')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const categories = Array.from(new Set(products.map((p) => p.category)))

  return { products, categories, loading, error }
}
