# google-gemini-codes

| **Live Site**                                              | **Linking Guide**                       |
|:----------------------------------------------------------:|:----------------------------------------:|
| [https://kairin.github.io/google-gemini-codes/](https://kairin.github.io/google-gemini-codes/) | [LINKING_GUIDE.md](./LINKING_GUIDE.md) |

---

## Purpose & Objectives

This repository is dedicated to building, automating, and maintaining a modern, scalable Astro site for sharing technical projects, guides, and blog posts. The goals are:

- **Automation:** Streamline content management and deployment with minimal manual intervention.
- **Scalability:** Support multi-page projects, blogs, and future content types with ease.
- **Robust Navigation:** Ensure all internal links and navigation work reliably in both local and GitHub Pages subdirectory deployments.
- **Single Source of Truth:** Centralize configuration, deployment, and linking logic for maintainability.
- **CI/CD:** Use GitHub Actions for automated builds and deployments.
- **Modern Design:** Leverage Tailwind CSS and Astro best practices for a clean, accessible UI.

---

## Content Index & Section Navigation (Automated)

- Each markdown file is parsed and output as a JSON file in `src/data/content-index/`.
- The JSON includes a `sections` array, with each section containing:
  - `title`: The first heading after a `<!-- PAGEBREAK -->` (or a fallback title)
  - `index`: Section index (0-based)
  - `anchor`: A unique anchor for navigation (e.g., `section-1`)
  - `start`: Character offset in the markdown body for direct navigation/rendering
- All navigation and section menus in components/pages are now generated from this JSON data.
- To add a new section, insert `<!-- PAGEBREAK -->` in your markdown. The next heading will be used as the section title.
- Components like `SectionedMarkdown.astro` and navigation menus are fully DRY and data-driven.

## Updating/Adding Content

- Add markdown files to `src/content/projects/` or `src/content/blog/`.
- Run the build or the content index script to regenerate JSON files.
- All navigation, linking, and section logic will update automatically.

## Architecture Overview

This site is built for maximum DRYness and maintainability. All navigation, asset, and content logic is centralized and automated using reusable Astro components. Key architectural features:

- **Centralized Internal Linking:** All internal links use the `<BaseLink>` component, which automatically handles the deployment subdirectory and prevents broken links.
- **Reusable Components:** Navigation, cards, lists, meta/head, and sectioned markdown are all handled by dedicated components.
- **Sectioned Markdown:** Multi-section guides and projects are written as a single Markdown file, split into pages using the `<!-- PAGEBREAK -->` delimiter and rendered with the `SectionedMarkdown.astro` component.
- **Automated Sitemap:** The sitemap page is generated using DRY list components and always reflects the current content.
- **Strict Content Schemas:** All content (projects, blogs) is validated against schemas in `src/content/config.ts`.
- **Global Layout:** Header, footer, and meta tags are managed in `Layout.astro` and `SiteHead.astro`.

---

## DRY Component Reference & Usage

| Component                | Purpose                                      | Example Usage                                                                 |
|--------------------------|----------------------------------------------|-------------------------------------------------------------------------------|
| `BaseLink.astro`         | Centralized internal link logic              | `<BaseLink href="/projects/astro-rebuild-guide/1">Astro Rebuild Guide</BaseLink>` |
| `SitemapList.astro`      | DRY rendering of any list of links           | `<SitemapList items={[{ title: 'Home', url: '/' }]} title="Main Links" />`   |
| `ProjectCard.astro`      | DRY project card for project lists           | `<ProjectCard project={project} />`                                           |
| `BlogCard.astro`         | DRY blog card for blog lists                 | `<BlogCard post={post} />`                                                    |
| `SectionedMarkdown.astro`| Render multi-section markdown with nav       | `<SectionedMarkdown rawContent={rawContent} sectionIndex={sectionIndex} baseUrl={baseUrl} />` |
| `SiteHead.astro`         | Consistent meta, favicon, deployment info    | `<SiteHead title="Page Title" />`                                            |
| `MarkdownPage.astro`     | Standardized single-page markdown rendering  | `<MarkdownPage content={content} />`                                          |

**Tip:** Always use these components for their intended purpose. If you need to render a list of links, use `SitemapList.astro`. For any internal navigation, always use `BaseLink.astro`.

---

## Content & Linking Rules

- **All internal links** must use `<BaseLink>`. Never hardcode root-relative paths or use `Astro.base` for navigation.
- **Favicon and public assets** must use a hardcoded path with the deployment subdirectory (see `LINKING_GUIDE.md`).
- **Images in `src/assets/`** must be imported and referenced as `{img.src}`.
- **Content schemas** are defined in `src/content/config.ts` and enforced for all projects/blogs.
- **Sectioned markdown** uses `<!-- PAGEBREAK -->` as the delimiter for splitting content into pages.
- **See [`LINKING_GUIDE.md`](./LINKING_GUIDE.md)** for the canonical rules and examples for all linking and asset usage.

---

## How to Add Content

### Add a New Project
1. Add a markdown file to `src/content/projects/` with required frontmatter (see schema in `src/content/config.ts`).
2. Use `<!-- PAGEBREAK -->` to split into multiple sections/pages if needed.
3. The project will automatically appear in the homepage, sitemap, and navigation.

### Add a New Blog Post
1. Add a markdown file to `src/content/blog/` with required frontmatter (see schema in `src/content/config.ts`).
2. The post will automatically appear in the blog index and sitemap.

---

## Component Usage Examples

### Internal Link
```astro
<BaseLink href="/projects/astro-rebuild-guide/1">Astro Rebuild Guide</BaseLink>
```

### Sectioned Markdown
```astro
<SectionedMarkdown rawContent={rawContent} sectionIndex={sectionIndex} baseUrl={baseUrl} />
```

### Project Card
```astro
<ProjectCard project={project} />
```

---

## Contributing

- **Always use DRY components** for navigation, cards, lists, and content rendering.
- **Update documentation** (README, LINKING_GUIDE, etc.) if you change navigation, linking, or content logic.
- **If you change the deployment subdirectory**, update all relevant files and documentation.
- **Keep the codebase maintainable** by centralizing logic and avoiding duplication.

---

For technical details, linking rules, and configuration, see [LINKING_GUIDE.md](./LINKING_GUIDE.md).
