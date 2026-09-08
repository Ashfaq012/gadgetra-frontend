export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Gadgetra.lk — Mobile accessories, delivered island-wide.</p>
          <a
            href="https://instagram.com/gadgetra.lk"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand-600 hover:text-brand-700"
          >
            @gadgetra.lk on Instagram →
          </a>
        </div>
      </div>
    </footer>
  )
}
