import { useState } from 'react'
import type { TrackedOrder } from '../types'
import { trackOrder } from '../api/client'
import { formatCurrency } from '../utils/order'

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending confirmation',
  paid: 'Payment received',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export default function OrderTrackingPage() {
  const [orderRef, setOrderRef] = useState('')
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState<TrackedOrder | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setOrder(null)
    setLoading(true)
    try {
      const result = await trackOrder(orderRef.trim(), phone.trim())
      setOrder(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Track Your Order</h1>
      <p className="mb-6 text-sm text-slate-500">
        Enter your order reference and the phone number you placed it with.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Order Reference</label>
          <input
            required
            placeholder="GAD-XXXXXX"
            value={orderRef}
            onChange={(e) => setOrderRef(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number</label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
        >
          {loading ? 'Looking up…' : 'Track Order'}
        </button>
      </form>

      {order && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">{order.orderRef}</h2>
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
              {STATUS_LABELS[order.status] || order.status}
            </span>
          </div>
          <ul className="mb-4 flex flex-col gap-1 text-sm text-slate-600">
            {order.items.map((item) => (
              <li key={item.productId} className="flex justify-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>{formatCurrency(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-1 border-t border-slate-200 pt-3 text-sm">
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Discount ({order.discountCode})</span>
                <span>-{formatCurrency(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between pt-2 text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
