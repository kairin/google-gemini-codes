# Astro Starter Kit: Basics

**Live Site:** [https://kairin.github.io/google-gemini-codes/](https://kairin.github.io/google-gemini-codes/)

---
## 🚦 Source of Truth: Asset & Link Paths

- All internal links and static asset paths **must** use `Astro.base` in `.astro` files.
- Never use root-relative paths like `/projects/` or `/favicon.svg` directly.
- Always use `${Astro.base}/path` for links and assets.
- If `Astro.base` is ever undefined, fallback to `''` (root-relative) to avoid `/undefined/` URLs.
- The deployment base is set in `astro.config.mjs` as `base: '/google-gemini-codes'`.
- See `src/SITE_DEPLOYMENT_INFO.ts` for the canonical deployment and routing settings.

---

## 🚀 Project Structure & Automation Progress (as of 2025-06-22)

This project is now a highly automated, scalable Astro site with:

- **Content Collections** for both projects and blogs, with schema validation in `src/content/config.ts`.
- **Single Markdown, Multi-Page Projects:**
  - Each project (e.g., the Astro Rebuild Guide) is a single Markdown file, split into multiple pages using the `---pagebreak---` delimiter.
  - The dynamic route `src/pages/projects/[...slug].astro` automatically generates a page for each section.
  - Navigation menu is auto-generated from section headings and now uses `{Astro.base}` for correct navigation in all environments.
- **Base-Aware Links:**
  - All internal links and static assets use `{Astro.base}` to ensure correct behavior for both local development and GitHub Pages subdirectory deployment.
- **Blog Support:**
  - Blog posts live in `src/content/blog/` and are managed by the content collection schema.
- **CI/CD:**
  - GitHub Actions workflow (`.github/workflows/deploy.yml`) installs all dependencies (including `marked`), builds, and deploys the site to the correct subdirectory on GitHub Pages.
- **Tailwind CSS:**
  - Integrated via Vite for modern styling.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321/google-gemini-codes/` |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🛠️ Key Changes for Automation & Smooth Operation

- **All navigation and internal links use `{Astro.base}`** for correct routing under subdirectory deployment.
- **No more manual folder management for multi-page projects**—just use `---pagebreak---` in your Markdown.
- **All dependencies (including `marked`) are installed automatically in CI/CD.**
- **Warnings about npm config (`globalignorefile`) resolved by removing from global npmrc.**

## 👀 Want to learn more?

- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro Routing](https://docs.astro.build/en/core-concepts/routing/)
- [Deploying to GitHub Pages](https://docs.astro.build/en/guides/deploy/github-pages/)
