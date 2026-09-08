import { Link, useLocation } from 'react-router-dom'

export default function OrderPlacedPage() {
  const location = useLocation()
  const orderRef = (location.state as { orderRef?: string } | null)?.orderRef

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
        ✓
      </div>
      <h1 className="text-2xl font-bold text-charcoal">Order sent!</h1>
      <p className="mt-3 text-muted">
        {orderRef && (
          <>
            Reference <span className="font-semibold text-charcoal">{orderRef}</span> —{' '}
          </>
        )}
        we've opened WhatsApp with your order details. Send the message to confirm, and we'll get
        back to you with payment instructions and delivery timing.
      </p>
      <Link
        to="/shop"
        className="mt-8 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-ink hover:bg-gold-deep"
      >
        Continue Shopping
      </Link>
    </div>
  )
}
