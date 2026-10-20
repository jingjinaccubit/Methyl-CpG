import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves project sites beneath /<repository>/; keep other deploys at the root.
  base: process.env.GITHUB_PAGES === 'true' ? '/Methyl-CpG/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
