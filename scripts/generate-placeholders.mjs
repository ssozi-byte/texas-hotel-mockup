/**
 * Generates placeholder SVG artwork for every image slot in public/media,
 * plus video folder stubs — so the mockup runs fully offline.
 * Swap the generated files for real photos/videos, same filenames.
 *
 * Run: npm run media
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const imgDir = (p) => join(root, 'public', 'media', 'images', p)
const vidDir = (p) => join(root, 'public', 'media', 'videos', p)

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const hash = (s) => {
  let h = 7
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0
  return Math.abs(h)
}

function art(label, { w = 1200, h = 900 } = {}) {
  const seed = hash(label)
  const hue = 16 + (seed % 34) // warm gold/ember range
  const gx = 28 + (seed % 44)
  const gy = 22 + ((seed >> 2) % 44)
  const r1 = h * (0.24 + ((seed >> 4) % 10) / 60)
  const cx = (w * 0.82).toFixed(0)
  const cy = (h * 0.22).toFixed(0)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="bg" cx="${gx}%" cy="${gy}%" r="95%">
      <stop offset="0%" stop-color="hsl(${hue},68%,30%)"/>
      <stop offset="55%" stop-color="hsl(${(hue + 16) % 60},52%,15%)"/>
      <stop offset="100%" stop-color="#16120e"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <g fill="none" stroke="hsl(${hue},62%,55%)" stroke-opacity="0.16" stroke-width="2">
    <circle cx="${cx}" cy="${cy}" r="${r1.toFixed(0)}"/>
    <circle cx="${cx}" cy="${cy}" r="${(r1 * 0.66).toFixed(0)}"/>
    <circle cx="${(w * 0.14).toFixed(0)}" cy="${(h * 0.86).toFixed(0)}" r="${(r1 * 0.8).toFixed(0)}"/>
  </g>
  <path d="M ${w / 2} ${h * 0.3} q ${w * 0.06} ${h * 0.12} 0 ${h * 0.2} q ${-w * 0.06} ${-h * 0.08} 0 ${-h * 0.2}"
        fill="hsl(${hue},80%,55%)" fill-opacity="0.3"/>
  <text x="50%" y="53%" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic"
        font-size="${Math.round(w / 13)}" fill="#f5ead8">${esc(label)}</text>
  <text x="50%" y="${(h * 0.63).toFixed(0)}" text-anchor="middle" font-family="Verdana, sans-serif" letter-spacing="5"
        font-size="${Math.round(w / 62)}" fill="hsl(${hue},70%,62%)">PLACEHOLDER · EMBER &amp; SPICE</text>
</svg>
`
}

function mapSvg() {
  let grid = ''
  for (let x = 0; x <= 800; x += 50) grid += `<line x1="${x}" y1="0" x2="${x}" y2="500"/>`
  for (let y = 0; y <= 500; y += 50) grid += `<line x1="0" y1="${y}" x2="800" y2="${y}"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#1d1915"/>
  <g stroke="#332c24" stroke-width="1" opacity="0.6">${grid}</g>
  <path d="M -20 380 C 200 300 350 330 480 240 S 760 120 830 90" fill="none" stroke="#4a4136" stroke-width="26" stroke-linecap="round"/>
  <path d="M -20 380 C 200 300 350 330 480 240 S 760 120 830 90" fill="none" stroke="#5d5244" stroke-width="3" stroke-dasharray="14 18"/>
  <path d="M 120 -20 C 180 120 260 200 300 320 S 340 460 330 520" fill="none" stroke="#4a4136" stroke-width="18" stroke-linecap="round"/>
  <path d="M 620 520 C 600 420 640 360 700 300" fill="none" stroke="#4a4136" stroke-width="14" stroke-linecap="round"/>
  <circle cx="430" cy="235" r="30" fill="#d9a441" fill-opacity="0.16"/>
  <path d="M430 172 c -20 0 -34 15 -34 34 c 0 24 34 58 34 58 s 34 -34 34 -58 c 0 -19 -14 -34 -34 -34 z" fill="#d9a441"/>
  <circle cx="430" cy="207" r="12" fill="#1a1714"/>
  <text x="430" y="302" text-anchor="middle" font-family="Verdana, sans-serif" font-size="17" font-weight="bold" fill="#f5ead8">EMBER &amp; SPICE</text>
  <text x="430" y="326" text-anchor="middle" font-family="Verdana, sans-serif" font-size="12" fill="#bfa77f">18 Riverside Drive · Westlands</text>
</svg>
`
}

const FLAME =
  'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'

function logo(bg, fg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="28" fill="${bg}"/>
  <g transform="translate(28 22) scale(3)"><path d="${FLAME}" fill="${fg}"/></g>
</svg>
`
}

function save(rel, content) {
  const p = imgDir(rel)
  mkdirSync(dirname(p), { recursive: true })
  writeFileSync(p, content)
}

const images = {
  'hero/hero-food.svg': ['Charcoal & Fire', { w: 1600, h: 1200 }],
  'hero/restaurant-interior.svg': ['The Dining Room', { w: 1600, h: 1200 }],
  'hero/chef.svg': ['Chef Amina', { w: 800, h: 800 }],
  'dishes/nyama-choma.svg': ['Nyama Choma', {}],
  'dishes/coconut-prawns.svg': ['Coconut Prawns', {}],
  'dishes/ember-chicken.svg': ['Ember Chicken', {}],
  'dishes/beef-skewers.svg': ['Beef Skewers', {}],
  'dishes/cheesecake.svg': ['Passion Cheesecake', {}],
  'gallery/food-01.svg': ['From the Grill', {}],
  'gallery/food-02.svg': ['Coastal Flavors', {}],
  'gallery/food-03.svg': ['Garden Harvest', {}],
  'gallery/interior-01.svg': ['Main Dining', {}],
  'gallery/interior-02.svg': ['The Ember Bar', {}],
  'gallery/chef-01.svg': ['At the Pass', {}],
}

for (const [rel, [label, opts]] of Object.entries(images)) save(rel, art(label, opts))

save('logo/logo.svg', logo('#1a1714', '#d9a441'))
save('logo/logo-white.svg', logo('#d9a441', '#f5ead8'))

mkdirSync(imgDir('misc'), { recursive: true })
writeFileSync(imgDir('misc/map.svg'), mapSvg())

for (const d of ['hero', 'food', 'restaurant']) {
  mkdirSync(vidDir(d), { recursive: true })
  writeFileSync(join(vidDir(d), '.gitkeep'), '')
}

console.log(`✓ Generated ${Object.keys(images).length + 3} placeholder images in public/media/images`)
console.log('✓ Created video folders: public/media/videos/{hero,food,restaurant}')
