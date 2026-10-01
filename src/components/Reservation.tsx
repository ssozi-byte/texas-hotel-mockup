import { useState, type ChangeEvent, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { submitReservation } from '../api'
import SectionHeading from './SectionHeading'

type FormState = {
  name: string
  phone: string
  email: string
  date: string
  time: string
  guests: string
  notes: string
}

const EMPTY: FormState = { name: '', phone: '', email: '', date: '', time: '7:00 PM', guests: '2', notes: '' }

const TIMES = [
  '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM', '10:00 PM',
]

const inputCls =
  'w-full rounded-md border border-cream/15 bg-charcoal px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none transition focus:border-gold'
const labelCls = 'mb-1.5 block text-xs font-medium uppercase tracking-wider text-cream/55'

const perks = [
  'Instant confirmation via SMS or WhatsApp',
  'Free cancellation up to 3 hours before',
  'Groups of 9+ — call us directly',
]

const perksDemo = [
  'Demo mode — start the API server to save real bookings',
  'Run `npm run dev:full` to enable persistence',
  'The form below still works end-to-end',
]

export default function Reservation() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [confirmed, setConfirmed] = useState<FormState | null>(null)
  const [saved, setSaved] = useState<boolean | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const today = new Date().toISOString().split('T')[0]

  const set =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [key]: e.target.value })
      setFieldErrors((prev) => {
        if (!prev[key]) return prev
        const next = { ...prev }
        delete next[key]
        return next
      })
    }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setFieldErrors({})

    const result = await submitReservation({
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      date: form.date,
      time: form.time,
      guests: Number(form.guests),
      notes: form.notes || undefined,
    })

    setSaving(false)

    if (result.ok) {
      setSaved(result.saved)
      setConfirmed(form)
    } else {
      setError(result.message)
      setFieldErrors(result.fieldErrors ?? {})
    }
  }

  const reset = () => {
    setForm(EMPTY)
    setConfirmed(null)
    setSaved(null)
    setError(null)
    setFieldErrors({})
  }

  const fieldCls = (key: keyof FormState) =>
    `${inputCls} ${fieldErrors[key] ? 'border-ember' : ''}`

  const renderError = (key: keyof FormState) =>
    fieldErrors[key] ? <p className="mt-1.5 text-xs text-ember">{fieldErrors[key]}</p> : null

  return (
    <section id="reservations" className="bg-coal py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Reservations"
            title="Reserve your table"
            description="Tell us when, and we'll keep the fire warm. Bookings are confirmed by our host team within minutes."
          />
          <ul className="mt-8 space-y-3">
            {(saved === false ? perksDemo : perks).map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-cream/65">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-gold" /> {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-cream/10 bg-charcoal p-6 sm:p-8">
          {confirmed ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 size={52} className="text-gold" />
              <h3 className="mt-5 font-display text-2xl font-semibold">Asante, {confirmed.name}!</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/65">
                Your request for <span className="text-cream">{confirmed.guests} guests</span> on{' '}
                <span className="text-cream">{confirmed.date}</span> at{' '}
                <span className="text-cream">{confirmed.time}</span> has been{' '}
                {saved ? (
                  <>saved. We'll confirm on <span className="text-cream">{confirmed.phone}</span> shortly.</>
                ) : (
                  <>recorded in demo mode (no backend running).</>
                )}
              </p>
              <button
                onClick={reset}
                className="mt-8 rounded-md border border-gold/50 px-6 py-3 text-sm font-medium text-gold transition hover:bg-gold hover:text-charcoal"
              >
                Make another reservation
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="res-name" className={labelCls}>Name</label>
                <input id="res-name" required value={form.name} onChange={set('name')} placeholder="Wanjiku Kamau" className={fieldCls('name')} />
                {renderError('name')}
              </div>
              <div>
                <label htmlFor="res-phone" className={labelCls}>Phone</label>
                <input id="res-phone" required type="tel" value={form.phone} onChange={set('phone')} placeholder="+254 7XX XXX XXX" className={fieldCls('phone')} />
                {renderError('phone')}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="res-email" className={labelCls}>Email <span className="normal-case text-cream/35">(optional)</span></label>
                <input id="res-email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={fieldCls('email')} />
                {renderError('email')}
              </div>
              <div>
                <label htmlFor="res-date" className={labelCls}>Date</label>
                <input id="res-date" required type="date" min={today} value={form.date} onChange={set('date')} className={fieldCls('date')} />
                {renderError('date')}
              </div>
              <div>
                <label htmlFor="res-time" className={labelCls}>Time</label>
                <select id="res-time" value={form.time} onChange={set('time')} className={fieldCls('time')}>
                  {TIMES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="res-guests" className={labelCls}>Guests</label>
                <select id="res-guests" value={form.guests} onChange={set('guests')} className={fieldCls('guests')}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      {i + 1} {i === 11 ? '+ guests' : i === 0 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="res-notes" className={labelCls}>Special requests <span className="normal-case text-cream/35">(optional)</span></label>
                <textarea id="res-notes" rows={3} value={form.notes} onChange={set('notes')} placeholder="Birthday table, wheelchair access, high chair…" className={fieldCls('notes')} />
                {renderError('notes')}
              </div>
              {error && (
                <p className="rounded-md border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-cream sm:col-span-2">{error}</p>
              )}
              <button
                type="submit"
                disabled={saving}
                className="mt-2 rounded-md bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-charcoal transition hover:bg-ember hover:text-cream disabled:opacity-60 sm:col-span-2"
              >
                {saving ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Reserving…
                  </span>
                  ) : (
                  'Reserve Now'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
