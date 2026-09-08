import { Link } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories'

export default function CategorySidebar({ activeCategoryId }: { activeCategoryId?: string }) {
  const { categories } = useCategories()
  const totalCount = categories.reduce((sum, c) => sum + (c.productCount ?? 0), 0)

  const linkClass = (isActive: boolean) =>
    `flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors lg:justify-between ${
      isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
    }`

  return (
    <nav className="flex flex-row gap-2 overflow-x-auto pb-2 lg:w-56 lg:shrink-0 lg:flex-col lg:overflow-visible lg:pb-0">
      <Link to="/shop" className={linkClass(!activeCategoryId)}>
        <span>All</span>
        <span className="text-xs opacity-70">{totalCount}</span>
      </Link>
      {categories.map((cat) => (
        <Link key={cat.id} to={`/shop/${cat.id}`} className={linkClass(activeCategoryId === cat.id)}>
          <span>{cat.name}</span>
          <span className="text-xs opacity-70">{cat.productCount ?? 0}</span>
        </Link>
      ))}
    </nav>
  )
}
