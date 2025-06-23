# ⚡ .astro Directory (Astro Internals)

The `.astro` directory is used by the Astro framework to store internal cache, metadata, and type definitions related to your content collections and build process.

## What's Inside?

- 📚 **collections/**
  - `blog.schema.json`, `projects.schema.json`: JSON schemas defining the structure of your content collections (e.g., blog posts, projects).
- 🧩 **content-assets.mjs, content-modules.mjs**: Internal modules for managing and loading content assets and modules.
- 🗃️ **data-store.json**: Stores internal data for Astro's content system.
- ⚙️ **settings.json**: Configuration and settings for Astro's content system.
- 📝 **content.d.ts, types.d.ts**: TypeScript type definitions generated for your content collections, enabling type safety and autocompletion in your code editor.

## Purpose & Goals

- 🚀 Enables fast builds and content validation.
- 🛡️ Provides type safety for content collections.
- 🔒 Not meant to be edited manually; managed by Astro.
