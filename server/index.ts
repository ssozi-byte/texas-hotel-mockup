import express from 'express'
import { createReservation, listReservations } from './db.ts'
import { validateReservation, wrap } from './validate.ts'

const app = express()
app.use(express.json())

// Simple per-IP rate limit for the public endpoint (demo-grade, in-memory).
const hits = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 10
const WINDOW_MS = 60_000

function rateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
  const key = req.ip ?? 'unknown'
  const now = Date.now()
  const entry = hits.get(key)
  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + WINDOW_MS })
    return next()
  }
  entry.count += 1
  if (entry.count > RATE_LIMIT) {
    return res.status(429).json({ error: 'Too many requests. Try again in a minute.' })
  }
  next()
}

app.post('/api/reservations', rateLimit, wrap(async (req, res) => {
  const { data, errors } = validateReservation(req.body)
  if (!data) return res.status(400).json({ error: 'Validation failed', fields: errors })
  const reservation = createReservation(data)
  res.status(201).location(`/api/reservations/${reservation.id}`).json({ ok: true, reservation })
}))

app.get('/api/reservations', wrap(async (_req, res) => {
  res.json({ ok: true, reservations: listReservations() })
}))

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler (bad JSON bodies, unexpected failures)
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = err instanceof SyntaxError ? 400 : 500
  const message = err instanceof SyntaxError ? 'Invalid JSON body' : 'Internal server error'
  if (status === 500) console.error(err)
  res.status(status).json({ error: message })
})

// `||` (not ??) so an empty PORT env var falls back to 3001 instead of port 0.
const port = Number(process.env.PORT) || 3001
app.listen(port, () => {
  console.log(`Ember & Spice API listening on http://localhost:${port}`)
})
