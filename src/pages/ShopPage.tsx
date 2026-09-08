import { useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import CategorySidebar from '../components/CategorySidebar'

export default function ShopPage() {
  const { categoryId } = useParams()
  const { products, loading, error } = useProducts(categoryId)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Shop All Accessories</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <CategorySidebar activeCategoryId={categoryId} />

        <div className="flex-1">
          {loading && <p className="text-slate-500">Loading products…</p>}
          {error && <p className="text-red-600">Couldn't load products: {error}</p>}
          {!loading && !error && products.length === 0 && (
            <p className="text-slate-500">No products in this category yet.</p>
          )}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
