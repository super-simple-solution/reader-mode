// vite.config.js
import { resolve } from "path";
import { defineConfig } from "file:///C:/sss/reader-mode/node_modules/.pnpm/vite@4.5.0_sass@1.69.5/node_modules/vite/dist/node/index.js";
import { crx } from "file:///C:/sss/reader-mode/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.21/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import zipPack from "file:///C:/sss/reader-mode/node_modules/.pnpm/vite-plugin-zip-pack@1.0.6_vite@4.5.0/node_modules/vite-plugin-zip-pack/dist/esm/index.mjs";
import eslintPlugin from "file:///C:/sss/reader-mode/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.54.0+vite@4.5.0/node_modules/vite-plugin-eslint/dist/index.mjs";
import tailwind from "file:///C:/sss/reader-mode/node_modules/.pnpm/tailwindcss@3.3.5/node_modules/tailwindcss/lib/index.js";

// manifest.json
var manifest_default = {
  name: "reading-mode",
  version: "0.1.2",
  manifest_version: 3,
  description: "Reading-mode",
  icons: {
    "16": "assets/icons/16.png",
    "32": "assets/icons/32.png",
    "48": "assets/icons/48.png",
    "64": "assets/icons/64.png",
    "128": "assets/icons/128.png"
  },
  content_security_policy: {
    extension_page: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'"
  },
  action: {
    default_title: "popup",
    default_popup: "src/popup/index.html"
  },
  background: {
    service_worker: "src/service_worker.js",
    type: "module"
  },
  permissions: ["storage", "tabs"],
  host_permissions: [
    "<all_urls>"
  ],
  content_scripts: [
    {
      js: [
        "src/content/index.ts"
      ],
      run_at: "document_idle",
      matches: [
        "<all_urls>"
      ],
      all_frames: false
    }
  ]
};

