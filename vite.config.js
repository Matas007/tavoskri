import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('react-dom') || id.includes('react')) {
            return 'react';
          }
          if (id.includes('react-router')) {
            return 'router';
          }
          if (
            id.includes('three') ||
            id.includes('@react-three') ||
            id.includes('meshline')
          ) {
            return 'three';
          }
          if (id.includes('gsap') || id.includes('motion')) {
            return 'animation';
          }
          if (
            id.includes('@supabase') ||
            id.includes('date-fns') ||
            id.includes('react-hook-form')
          ) {
            return 'data';
          }
          if (id.includes('react-icons')) {
            return 'icons';
          }

          return 'vendor';
        }
      }
    }
  }
})

