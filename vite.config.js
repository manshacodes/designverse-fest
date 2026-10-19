import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://manshacodes.github.io/designverse-fest/, so assets need
// that prefix. If this ever moves to a host that serves from the root
// (Vercel, Netlify), set base back to '/'.
export default defineConfig({
  base: '/designverse-fest/',
  plugins: [react()],
})
