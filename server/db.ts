import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'

const here = dirname(fileURLToPath(import.meta.url))
export const dataDir = join(here, '..', 'data')
export const DB_PATH = process.env.EMBER_DB_PATH ?? join(dataDir, 'ember-spice.sqlite')

mkdirSync(dirname(DB_PATH), { recursive: true })

export const db = new DatabaseSync(DB_PATH)

db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS reservations (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT    NOT NULL,
    phone           TEXT    NOT NULL,
    email           TEXT,
    date            TEXT    NOT NULL,
    time            TEXT    NOT NULL,
    guests          INTEGER NOT NULL CHECK (guests BETWEEN 1 AND 20),
    notes           TEXT,
    status          TEXT    NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','seated')),
    created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);
`)

export type ReservationInput = {
  name: string
  phone: string
  email?: string
  date: string
  time: string
  guests: number
  notes?: string
}

const insertStmt = db.prepare(`
  INSERT INTO reservations (name, phone, email, date, time, guests, notes)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

export function createReservation(r: ReservationInput) {
  const info = insertStmt.run(
    r.name,
    r.phone,
    r.email ?? null,
    r.date,
    r.time,
    r.guests,
    r.notes ?? null,
  )
  return { id: Number(info.lastInsertRowid), ...r, status: 'pending' as const }
}

export function listReservations(limit = 100) {
  return db
    .prepare(`SELECT * FROM reservations ORDER BY id DESC LIMIT ?`)
    .all(limit) as unknown as Record<string, unknown>[]
}
