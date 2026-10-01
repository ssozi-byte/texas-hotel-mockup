import { ArrowRight } from 'lucide-react'

const stats = [
  { value: '2016', label: 'Founded in Nairobi' },
  { value: '40+', label: 'Seasonal dishes' },
  { value: '120', label: 'Seats & ember bar' },
]

export default function About() {
  return (
    <section id="about" className="bg-coal py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-xl border border-gold/30" />
          <img
            src="/media/images/hero/restaurant-interior.jpg"
            alt="Inside Ember & Spice"
            loading="lazy"
            className="relative aspect-[4/3] w-full rounded-xl object-cover"
          />
          <img
            src="/media/images/hero/chef.jpg"
            alt="Chef Amina Otieno"
            loading="lazy"
            className="absolute -bottom-8 -right-4 hidden aspect-square w-44 rounded-lg border-4 border-coal object-cover shadow-xl sm:block"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Our Story</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Rooted in Kenya, cooked over fire
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-cream/65 sm:text-base">
            Ember &amp; Spice brings together traditional African flavors and contemporary culinary techniques.
            Our beef rests on open charcoal, our prawns come straight from the coast, and our produce arrives
            each morning from farms around Nairobi.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-cream/65 sm:text-base">
            Led by Chef <span className="text-cream">Amina Otieno</span>, our kitchen celebrates the
            gathering spirit of a Kenyan table — loud laughter, shared plates, and meals that linger long
            after the embers cool.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-cream/10 py-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-semibold text-gold">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-cream/50">{s.label}</p>
              </div>
            ))}
          </div>

          <a
            href="#gallery"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold transition hover:text-ember"
          >
            Discover Our Story <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
