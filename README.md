# 🔥 Ember & Spice — Modern African Kitchen

A premium restaurant website mockup for an upscale Kenyan/African fusion restaurant in Nairobi.
React + Vite + TypeScript + Tailwind CSS v4.

## Quick start

```bash
npm install
npm run dev          # frontend only (reservations run in demo mode)
npm run dev:full     # Express API (:3001) + Vite dev server with /api proxy
npm run server       # API only
npm run build        # typecheck + production build
npm run build:single # self-contained dist-single/index.html (all media inlined)
npm run preview      # serve the production build
npm run media        # regenerate placeholder logos/map
```

## Backend (reservations)

A small Express 5 + SQLite API persists bookings — no native modules, it uses
Node's built-in `node:sqlite` (Node ≥ 22.5):

- `POST /api/reservations` — validate & save a booking (rate-limited, 10 req/min per IP)
- `GET  /api/reservations` — latest 100 bookings
- Data lives in `data/ember-spice.sqlite` (WAL mode; override with `EMBER_DB_PATH`)

The frontend ([src/api.ts](src/api.ts)) always POSTs to `/api/reservations`.
If the API isn't reachable (static preview / demo mode), the form still completes
and shows a "demo mode" confirmation instead of failing.

## Structure and the two looping videos are **real, freely-licensed media stored
locally in `public/media/`** — the site serves everything itself, with no external links at runtime.
Swap any file for your own (same filename) and nothing else changes.

Media sources: photos via [Unsplash](https://unsplash.com/license) (free to use);
videos from Wikimedia Commons — `Asado al espeto en Argentina` and
`Galeto of Argentina` (CC BY 3.0, art food & drink), trimmed/re-encoded locally.

## Sections

Hero (with looping video panel) · Signatures · About/Story · Menu tabs ·
Experience video block · Gallery · Reservation form · Location & map · Footer

## Structure

```
src/            # React frontend (components, data, api client)
server/         # Express API (index.ts, db.ts, validate.ts)
data/           # SQLite database (gitignored, auto-created)
public/media/   # real photos & videos served by the site
```

## Roadmap (backend-ready)

1. ~~Reservations → POST to an API~~ ✅ done (Express + SQLite)
2. Payments → M-Pesa STK push (schema: `payments` table)
3. Admin dashboard → manage menu, gallery and bookings
4. CMS for media in `public/media/`

© 2026 Ember & Spice
