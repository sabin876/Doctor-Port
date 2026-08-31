// Rebuild for font changes
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import 'dotenv/config';

// Set process.env fallbacks before Vite loads them
process.env.VITE_CONTACT_PHONE = process.env.VITE_CONTACT_PHONE || "+91 90492 00041";
process.env.VITE_CONTACT_EMAIL = process.env.VITE_CONTACT_EMAIL || "appointment@drulhasorthopedic.com";
process.env.VITE_WHATSAPP_NUMBER = process.env.VITE_WHATSAPP_NUMBER || "+919049200041";

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // only compress files > 1KB
    }),
    // Brotli compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),
  ],
  define: {
    'import.meta.env.VITE_CONTACT_PHONE': JSON.stringify(process.env.VITE_CONTACT_PHONE || "+91 90492 00041"),
    'import.meta.env.VITE_CONTACT_EMAIL': JSON.stringify(process.env.VITE_CONTACT_EMAIL || "appointment@drulhasorthopedic.com"),
    'import.meta.env.VITE_WHATSAPP_NUMBER': JSON.stringify(process.env.VITE_WHATSAPP_NUMBER || "+919049200041"),
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/robots.txt': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/sitemap.xml': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Use terser for better JS minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      format: {
        comments: false,      // strip all comments
      },
    },
    // CSS code splitting per chunk
    cssCodeSplit: true,
    // Chunk size warning limit
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manually split vendor libraries into separate chunks (client only)
        manualChunks: isSsrBuild ? undefined : {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
        },
        // Add content hashes to filenames for long-term caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(png|jpe?g|webp|svg|gif|ico)$/i.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/i.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(woff2?|ttf|eot)$/i.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
}))
