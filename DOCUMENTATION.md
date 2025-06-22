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
- For architecture, see this file and `/docs`.
- For linking/asset rules, see [LINKING_GUIDE.md](./LINKING_GUIDE.md).
- Document new errors in Troubleshooting and/or open an issue.
