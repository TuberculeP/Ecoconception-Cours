import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { bundleStats } from "rollup-plugin-bundle-stats";
import { dirname, join } from "node:path";
const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    bundleStats({
      baselineFilepath: join(
        currentDir,
        "node_modules",
        ".cache",
        "bundle-stats",
        "baseline.json",
      ),
      silent: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./webapp/src", import.meta.url)),
    },
  },
  server: {
    middlewareMode: true,
  },
  build: {
    outDir: "../dist/client",
    emptyOutDir: true,
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
  },
  root: "webapp",
});