// vite.config.js
var __vite_injected_original_dirname = "C:\\sss\\reader-mode";
var vite_config_default = defineConfig({
  build: {
    minify: "esbuild"
  },
  esbuild: {
    drop: ["console", "debugger"]
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    }
  },
  output: {
    sourcemap: "inline"
  },
  plugins: [crx({ manifest: manifest_default }), eslintPlugin(), zipPack({ outDir: "./" })],
  css: {
    // https://github.com/vitejs/vite/discussions/8216
    modules: {
      scopeBehaviour: "global"
    },
    postcss: {
      plugins: [tailwind()]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHNzc1xcXFxyZWFkZXItbW9kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcc3NzXFxcXHJlYWRlci1tb2RlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9zc3MvcmVhZGVyLW1vZGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xyXG5pbXBvcnQgemlwUGFjayBmcm9tICd2aXRlLXBsdWdpbi16aXAtcGFjaydcclxuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXHJcbmltcG9ydCB0YWlsd2luZCBmcm9tICd0YWlsd2luZGNzcydcclxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuanNvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYnVpbGQ6IHtcclxuICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxyXG4gIH0sXHJcbiAgZXNidWlsZDoge1xyXG4gICAgZHJvcDogWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10sXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBvdXRwdXQ6IHtcclxuICAgIHNvdXJjZW1hcDogJ2lubGluZScsXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbY3J4KHsgbWFuaWZlc3QgfSksIGVzbGludFBsdWdpbigpLCB6aXBQYWNrKHsgb3V0RGlyOiAnLi8nIH0pXSxcclxuICBjc3M6IHtcclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9kaXNjdXNzaW9ucy84MjE2XHJcbiAgICBtb2R1bGVzOiB7XHJcbiAgICAgIHNjb3BlQmVoYXZpb3VyOiAnZ2xvYmFsJyxcclxuICAgIH0sXHJcbiAgICBwb3N0Y3NzOiB7XHJcbiAgICAgIHBsdWdpbnM6IFt0YWlsd2luZCgpXSxcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJyZWFkaW5nLW1vZGVcIixcclxuICBcInZlcnNpb25cIjogXCIwLjEuMlwiLFxyXG4gIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJSZWFkaW5nLW1vZGVcIixcclxuICBcImljb25zXCI6IHtcclxuICAgIFwiMTZcIjogXCJhc3NldHMvaWNvbnMvMTYucG5nXCIsXHJcbiAgICBcIjMyXCI6IFwiYXNzZXRzL2ljb25zLzMyLnBuZ1wiLFxyXG4gICAgXCI0OFwiOiBcImFzc2V0cy9pY29ucy80OC5wbmdcIixcclxuICAgIFwiNjRcIjogXCJhc3NldHMvaWNvbnMvNjQucG5nXCIsXHJcbiAgICBcIjEyOFwiOiBcImFzc2V0cy9pY29ucy8xMjgucG5nXCJcclxuICB9LFxyXG4gIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjp7XHJcbiAgICBcImV4dGVuc2lvbl9wYWdlXCI6IFwic2NyaXB0LXNyYyAnc2VsZicgJ3dhc20tdW5zYWZlLWV2YWwnOyBvYmplY3Qtc3JjICdzZWxmJ1wiXHJcbiAgfSxcclxuICBcImFjdGlvblwiOiB7XHJcbiAgICBcImRlZmF1bHRfdGl0bGVcIjogXCJwb3B1cFwiLFxyXG4gICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwic3JjL3BvcHVwL2luZGV4Lmh0bWxcIlxyXG4gIH0sXHJcbiAgXCJiYWNrZ3JvdW5kXCI6IHtcclxuICAgIFwic2VydmljZV93b3JrZXJcIjogXCJzcmMvc2VydmljZV93b3JrZXIuanNcIixcclxuICAgIFwidHlwZVwiOiBcIm1vZHVsZVwiXHJcbiAgfSxcclxuICBcInBlcm1pc3Npb25zXCI6IFtcInN0b3JhZ2VcIiwgXCJ0YWJzXCJdLFxyXG4gIFwiaG9zdF9wZXJtaXNzaW9uc1wiOiAgW1xyXG4gICAgXCI8YWxsX3VybHM+XCJcclxuICBdLFxyXG4gIFwiY29udGVudF9zY3JpcHRzXCI6IFtcclxuICAgIHtcclxuICAgICAgXCJqc1wiOiBbXHJcbiAgICAgICAgXCJzcmMvY29udGVudC9pbmRleC50c1wiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwicnVuX2F0XCI6IFwiZG9jdW1lbnRfaWRsZVwiLFxyXG4gICAgICBcIm1hdGNoZXNcIjogW1xyXG4gICAgICAgIFwiPGFsbF91cmxzPlwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwiYWxsX2ZyYW1lc1wiOiBmYWxzZVxyXG4gICAgfVxyXG4gIF1cclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBOE8sU0FBUyxlQUFlO0FBQ3RRLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsV0FBVztBQUNwQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxjQUFjOzs7QUNMckI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLGtCQUFvQjtBQUFBLEVBQ3BCLGFBQWU7QUFBQSxFQUNmLE9BQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSx5QkFBMEI7QUFBQSxJQUN4QixnQkFBa0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsUUFBVTtBQUFBLElBQ1IsZUFBaUI7QUFBQSxJQUNqQixlQUFpQjtBQUFBLEVBQ25CO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDWixnQkFBa0I7QUFBQSxJQUNsQixNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsYUFBZSxDQUFDLFdBQVcsTUFBTTtBQUFBLEVBQ2pDLGtCQUFxQjtBQUFBLElBQ25CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakI7QUFBQSxNQUNFLElBQU07QUFBQSxRQUNKO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBVTtBQUFBLE1BQ1YsU0FBVztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsTUFDQSxZQUFjO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQ0Y7OztBRHZDQSxJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTSxDQUFDLFdBQVcsVUFBVTtBQUFBLEVBQzlCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLFNBQVMsQ0FBQyxJQUFJLEVBQUUsMkJBQVMsQ0FBQyxHQUFHLGFBQWEsR0FBRyxRQUFRLEVBQUUsUUFBUSxLQUFLLENBQUMsQ0FBQztBQUFBLEVBQ3RFLEtBQUs7QUFBQTtBQUFBLElBRUgsU0FBUztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFBQSxJQUN0QjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
