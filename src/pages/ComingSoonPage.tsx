export default function ComingSoonPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center text-white">
      <img
        src="/mark-white.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
      />
      <img src="/logo-footer.svg" alt="Gadgetra.lk" className="relative h-28 w-auto" />
      <p className="relative mt-2 max-w-md text-white/70">
        Quality mobile phone accessories, delivered island-wide across Sri Lanka.
      </p>
      <p className="relative mt-8 text-lg font-semibold text-gold">We're launching soon — stay tuned!</p>
      <a
        href="https://instagram.com/gadgetra.lk"
        target="_blank"
        rel="noreferrer"
        className="relative mt-8 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink transition-transform hover:scale-105 hover:bg-gold-deep"
      >
        Follow us on Instagram →
      </a>
    </div>
  )
}
