import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const { products, loading } = useProducts()
  const featured = products.slice(0, 4)

  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-white">
        <img
          src="/mark-white.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 h-[130%] w-auto -translate-y-1/2 opacity-[0.06]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Everyday tech, <span className="text-gold">delivered island-wide.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Cases, chargers, cables, earbuds and more — quality mobile accessories,
            ordered in minutes and confirmed over WhatsApp.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink transition-transform hover:scale-105 hover:bg-gold-deep"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-charcoal">Featured Products</h2>
          <Link to="/shop" className="text-sm font-medium text-charcoal hover:text-gold-deep">
            View all →
          </Link>
        </div>
        {loading ? (
          <p className="text-muted">Loading products…</p>
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
