import { defineConfig } from 'vitest/config';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { buildThemeBootData } from './src/data/themeOptions';

// Injects presets + precomputed (contrast-checked) colours into the inline
// boot script of index.html, so themeOptions.ts stays the single source.
function themeBootPlugin(): Plugin {
  return {
    name: 'theme-boot-data',
    transformIndexHtml(html) {
      return html.replace(
        '/*__THEME_BOOT_DATA__*/ null',
        JSON.stringify(buildThemeBootData())
      );
    },
  };
}

// Long-lived vendor chunks: they change far less often than app code, so
// returning visitors keep them in cache across deployments.
function manualChunks(id: string) {
  // Small helpers shared by the entry and the 3D code must stay in an eager
  // chunk, otherwise Rollup hoists them into the 3D/physics chunks and the
  // entry ends up preloading ~3 MB of JS it does not need.
  if (
    id.includes('preload-helper') ||
    id.includes('commonjsHelpers') ||
    id.includes('use-sync-external-store')
  )
    return 'vendor-react';
  if (!id.includes('node_modules')) return;
  if (id.includes('@dimforge') || id.includes('@react-three/rapier'))
    return 'vendor-physics';
  if (
    id.includes('/three/') ||
    id.includes('\\three\\') ||
    id.includes('three-stdlib') ||
    id.includes('@react-three') ||
    id.includes('troika') ||
    id.includes('meshoptimizer') ||
    id.includes('three-mesh-bvh')
  )
    return 'vendor-three';
  if (
    /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(
      id
    )
  )
    return 'vendor-react';
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), themeBootPlugin()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: { manualChunks },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
