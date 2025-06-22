// FILE: astro.config.mjs

import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  integrations: [tailwind(), react()],
  site: 'https://kairin.github.io',
  base: '/google-gemini-codes',
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src')
      }
    }
  }
});
