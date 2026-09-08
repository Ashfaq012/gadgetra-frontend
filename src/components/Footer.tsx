export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-paper/70">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <img src="/logo-footer.svg" alt="Gadgetra.lk" className="h-20 w-auto" />

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              href="https://instagram.com/gadgetra.lk"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-medium text-paper hover:text-gold"
            >
              <img src="/icons/icon-instagram-circle-gold.svg" alt="" className="h-6 w-6" />
              @gadgetra.lk on Instagram
            </a>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Gadgetra.lk — Mobile accessories, delivered island-wide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
