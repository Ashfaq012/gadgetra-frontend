import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories'

export default function CategorySidebar({ activeCategoryId }: { activeCategoryId?: string }) {
  const { categories } = useCategories()
  const [open, setOpen] = useState(false)
  const totalCount = categories.reduce((sum, c) => sum + (c.productCount ?? 0), 0)

  const linkClass = (isActive: boolean) =>
    `flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
    }`

  function close() {
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mb-6 flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
      >
        <span aria-hidden>☰</span>
        Categories
      </button>

      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer panel — fixed to the viewport, slides in from the left */}
      <nav
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80vw] flex-col gap-1 overflow-y-auto bg-white p-5 shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Categories</h2>
          <button
            onClick={close}
            aria-label="Close categories"
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <Link to="/shop" onClick={close} className={linkClass(!activeCategoryId)}>
          <span>All</span>
          <span className="text-xs opacity-70">{totalCount}</span>
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop/${cat.id}`}
            onClick={close}
            className={linkClass(activeCategoryId === cat.id)}
          >
            <span>{cat.name}</span>
            <span className="text-xs opacity-70">{cat.productCount ?? 0}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
