import { useEffect, useState } from 'react'
import type { Product } from '../types'
import { fetchProducts } from '../api/client'

interface UseProductsResult {
  products: Product[]
  loading: boolean
  error: string | null
}

/** Fetches the live catalog from the backend, optionally filtered by category. */
export function useProducts(categoryId?: string): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchProducts(categoryId)
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
  }, [categoryId])

  return { products, loading, error }
}
