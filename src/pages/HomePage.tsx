import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const { products, loading } = useProducts()
  const featured = products.slice(0, 4)

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Gear up your phone,{' '}
            <span className="text-brand-100">the smart way.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-brand-50">
            Cases, chargers, cables, earbuds and more — quality mobile accessories
            delivered island-wide across Sri Lanka.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-brand-700 transition-transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
          <Link to="/shop" className="text-sm font-medium text-brand-600 hover:underline">
            View all →
          </Link>
        </div>
        {loading ? (
          <p className="text-slate-500">Loading products…</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
