import { useState } from 'react'
import { Clapperboard } from 'lucide-react'

const VIDEO = '/media/videos/restaurant/atmosphere.mp4'
const POSTER = '/media/images/gallery/interior-01.jpg'

export default function Experience() {
  const [videoOk, setVideoOk] = useState(true)

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-ember/10 blur-3xl" />

      <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Experience Ember &amp; Spice
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Where every dish tells a story
        </h2>

        <div className="relative mt-10">
          <div className="absolute -inset-3 rounded-3xl border border-gold/20" />
          {videoOk ? (
            <video
              className="aspect-video w-full rounded-2xl object-cover"
              src={VIDEO}
              poster={POSTER}
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoOk(false)}
            />
          ) : (
            <img
              src={POSTER}
              alt="The Ember & Spice dining room"
              className="aspect-video w-full rounded-2xl object-cover"
            />
          )}
          <div className="absolute bottom-4 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-charcoal/85 px-4 py-2 text-[11px] uppercase tracking-wider text-cream/75 backdrop-blur">
            <Clapperboard size={13} className="text-gold" /> An evening at Ember &amp; Spice
          </div>
        </div>

        <p className="mt-8 font-display text-xl italic text-cream/70">
          "Fire is our first language. Flavor is our second."
        </p>
      </div>
    </section>
  )
}
