import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const fallbackProxyTarget = 'http://127.0.0.1:8000'

function resolveApiProxyTarget() {
  const configuredTarget = process.env.VITE_API_PROXY || fallbackProxyTarget

  try {
    const parsed = new URL(configuredTarget)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.origin
    }
  } catch {
    return fallbackProxyTarget
  }

  return fallbackProxyTarget
}

const apiProxyTarget = resolveApiProxyTarget()

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'same-origin',
    },
    port: 5173,
    proxy: {
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
  },
}); 