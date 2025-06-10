import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  
  // These two lines are the important part for GitHub Pages
  site: 'https://kairin.github.io',
  base: '/google-gemini-codes',
});
