# Astro Project: Link & Asset Path Usage Guide

This document is the source of truth for how every component, page, and asset should be linked or referenced in this project. Follow these rules to ensure all navigation and assets work in both local and GitHub Pages subdirectory deployments.

---

## 1. Favicon and Public Assets
- **Favicon and other public assets (in `public/`):**
  - Always use a hardcoded path with the deployment subdirectory.
  - Example:
    ```astro
    <link rel="icon" type="image/svg+xml" href="/google-gemini-codes/favicon.svg" />
    ```
  - Do NOT use `Astro.base` for favicon or public assets due to repeated issues.

## 2. Assets in `src/assets/`
- **Import using the `@` alias and use `{asset.src}`:**
  - Example:
    ```astro
    import logo from '@/assets/astro.svg';
    <img src={logo.src} alt="Logo" />
    ```

## 3. Internal Page Links (Navigation, Menus, etc.)
- **Always use a hardcoded subdirectory prefix for all internal links:**
  - Example:
    ```astro
    <a href="/google-gemini-codes/projects/astro-rebuild-guide/1">Astro Rebuild Guide</a>
    ```
  - Do NOT use `Astro.base` for links due to repeated issues with undefined values.
  - Do NOT use root-relative paths like `/projects/...`.

## 4. Dynamic Links in Components
- **When generating links dynamically (e.g., in a map):**
  - Always prefix with `/google-gemini-codes/`.
  - Example:
    ```astro
    <a href={`/google-gemini-codes/projects/${project.slug}/1`}>{project.data.title}</a>
    ```

## 5. Header and Footer Components
- **Header:**
  - Place favicon, meta tags, and navigation links here.
  - All links must use the hardcoded subdirectory prefix.
- **Footer:**
  - Place copyright, deployment info, and any global links.
  - All links must use the hardcoded subdirectory prefix.

## 6. Source of Truth
- The deployment subdirectory is `/google-gemini-codes`.
- If the deployment location changes, update this file and all relevant code.
- See `src/SITE_DEPLOYMENT_INFO.ts` for deployment settings.

---

## Quick Reference Table

| Component/File         | Link/Asset Type         | How to Reference                                    |
|-----------------------|-------------------------|-----------------------------------------------------|
| Layout.astro (favicon)| public asset            | `/google-gemini-codes/favicon.svg`                  |
| Any .astro (image)    | src/assets/ import      | `import img from '@/assets/...'`, then `{img.src}`  |
| Any .astro (nav link) | internal page           | `/google-gemini-codes/path/to/page`                 |
| Any .astro (dynamic)  | dynamic internal link   | `/google-gemini-codes/${slug}`                      |

---

**If you follow these rules, all links and assets will work in both local and GitHub Pages deployments.**

If you change the deployment subdirectory, update this file and all code accordingly.
