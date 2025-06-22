// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config

export default defineConfig({
  // Set the canonical site URL for GitHub Pages deployment
  site: 'https://kairin.github.io',

  // IMPORTANT: Set the base path for subdirectory deployment on GitHub Pages.
  // This ensures all routes and assets are correctly prefixed with /google-gemini-codes
  base: '/google-gemini-codes',

  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },
});