import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, so the Pages build passes
  // PAGES_BASE. The Worker build and local dev stay at the domain root.
  base: process.env.PAGES_BASE || '/',
  plugins: [react(), tailwindcss(), cloudflare()],
  server: { port: 5305, strictPort: false },
})
