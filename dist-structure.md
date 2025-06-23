# 📦 dist Directory (Build Output)

The `dist` directory contains the output of your Astro build process. This is the static site that you can deploy to any web server.

## What's Inside?

- ⚡ **_astro/**: Compiled JavaScript and CSS assets for your site, optimized for production.
- 🗂️ **blog/**, **projects/**, **docs/**, etc.: Folders for each route/page in your site, each containing an `index.html` file for that route.
- 🖼️ **favicon.svg**: The site's favicon, copied from your `public/` directory.
- 🏠 **index.html**: The homepage of your site.
- 📁 Other folders (e.g., `component-usage-overview`, `relationships`, `sitemap`, `tree`): Each corresponds to a route/page in your site.

## Purpose & Goals

- 🚀 Contains all files needed to serve your site statically.
- ☁️ Can be uploaded to any static hosting provider (e.g., GitHub Pages, Netlify, Vercel).
- 🔒 Should not be edited manually; always regenerate by running the build command.
