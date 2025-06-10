import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  // This section defines the configuration for your project.
  // The GitHub Actions workflow will OVERRIDE these during the deployment build,
  // but they are essential for local development and for other tools to understand your site structure.
  site: 'https://kairin.github.io',
  base: '/google-gemini-codes',
});
