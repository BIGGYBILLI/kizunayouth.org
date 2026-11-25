import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** @cloudflare/vite-plugin copies `.dev.vars` into the worker build output so
 *  `wrangler dev dist/...` can run it. That file holds the local admin password,
 *  so remove it from the bundle before anything is written: deployments and
 *  artifacts then can never ship the secret. `.dev.vars` at the project root is
 *  still what dev and preview read. */
function dropDevVars(): Plugin {
  return {
    name: 'drop-dev-vars',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const fileName of Object.keys(bundle)) {
        if (fileName.split('/').pop()?.startsWith('.dev.vars')) delete bundle[fileName]
      }
    },
  }
}

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, so the Pages build passes
  // PAGES_BASE. The Worker build and local dev stay at the domain root.
  base: process.env.PAGES_BASE || '/',
  plugins: [react(), tailwindcss(), cloudflare(), dropDevVars()],
  server: { port: 5305, strictPort: false },
})
