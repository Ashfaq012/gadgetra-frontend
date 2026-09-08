import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { DISTRICTS, getShippingFee, FREE_SHIPPING_THRESHOLD } from '../data/shipping'
import { formatCurrency } from '../utils/order'
import { submitCheckout, validateDiscountCode } from '../api/client'
import type { CustomerDetails, DiscountValidation } from '../types'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    district: DISTRICTS[0],
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [discountInput, setDiscountInput] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountValidation | null>(null)
  const [discountError, setDiscountError] = useState<string | null>(null)
  const [checkingDiscount, setCheckingDiscount] = useState(false)

  // Live estimate only, so the summary panel updates as the customer picks a
  // district or applies a code — the backend recomputes subtotal/discount/
  // shipping/total authoritatively from the database when the order is
  // actually placed, so none of this can be tampered with for a cheaper price.
  const discountAmount = appliedDiscount?.valid ? appliedDiscount.discountAmount ?? 0 : 0
  const discountedSubtotal = subtotal - discountAmount
  const estimatedShipping = getShippingFee(customer.district, discountedSubtotal)
  const estimatedTotal = discountedSubtotal + estimatedShipping

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <Link to="/shop" className="mt-6 inline-block text-brand-600 hover:underline">
          ← Go to shop
        </Link>
      </div>
    )
  }

  function handleChange(field: keyof CustomerDetails) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setCustomer((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  async function handleApplyDiscount() {
    if (!discountInput.trim()) return
    setDiscountError(null)
    setCheckingDiscount(true)
    try {
      const result = await validateDiscountCode(discountInput.trim(), subtotal)
      if (result.valid) {
        setAppliedDiscount(result)
      } else {
        setAppliedDiscount(null)
        setDiscountError(result.reason || 'That code is not valid.')
      }
    } catch (err) {
      setDiscountError(err instanceof Error ? err.message : 'Could not check that code.')
    } finally {
      setCheckingDiscount(false)
    }
  }

  function handleRemoveDiscount() {
    setAppliedDiscount(null)
    setDiscountInput('')
    setDiscountError(null)
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!customer.name || !customer.phone || !customer.address) {
      setError('Please fill in your name, phone, and address.')
      return
    }

    setSubmitting(true)
    try {
      const result = await submitCheckout(
        items.map((i) => ({ productId: i.product.id, qty: i.qty })),
        customer,
        appliedDiscount?.valid ? appliedDiscount.code : undefined
      )
      window.open(result.whatsappLink, '_blank', 'noopener,noreferrer')
      clearCart()
      navigate('/order-placed', { state: { orderRef: result.orderRef, total: result.total } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong placing your order.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
            <input
              required
              value={customer.name}
              onChange={handleChange('name')}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number</label>
            <input
              required
              type="tel"
              placeholder="07X XXX XXXX"
              value={customer.phone}
              onChange={handleChange('phone')}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Delivery Address</label>
            <textarea
              required
              rows={2}
              value={customer.address}
              onChange={handleChange('address')}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">District</label>
            <select
              value={customer.district}
              onChange={handleChange('district')}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Order Notes (optional)
            </label>
            <textarea
              rows={2}
              value={customer.notes}
              onChange={handleChange('notes')}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-60"
          >
            {submitting ? 'Placing Order…' : 'Place Order via WhatsApp'}
          </button>
          <p className="text-center text-xs text-slate-500">
            You'll be taken to WhatsApp with your order pre-filled. We'll confirm payment details
            with you there.
          </p>
        </form>

        <div className="h-fit rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 font-semibold text-slate-900">Order Summary</h2>
          <ul className="mb-4 flex flex-col gap-2 text-sm">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between text-slate-600">
                <span>
                  {product.name} × {qty}
                </span>
                <span>{formatCurrency(product.price * qty)}</span>
              </li>
            ))}
          </ul>

          <div className="mb-4 border-t border-slate-200 pt-4">
            {appliedDiscount?.valid ? (
              <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2 text-sm">
                <span className="font-medium text-green-700">Code "{appliedDiscount.code}" applied</span>
                <button type="button" onClick={handleRemoveDiscount} className="text-green-700 underline">
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  placeholder="Discount code"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  disabled={checkingDiscount}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
                >
                  {checkingDiscount ? '...' : 'Apply'}
                </button>
              </div>
            )}
            {discountError && <p className="mt-1 text-xs text-red-600">{discountError}</p>}
          </div>

          <div className="space-y-1 border-t border-slate-200 pt-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Discount</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Shipping ({customer.district})</span>
              <span>{estimatedShipping === 0 ? 'FREE' : formatCurrency(estimatedShipping)}</span>
            </div>
            {estimatedShipping > 0 && (
              <p className="text-xs text-slate-400">
                Free shipping on orders over {formatCurrency(FREE_SHIPPING_THRESHOLD)}
              </p>
            )}
            <div className="flex justify-between pt-2 text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(estimatedTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
