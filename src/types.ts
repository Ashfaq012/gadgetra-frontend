export interface Product {
  id: string
  name: string
  category: string
  price: number // in LKR
  image: string
  description: string
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
