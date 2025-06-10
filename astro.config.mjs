import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  // This function ensures the correct paths are used for dev vs. build
  base: process.env.NODE_ENV === 'production' ? '/google-gemini-codes' : '/',
  site: 'https://kairin.github.io',
});
