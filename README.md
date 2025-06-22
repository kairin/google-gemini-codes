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

## Section Navigation (DRY & Automated)

- All project and blog links now use `/slug/1` to point to the first section, ensuring robust, DRY navigation.
- Section navigation menus and all navigation components/pages are generated from the `sections` array in each JSON file.
- To link to a specific section, use `/projects/[slug]/[sectionNumber]` or `/blog/[slug]/[sectionNumber]`.
- All navigation, cards, sitemap, and menus are now fully automated and DRY.

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

## Content Index Generation & Automation

- The script `src/scripts/generate-content-index.js` runs automatically before every build.
- **File Discovery:** All markdown files in `src/content/projects/` and `src/content/blog/` are discovered.
- **Content Processing:**
  - Each file's frontmatter and markdown body are read.
  - File stats (created/modified times) are retrieved.
  - The type (project/blog) and slug are determined from the file path.
- **Section Extraction:**
  - The markdown body is split by `<!-- PAGEBREAK -->`.
  - Each section's title (from the first heading), index, anchor, and start offset are extracted for robust navigation.
- **Publication Date Automation:**
  - If `pubDate` is missing in frontmatter, it is set to the file's creation date (or now).
  - Both UTC (`pubDate`, ISO string) and local (`pubDateLocal`, local string) versions are stored in the JSON.
- **History Tracking:**
  - A `.history.json` file is kept for each item in `src/data/content-index/history/`, tracking all previous `pubDate` values and when they were set/updated (both UTC and local).
  - The history is updated only if the pubDate changes.
- **JSON Output:**
  - A JSON file is written for each content item in `src/data/content-index/`, containing all metadata, section info, pubDate, local time, and history.
- **Usage in UI:**
  - All cards and navigation lists show the local time by default, and users can hover to see both local and UTC (ISO) time in a tooltip—across project cards, blog cards, and the sitemap.

This ensures all content is indexed, sectioned, and has robust, DRY metadata for use in your Astro site. All logic is automated and requires no manual intervention for new or updated content.

---

## Interactive File Tree Map & Site Structure Visualization

- The build process now generates a `site-tree.json` file in `src/data/` after every build, representing the directory structure of `src`, `scripts`, `public`, `data`, and `dist`.
- This is done by the script `src/scripts/generate-trees.js`, which uses the `tree` command to output a JSON representation of the file structure.
- The file tree is visualized on the `/tree` page using a React component (`TreeMap.jsx`), which is loaded in Astro using the React integration.
- **Features:**
  - Expand/collapse folders interactively.
  - Ready for future features: highlight file types, show file details, visualize imports/links, search/filter, etc.
  - Easily reusable: import and use `<TreeMap client:load tree={siteTree} />` in any Astro page.
- **How to extend:**
  - To visualize file relationships (e.g., imports, links), enhance the `generate-trees.js` script to analyze file contents and output relationship data.
  - Update `TreeMap.jsx` to render relationship lines/arrows, tooltips, or context menus as needed.
- **Integration:**
  - Astro is configured with `@astrojs/react` for seamless React component usage.
  - All dependencies (`react`, `react-dom`, `prop-types`, `@astrojs/react`) are managed in `package.json`.

## Example Usage

To add the interactive tree map to any page:
```astro
import TreeMap from '@/components/TreeMap.jsx';
import siteTree from '@/data/site-tree.json';
<TreeMap client:load tree={siteTree} />
```

The `/tree` page is already set up as a demo.

---

## Contributing

- **Always use DRY components** for navigation, cards, lists, and content rendering.
- **Update documentation** (README, LINKING_GUIDE, etc.) if you change navigation, linking, or content logic.
- **If you change the deployment subdirectory**, update all relevant files and documentation.
- **Keep the codebase maintainable** by centralizing logic and avoiding duplication.

---

For technical details, linking rules, and configuration, see [LINKING_GUIDE.md](./LINKING_GUIDE.md).
