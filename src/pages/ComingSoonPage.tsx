export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-brand-700 via-brand-600 to-slate-900 px-6 text-center text-white">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Gadgetra<span className="text-brand-100">.lk</span>
      </h1>
      <p className="mt-4 max-w-md text-brand-50">
        Quality mobile phone accessories, delivered island-wide across Sri Lanka.
      </p>
      <p className="mt-8 text-lg font-semibold">We're launching soon — stay tuned!</p>
      <a
        href="https://instagram.com/gadgetra.lk"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-brand-700 transition-transform hover:scale-105"
      >
        Follow us on Instagram →
      </a>
    </div>
  )
}
