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

## 2. Assets in `src/data/`
- **Import using the `@` alias and use as modules:**
  - Example:
    ```js
    import projectIndex from '@/data/content-index/project-astro-rebuild-guide.json';
    ```
- **Per-content JSON index files:**
  - These are generated in `src/data/content-index/` by the script at `src/scripts/generate-content-index.js`.
  - All reusable logic is in `src/utils/content-utils.js`.
  - Import them as modules (not as content collections).

## 3. Internal Page Links (Navigation, Menus, etc.)
- **Always use a centrally managed component for all internal links:**
  - Use a `<BaseLink>` component that automatically prefixes with `/google-gemini-codes`.
  - Example:
    ```astro
    <BaseLink href="/projects/astro-rebuild-guide/1">Astro Rebuild Guide</BaseLink>
    ```
  - Do NOT use `Astro.base` or hardcode root-relative paths in individual components/pages.

## 4. Dynamic Links in Components
- **When generating links dynamically (e.g., in a map):**
  - Always use the `<BaseLink>` component for each link.
  - Example:
    ```astro
    {allProjects.map(project => (
      <BaseLink href={`/projects/${project.slug}/1`}>{project.data.title}</BaseLink>
    ))}
    ```

## 5. Header and Footer Components
- **Header:**
  - Place favicon, meta tags, and navigation links here.
  - All links must use the `<BaseLink>` component.
- **Footer:**
  - Place copyright, deployment info, and any global links.
  - All links must use the `<BaseLink>` component.

## 6. Source of Truth
- The deployment subdirectory is `/google-gemini-codes`.
- If the deployment location changes, update this file and all relevant code.
- See `src/SITE_DEPLOYMENT_INFO.ts` for deployment settings.
- All navigation, header, and footer logic should be centralized in their respective components in `src/components/`.
- Never repeat base path logic—always use a component or utility.

---

## Quick Reference Table

| Component/File         | Link/Asset Type         | How to Reference                                    |
|-----------------------|-------------------------|-----------------------------------------------------|
| Layout.astro (favicon)| public asset            | `/google-gemini-codes/favicon.svg`                  |
| Any .astro (image)    | src/assets/ import      | `import img from '@/assets/...'`, then `{img.src}`  |
| Any .astro (nav link) | internal page           | `<BaseLink href="/projects/...">...</BaseLink>`    |
| Any .astro (dynamic)  | dynamic internal link   | `<BaseLink href={`/projects/${slug}`}>...</BaseLink>`|

---

## Why Use a Component for Links?

- **Encapsulation:** All base path logic is handled in one place.
- **Consistency:** No more broken links due to missed prefixes or config changes.
- **Maintainability:** If the deployment base changes, update only the component.
- **Clarity:** Contributors always know how to create links—use `<BaseLink>`.

---

## Example: `src/components/BaseLink.astro`

```astro
---
const { href, ...props } = Astro.props;
const BASE = '/google-gemini-codes';
const fullHref = href.startsWith('/') ? `${BASE}${href}` : href;
---
<a href={fullHref} {...props}><slot /></a>
```

**Usage:**
```astro
<BaseLink href="/projects/astro-rebuild-guide/1">Astro Rebuild Guide</BaseLink>
```

---

**If you follow these rules, all links and assets will work in both local and GitHub Pages deployments.**

If you change the deployment subdirectory, update this file and all code accordingly.
