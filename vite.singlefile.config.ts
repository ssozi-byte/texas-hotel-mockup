import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

const MIME: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}

/** Rewrites /media/... references to data URIs so the single-file build is
 *  fully self-contained (public/ assets are not inlined by viteSingleFile). */
function inlinePublicMedia(): Plugin {
  return {
    name: 'inline-public-media',
    apply: 'build',
    generateBundle(_options, bundle) {
      const cache = new Map<string, string>()
      const toDataUri = (relPath: string): string | null => {
        if (!cache.has(relPath)) {
          const file = join(__dirname, 'public', relPath)
          let uri: string | null = null
          if (existsSync(file)) {
            const ext = relPath.slice(relPath.lastIndexOf('.')).toLowerCase()
            const mime = MIME[ext]
            if (mime) {
              const data = readFileSync(file)
              uri = `data:${mime};base64,${data.toString('base64')}`
            }
          }
          cache.set(relPath, uri ?? '')
        }
        return cache.get(relPath) || null
      }

      const rx = /\/media\/(?:images|videos)\/[\w./-]+\.(?:svg|png|jpe?g|webp|gif|mp4|webm)/g
      const rewrite = (code: string) =>
        code.replace(rx, (match) => toDataUri(match) ?? match)

      for (const asset of Object.values(bundle)) {
        if (asset.type === 'chunk') asset.code = rewrite(asset.code)
        if (asset.type === 'asset' && asset.fileName.endsWith('.html')) {
          asset.source = rewrite(String(asset.source))
        }
      }
    },
  }
}

// Builds the entire site (JS, CSS, media) into one self-contained HTML file:
// dist-single/index.html. Used to produce a preview artifact with no dev server.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), inlinePublicMedia()],
  build: {
    outDir: 'dist-single',
    emptyOutDir: true,
  },
})
