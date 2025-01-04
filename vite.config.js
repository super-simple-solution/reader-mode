import path from 'node:path'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import tailwind from 'tailwindcss'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import biomePlugin from 'vite-plugin-biome'
import zipPack from 'vite-plugin-zip-pack'
import manifest from './manifest.json'

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
  build: {
    minify: 'esbuild',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  output: {
    sourcemap: 'inline',
  },
  plugins: [
    crx({ manifest }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
        /\.json$/, // .json
      ],
      // global imports to register
      imports: ['vue'],
      resolvers: [ElementPlusResolver()],
      dts: './auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    biomePlugin({
      mode: 'check',
      files: '.',
      applyFixes: true,
      failOnError: true,
    }),
    zipPack({ outDir: './' }),
  ],
  css: {
    // https://github.com/vitejs/vite/discussions/8216
    modules: {
      scopeBehaviour: 'global',
    },
    postcss: {
      plugins: [tailwind()],
    },
  },
})
