// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config

export default defineConfig({
  // Set the canonical site URL for GitHub Pages deployment
  site: 'https://kairin.github.io',

  // Removed 'base' so site will deploy to the root of the domain
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },
});