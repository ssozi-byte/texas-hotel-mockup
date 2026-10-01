import { gallery } from '../data'
import SectionHeading from './SectionHeading'

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Our experience, in frames"
          description="Food, fire, and the room that brings it all together."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <figure
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-cream/10"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/95 to-transparent p-5 pt-12">
                <p className="text-[11px] uppercase tracking-[0.25em] text-gold">{item.category}</p>
                <p className="mt-1 font-display text-lg font-medium">{item.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
