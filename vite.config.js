import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Get client from environment variable
  const client = process.env.VITE_CLIENT || 'gcpl';
  
  return {
    plugins: [react()],
    
    // Path resolution
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@components': path.resolve(__dirname, './src/components'),
        '@services': path.resolve(__dirname, './src/services'),
        '@contexts': path.resolve(__dirname, './src/contexts'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@clients': path.resolve(__dirname, './src/clients'),
      },
    },
    
    // Define global constants
    define: {
      __CLIENT__: JSON.stringify(client),
      __DEV__: command === 'serve',
      __PROD__: command === 'build',
    },
    
    // Development server configuration
    server: {
      port: 3000,
      host: true,
      open: true,
      cors: true,
    },
    
    // Build configuration
    build: {
      outDir: `dist/${client}`,
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
      
      // Rollup options
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            mui: ['@mui/material', '@mui/icons-material'],
            router: ['react-router', 'react-router-dom'],
            utils: ['lodash', 'date-fns', 'dayjs'],
          },
        },
      },
      
      // Chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },
    
    // CSS configuration
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    
    // Environment variables
    envPrefix: 'VITE_',
    
    // Optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@mui/material',
        '@mui/icons-material',
        'react-router-dom',
      ],
    },
    
    // Preview server (for production builds)
    preview: {
      port: 4173,
      host: true,
      open: true,
    },
  };
});

