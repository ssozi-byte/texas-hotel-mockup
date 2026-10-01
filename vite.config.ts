import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Dev convenience: forward API calls to the Express server (npm run dev:full).
      '/api': 'http://localhost:3001',
    },
  },
})
