import { useState } from 'react'
import { Flame, Play } from 'lucide-react'

const HERO_VIDEO = '/media/videos/hero/restaurant-hero.mp4'
const HERO_POSTER = '/media/images/hero/hero-food.jpg'

export default function Hero() {
  const [videoOk, setVideoOk] = useState(true)

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 lg:pt-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] size-[34rem] rounded-full bg-ember/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] size-[28rem] rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8">
        <div className="animate-fade-up">
          <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            <Flame size={14} /> Nairobi · Modern African Kitchen
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Authentic Flavors.
            <br />
            <span className="italic text-gold">Modern</span> Experience.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
            Experience bold African cuisine crafted with a contemporary touch — locally sourced ingredients,
            fire-driven cooking, and the warmth of Kenyan hospitality.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#menu"
              className="rounded-md bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-charcoal transition hover:bg-ember hover:text-cream"
            >
              View Our Menu
            </a>
            <a
              href="#reservations"
              className="rounded-md border border-cream/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-cream transition hover:border-gold hover:text-gold"
            >
              Reserve a Table
            </a>
          </div>
        </div>

        <div className="relative animate-fade-up">
          <div className="absolute -inset-3 rounded-2xl border border-gold/25" />
          {videoOk ? (
            <video
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              src={HERO_VIDEO}
              poster={HERO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoOk(false)}
            />
          ) : (
            <img
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              src={HERO_POSTER}
              alt="Signature dishes at Ember & Spice"
            />
          )}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-charcoal/80 px-4 py-2 text-[11px] uppercase tracking-wider text-cream/75 backdrop-blur">
            <Play size={12} className="text-gold" /> Live from our open-fire kitchen
          </div>
        </div>
      </div>
    </section>
  )
}
