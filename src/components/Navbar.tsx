import { useEffect, useState } from 'react'
import { Flame, Menu as MenuIcon, X } from 'lucide-react'
import { navLinks } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-charcoal/95 shadow-lg shadow-black/20 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/40">
            <Flame size={20} />
          </span>
          <span className="font-display text-lg font-semibold tracking-[0.18em] text-cream">
            EMBER <span className="text-gold">&</span> SPICE
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm tracking-wide text-cream/80 transition hover:text-gold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#reservations"
            className="rounded-md bg-gold px-5 py-2.5 text-sm font-medium tracking-wide text-charcoal transition hover:bg-ember hover:text-cream"
          >
            Reserve a Table
          </a>
        </div>

        <button className="text-cream lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={26} /> : <MenuIcon size={26} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-cream/10 bg-charcoal/95 px-5 pb-6 pt-2 backdrop-blur lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-cream/85 transition hover:bg-soot hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#reservations"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-md bg-gold px-5 py-3 text-center text-sm font-medium text-charcoal"
          >
            Reserve a Table
          </a>
        </div>
      )}
    </header>
  )
}
