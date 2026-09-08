export interface Category {
  id: string
  name: string
  sortOrder: number
  productCount?: number
}

export interface Product {
  id: string
  name: string
  categoryId: string
  category: string // display name, joined server-side
  price: number // in LKR
  image: string
  description: string
  stockQty: number
  inStock: boolean
}

export interface CartItem {
  product: Product
  qty: number
}

export interface CustomerDetails {
  name: string
  phone: string
  address: string
  district: string
  notes: string
}

export interface DiscountValidation {
  valid: boolean
  code?: string
  discountAmount?: number
  reason?: string
}

export interface TrackedOrder {
  orderRef: string
  customerName: string
  phone: string
  address: string
  district: string
  notes: string | null
  subtotal: number
  discountCode: string | null
  discountAmount: number
  shipping: number
  total: number
  status: string
  createdAt: string
  items: { productId: string; name: string; qty: number; price: number }[]
}
