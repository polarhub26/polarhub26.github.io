import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// [GUIDE: GITHUB-PAGES]
// `base: "./"` keeps assets working at both username.github.io and
// username.github.io/repository-name without requiring a paid domain.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
