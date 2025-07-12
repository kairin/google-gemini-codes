# AI Agent Instructions for `src/pages/` Directory

This document provides specific guidelines for AI agents working within the `src/pages/` directory. Please also refer to the root `AGENTS.MD` and `src/AGENTS.MD` for broader project-wide and source-level instructions.

## 📜 Overview

The `src/pages/` directory contains Astro files (`.astro`, `.md`, etc.) that define the actual pages and routes of the website. Files in this directory are responsible for fetching data, using layouts, and incorporating components to construct what the user sees.

**CAUTION IS ADVISED WHEN MODIFYING EXISTING PAGE FILES, ESPECIALLY KEY PAGE TEMPLATES.**

## 🔑 Key Files within `src/pages/`

The following Key Files (which often serve as templates or critical entry points) are located within this directory:

*   `src/pages/index.astro` (Homepage)
*   `src/pages/blog/[...blogslug].astro` (Template for all blog posts)
*   `src/pages/projects/[...slug].astro` (Template for all project pages)

*(Human maintainers: Review and update this list if other specific pages become critical and require version protection.)*

Modifications to these key page files should be done with care as they are protected by an integrity checksum system. Changes to other pages should also be handled carefully.

## 💡 Directory Purpose & AI Guidelines

*   **Primary Purpose:** To define the site's routes and the content structure for each page. This is where layouts and components are assembled.
*   **AI Task Suitability:**
    *   **Excellent for AI:** Creating *new* static or dynamic pages based on specifications, using existing layouts and components.
    *   **Good for AI:** Populating pages with content, fetching data for pages, and structuring the main content area of pages.
    *   **Acceptable (with caution):** Modifying existing non-key pages to add new sections or components.
    *   **Discouraged for Key Page Templates:** Direct, unsolicited modification of the Key Page Templates listed above by AI is generally discouraged. These define how major sections of content are rendered, and changes require careful consideration and updates to the integrity manifest.
    *   **Layout Usage:** All pages should utilize the main `src/layouts/Layout.astro` or other approved layouts. The `check-layout-integrity.js` script (from a previous task) also helps enforce this.

When creating new pages, ensure they correctly import and use layouts, and that components are integrated appropriately. Follow patterns from existing pages for data fetching and structuring.
