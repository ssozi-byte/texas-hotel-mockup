import { Facebook, Flame, Instagram, MessageCircle, Music2 } from 'lucide-react'
import { navLinks, site } from '../data'

const socialIcons: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Music2,
  whatsapp: MessageCircle,
}

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-[#141110]">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/40">
                <Flame size={20} />
              </span>
              <span className="font-display text-lg font-semibold tracking-[0.18em] text-cream">
                EMBER <span className="text-gold">&</span> SPICE
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/50">
              Modern African kitchen in Nairobi. Bold flavors, honest fire, warm hospitality.
            </p>
            <div className="mt-5 flex gap-3">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.id] ?? Instagram
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition hover:border-gold hover:text-gold"
                  >
                    <Icon size={17} />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-cream/60 transition hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/60">
              <li>{site.address}</li>
              <li>{site.phone}</li>
              <li>{site.email}</li>
              <li className="pt-1 text-cream/45">
                {site.hours[0].days}: {site.hours[0].time}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row">
          <p>© 2026 Ember &amp; Spice · Nairobi, Kenya</p>
          <p>Mockup — photography via Unsplash &amp; Wikimedia Commons (free licenses)</p>
        </div>
      </div>
    </footer>
  )
}
