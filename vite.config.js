import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// PawsFinder — Vite configuration
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // No source maps in production builds (security + bundle size)
    sourcemap: false,
    rollupOptions: {
      output: {
        // Code splitting: vendor libs in a separate chunk
        manualChunks: {
          vendor: ['react', 'react-dom'],
          canvas: ['html2canvas-pro'],
          confetti: ['canvas-confetti'],
        },
      },
    },
  },
})
