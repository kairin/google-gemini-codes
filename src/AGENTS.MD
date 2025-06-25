# AI Agent Instructions for `src/` Directory

This document provides specific guidelines for AI agents working within the `src/` directory. Please also refer to the root `AGENTS.MD` for project-wide instructions.

## 📜 Overview

The `src/` directory contains all the primary source code for this Astro project, including layouts, components, pages, content, styles, and utilities. Many files within this directory tree are designated as **Key Files** and are critical to the site's functionality and structure.

**🔴 EXTREME CAUTION IS ADVISED WHEN MODIFYING ANY FILES IN `src/`, ESPECIALLY KEY FILES. 🔴**

## 🔑 Key Files within `src/`

The following Key Files (listed in the root `AGENTS.MD`) are located within the `src/` directory or its subdirectories:

*   `src/SITE_DEPLOYMENT_INFO.ts`
*   `src/content/config.ts`
*   `src/layouts/Layout.astro`
*   `src/components/SiteHead.astro`
*   `src/components/BaseLink.astro`
*   `src/pages/index.astro`
*   `src/pages/blog/[...blogslug].astro`
*   `src/pages/projects/[...slug].astro`
*   `src/scripts/generate-content-index.js`
*   `src/scripts/check-content-index.js`
*   `src/scripts/generate-trees.js`
*   `src/scripts/generate-file-relationships.js`
*   `src/styles/global.css`
*   `src/utils/getStaticPaths.js`
*   `src/utils/content-utils.js`

Please consult the `AGENTS.MD` files in specific subdirectories (e.g., `src/layouts/AGENTS.MD`, `src/pages/AGENTS.MD`) for more targeted instructions related to those areas.

## 💡 Directory Purpose & AI Guidelines

*   **Primary Purpose:** This directory houses the core application code.
*   **AI Task Suitability:**
    *   **Good for:** Creating new components in `src/components/`, new pages in `src/pages/`, new content files in `src/content/`, adding utility functions in `src/utils/`, or new styles in `src/styles/` (while being mindful of `global.css`'s key status).
    *   **Caution for:** Modifying existing key files, widespread refactoring without discussion, or altering core build/data generation scripts in `src/scripts/` without explicit instruction and understanding of the integrity check system.

Your adherence to these guidelines is crucial for maintaining project stability.
