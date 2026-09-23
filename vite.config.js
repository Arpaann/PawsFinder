import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// PawsFinder — Vite production configuration
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Required for Tailwind CSS v4 (processes @import "tailwindcss" in index.css)
  ],
  build: {
    sourcemap: false, // No source maps in production (security)
    rollupOptions: {
      output: {
        // Code splitting — vendor libs separated for better caching
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/html2canvas-pro')) {
            return 'vendor-canvas';
          }
          if (id.includes('node_modules/canvas-confetti')) {
            return 'vendor-confetti';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
        },
      },
    },
  },
})
