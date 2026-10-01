import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { site } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Find Us"
          title="In the heart of Westlands, Nairobi"
          description="Walk-ins are welcome, but we recommend reserving ahead on weekends."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-cream/10 bg-coal p-6">
                <MapPin className="text-gold" size={22} />
                <h3 className="mt-4 font-display text-lg font-medium">Visit</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{site.address}</p>
              </div>
              <div className="rounded-xl border border-cream/10 bg-coal p-6">
                <Phone className="text-gold" size={22} />
                <h3 className="mt-4 font-display text-lg font-medium">Call</h3>
                <p className="mt-2 text-sm text-cream/60">{site.phone}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-cream/60">
                  <Mail size={13} className="text-gold/70" /> {site.email}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-cream/10 bg-coal p-6">
              <Clock className="text-gold" size={22} />
              <h3 className="mt-4 font-display text-lg font-medium">Opening Hours</h3>
              <ul className="mt-3 space-y-2">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex items-end gap-3 text-sm">
                    <span className="text-cream/60">{h.days}</span>
                    <span className="mb-1 flex-1 border-b border-dotted border-cream/15" />
                    <span className="text-cream">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-md border border-gold/50 px-6 py-3 text-sm font-medium text-gold transition hover:bg-gold hover:text-charcoal"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-cream/10">
            <img
              src="/media/images/misc/map.svg"
              alt={`Map to ${site.name}, ${site.address}`}
              className="h-full min-h-72 w-full object-cover"
            />
            <a
              href="https://maps.google.com/?q=Riverside+Drive,+Westlands,+Nairobi"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 rounded-md bg-charcoal/85 px-4 py-2 text-xs uppercase tracking-wider text-gold backdrop-blur transition hover:bg-gold hover:text-charcoal"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
