import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { ReservationInput } from './db.ts'

export type FieldErrors = Record<string, string>

const PHONE_RE = /^\+?[0-9][0-9\s-]{6,19}$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

const TIME_RE = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/

export function validateReservation(body: unknown): { data?: ReservationInput; errors: FieldErrors } {
  const errors: FieldErrors = {}
  const b = (body ?? {}) as Record<string, unknown>

  const str = (k: string) => (typeof b[k] === 'string' ? (b[k] as string).trim() : '')

  const name = str('name')
  if (name.length < 2 || name.length > 80) errors.name = 'Name must be 2–80 characters.'

  const phone = str('phone')
  if (!PHONE_RE.test(phone)) errors.phone = 'Enter a valid phone number.'

  const email = str('email')
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email.'

  const date = str('date')
  if (!DATE_RE.test(date)) {
    errors.date = 'Date must be YYYY-MM-DD.'
  } else {
    const d = new Date(`${date}T00:00:00`)
    if (Number.isNaN(d.getTime())) {
      errors.date = 'Invalid calendar date.'
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (d < today) errors.date = 'Date cannot be in the past.'
    }
  }

  const time = str('time')
  if (!TIME_RE.test(time)) errors.time = 'Time must look like "7:00 PM".'

  const guests = Number(b.guests)
  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    errors.guests = 'Guests must be a whole number between 1 and 20.'
  }

  const notes = str('notes')
  if (notes.length > 500) errors.notes = 'Notes must be 500 characters or fewer.'

  if (Object.keys(errors).length > 0) return { errors }
  return {
    data: { name, phone, email: email || undefined, date, time, guests, notes: notes || undefined },
    errors,
  }
}

/** Wraps an async handler so rejections hit Express 5's error path reliably. */
export const wrap = (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    fn(req, res, next).catch(next)
  }
