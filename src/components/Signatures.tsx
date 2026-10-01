import { formatKsh, signatures } from '../data'
import SectionHeading from './SectionHeading'

export default function Signatures() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Our Signatures"
          title="Fired over charcoal, finished with care"
          description="The dishes our regulars come back for — rooted in Kenyan tradition, plated with a modern hand."
        />
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {signatures.map((dish) => (
            <article
              key={dish.id}
              className="group overflow-hidden rounded-xl border border-cream/10 bg-coal transition duration-300 hover:-translate-y-1.5 hover:border-gold/40"
            >
              <div className="overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-medium">{dish.name}</h3>
                  <span className="whitespace-nowrap text-sm font-semibold text-gold">
                    {formatKsh(dish.price)}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-cream/60">{dish.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
