import { useState } from 'react'
import { formatKsh, menu } from '../data'
import SectionHeading from './SectionHeading'

export default function Menu() {
  const [activeId, setActiveId] = useState(menu[0].id)
  const active = menu.find((c) => c.id === activeId) ?? menu[0]

  return (
    <section id="menu" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The Menu"
          title="Starters, fire-grilled mains & coastal sweets"
          description="Prices in Kenyan Shillings. Ask our team about today's specials."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {menu.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium uppercase tracking-wider transition ${
                c.id === activeId
                  ? 'bg-gold text-charcoal'
                  : 'border border-cream/15 text-cream/65 hover:border-gold/50 hover:text-gold'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-x-14 gap-y-8 sm:grid-cols-2">
          {active.items.map((item) => (
            <article key={item.id}>
              <div className="flex items-end gap-3">
                <h3 className="font-display text-lg font-medium">{item.name}</h3>
                {item.tags?.map((t) => (
                  <span
                    key={t}
                    className="mb-0.5 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold"
                  >
                    {t}
                  </span>
                ))}
                <span className="mb-1.5 flex-1 border-b border-dotted border-cream/25" />
                <span className="whitespace-nowrap text-sm font-semibold text-gold">
                  {formatKsh(item.price)}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/55">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
