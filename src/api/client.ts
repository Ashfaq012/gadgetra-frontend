import type { CustomerDetails, Product } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  // Fails loudly in dev rather than silently hitting a relative path that
  // won't exist. In production, set VITE_API_BASE_URL to the deployed
  // backend's URL (see server/README or the root README's backend section).
  console.warn('VITE_API_BASE_URL is not set — API calls will fail.')
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request to ${path} failed with ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export function fetchProducts(): Promise<Product[]> {
  return request<Product[]>('/api/products')
}

export function fetchProduct(id: string): Promise<Product> {
  return request<Product>(`/api/products/${id}`)
}

export function fetchShippingInfo(): Promise<{ districts: string[]; freeShippingThreshold: number }> {
  return request('/api/shipping-info')
}

export interface CheckoutResult {
  orderRef: string
  subtotal: number
  shipping: number
  total: number
  whatsappLink: string
}

export function submitCheckout(
  items: { productId: string; qty: number }[],
  customer: CustomerDetails
): Promise<CheckoutResult> {
  return request<CheckoutResult>('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ items, customer }),
  })
}
