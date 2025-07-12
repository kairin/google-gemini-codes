# Project Documentation

## Overview
This project is a modern, DRY, scalable Astro site for technical projects, guides, and blogs, with robust automation for navigation, content, and asset management. It features:
- Automated content indexing and section extraction
- Per-content JSON files for robust, DRY navigation and rendering
- Automated pubDate (UTC and local) and history tracking
- Interactive, React-based file tree map for site structure visualization
- Full integration with Astro and React for reusable, intelligent components

## Content Indexing & Automation
- All markdown files in `src/content/projects/` and `src/content/blog/` are indexed by `src/scripts/generate-content-index.js`.
- Each file is parsed for frontmatter, body, and section breaks (`<!-- PAGEBREAK -->`).
- A JSON file is generated for each item in `src/data/content-index/`, including:
  - Metadata (title, description, tags, etc.)
  - Section info (titles, anchors, offsets)
  - pubDate (UTC ISO) and pubDateLocal (local string)
  - pubDateHistory (all previous pubDates and updates)
  - File stats (created/modified)
  - Full markdown body
- A `.history.json` file is kept for each item, tracking all pubDate changes.

## Navigation & Rendering
- All navigation, cards, and section menus are generated from the JSON data.
- Section navigation is fully automated and DRY, using the `sections` array.
- Internal links and asset references are managed by reusable components (e.g., `BaseLink.astro`).
- Dynamic routes use the JSON for static path generation and robust rendering.

## File Tree Visualization
- The script `src/scripts/generate-trees.js` generates a `site-tree.json` file after every build, representing the directory structure.
- The React component `TreeMap.jsx` visualizes this tree interactively on the `/tree` page.
- Folders can be expanded/collapsed, and the component is ready for more advanced features (relationship lines, search, etc.).
- Easily reusable in any Astro page with React integration.

## Extending the System
- To visualize file relationships (e.g., imports, links), enhance the tree generation script to analyze file contents and output relationship data.
- Update the React component to render these relationships visually.
- All logic is automated and requires no manual intervention for new or updated content.

## How to Add Content
- Add markdown files to `src/content/projects/` or `src/content/blog/`.
- The build process will automatically generate/update all JSON, history, and tree files.
- All navigation, linking, and section logic will update automatically.

## Dependencies
- Astro
- React, ReactDOM, PropTypes
- @astrojs/react
- tailwindcss
- marked, gray-matter, glob

## For Contributors
- See `README.md` for quickstart and usage.
- See `SPEC.md` for the application's functional and non-functional requirements.
- See this file for architecture and automation details.

## GitHub Actions: Self-Hosted Runner Setup

To avoid incurring costs from GitHub-hosted runners, this project uses a self-hosted runner with a custom label (e.g. `Linux-Ubuntu`).

- See the full guide: [`/self-hosted-runner-guide`](/self-hosted-runner-guide)
- The workflow file is `.github/workflows/deploy.yml` and uses:
  ```yaml
  runs-on: [self-hosted, Linux-Ubuntu]
  ```
- Register and start your runner before running workflows.

## Contributor Quickstart
- Clone the repo, install dependencies, and run `npm run dev` to start local development.
- Use VS Code tasks or `npm run build` to trigger all automation and validation scripts.
- Add markdown files to `src/content/projects/` or `src/content/blog/`—all indexing and navigation is automated.
- Follow [LINKING_GUIDE.md](./LINKING_GUIDE.md) for all internal links and asset references.
- See the Troubleshooting section below for common issues.

## Troubleshooting & Common Errors
- **Site tree or relationships not loading:**
  - Run the generator scripts or a full build to refresh `site-tree.json` and `file-relationships.json`.
  - Check for JSON syntax errors if you edited files manually.
- **Dynamic route errors:**
  - Ensure all content index JSON files are present and valid.
  - Check markdown frontmatter for required fields.
- **Git/large file issues:**
  - See `.gitignore` and `PROTECTED_FILES.txt` for file protection rules.
  - Use documented git cleanup steps if needed.
- **Other errors:**
  - See `/docs`, `README.md`, or open an issue for help.

## How to Get Help
- Read `/docs` and this file for setup and usage.
- See [README.md](./README.md) for quickstart.
- See [SPEC.md](./SPEC.md) for the application's functional and non-functional requirements.
- For architecture, see this file and `/docs`.
- For linking/asset rules, see [LINKING_GUIDE.md](./LINKING_GUIDE.md).
- Document new errors in Troubleshooting and/or open an issue.

## Integrating Interactive Components (React, etc.) and Maintaining Layout Structure

This project enforces a consistent page structure: a top header (navigation), a main content area (middle body), and a bottom footer. This is primarily managed by the `src/layouts/Layout.astro` component.

To ensure this structure is maintained and to provide a clear way to add complex or interactive UI elements (e.g., using React, Vue, Svelte, or other client-side frameworks):

1.  **Use the Main Layout:** All pages created under `src/pages/` should use the primary `Layout.astro` component. The `scripts/check-layout-integrity.js` script (part of the pre-commit hook) will verify this.

2.  **Content Goes in the Slot:** The "middle body" of any page is rendered via the `<slot />` tag within `Layout.astro`. All page-specific content, including text, images, Astro components, and framework components (like React components), must be placed *inside* the `<Layout>...</Layout>` tags on a page.

3.  **Embedding Framework Components:**
    *   Framework components (e.g., a React component like `MyInteractiveWidget.jsx`) should be imported into your Astro components or directly into your Astro page files (`.astro`).
    *   These components are then used within the Astro component's template, which itself will be part of the content passed to the main `<slot />`.
    *   **Example:**
        ```astro
        // src/pages/my-interactive-page.astro
        ---
        import Layout from '@/layouts/Layout.astro';
        import MyInteractiveWidget from '@/components/MyInteractiveWidget.jsx'; // A React component
        import RegularAstroComponent from '@/components/RegularAstroComponent.astro';
        ---
        <Layout title="My Interactive Page">
          <h1>Welcome to my interactive page!</h1>
          <RegularAstroComponent />
          <MyInteractiveWidget client:load /> {/* client directive for interactivity */}
          <p>Some more content here...</p>
        </Layout>
        ```

4.  **Do Not Modify Core Layout for Content:** Avoid directly altering `src/layouts/Layout.astro` to insert page-specific interactive elements. The `Layout.astro` component is for the global site structure (navigation, main slot, footer). Page-specific content, no matter how complex, belongs in the pages themselves or in components imported by those pages, ultimately rendering within the `<slot />`.

By following these guidelines, we can ensure the site maintains a consistent structural integrity while still allowing for rich, interactive user experiences. The automated checks will help prevent accidental breakage of the main layout.
