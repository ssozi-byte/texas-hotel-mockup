export type ReservationRequest = {
  name: string
  phone: string
  email?: string
  date: string
  time: string
  guests: number
  notes?: string
}

export type ReservationResult =
  | { ok: true; saved: boolean; id?: number }
  | { ok: false; message: string; fieldErrors?: Record<string, string> }

const API_URL = '/api/reservations'

/**
 * POSTs the booking to the Express API. If the server isn't reachable
 * (e.g. static preview / demo mode), resolves with saved:false so the UI
 * can still show the confirmation flow.
 */
export async function submitReservation(r: ReservationRequest): Promise<ReservationResult> {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(r),
    })

    if (res.ok) {
      const body = (await res.json()) as { reservation?: { id?: number } }
      return { ok: true, saved: true, id: body.reservation?.id }
    }

    // 404/405 from a static file server means "no API here" — demo mode.
    if (res.status === 404 || res.status === 405) {
      return { ok: true, saved: false }
    }

    if (res.status === 400) {
      const body = (await res.json()) as { fields?: Record<string, string> }
      return { ok: false, message: 'Please fix the highlighted fields.', fieldErrors: body.fields }
    }
    if (res.status === 429) {
      return { ok: false, message: 'Too many requests — please wait a minute and try again.' }
    }
    return { ok: false, message: `Server error (${res.status}). Please try again.` }
  } catch {
    // Network failure — demo mode (no backend running).
    return { ok: true, saved: false }
  }
}
