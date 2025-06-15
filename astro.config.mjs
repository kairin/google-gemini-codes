import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import path from "path";
import { fileURLToPath } from "url";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],

  // The GitHub Actions workflow will OVERRIDE these during deployment,
  // but they are essential for local development.
  site: 'https://kairin.github.io',
  base: '/google-gemini-codes',

  // This is the crucial part that was missing.
  // It tells Vite (the build tool) how to resolve the '@/' alias.
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src')
      }
    }
  }
});
