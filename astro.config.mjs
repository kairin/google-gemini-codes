// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config

export default defineConfig({
  // Set the canonical site URL for GitHub Pages deployment
  site: 'https://kairin.github.io',

  // Set the base path to match the GitHub repo name for correct routing
  base: '/google-gemini-codes',
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },
});