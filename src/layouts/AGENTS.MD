# AI Agent Instructions for `src/layouts/` Directory

This document provides specific guidelines for AI agents working within the `src/layouts/` directory. Please also refer to the root `AGENTS.MD` and `src/AGENTS.MD` for broader project-wide and source-level instructions.

## 📜 Overview

The `src/layouts/` directory contains Astro layout components that define the boilerplate structure for different types of pages across the site. Changes here can have a site-wide impact.

**🔴 EXTREME CAUTION IS ADVISED WHEN MODIFYING FILES IN THIS DIRECTORY. 🔴**

## 🔑 Key Files within `src/layouts/`

The following Key File is located within this directory:

*   `src/layouts/Layout.astro`

This file is fundamental to the entire site's structure. Modifications should only be made with a deep understanding of their impact and after discussion. It is protected by an integrity checksum system.

## 💡 Directory Purpose & AI Guidelines

*   **Primary Purpose:** To define the HTML structure (head, body, navigation, slots for content, footers) that wraps page content. This directory ensures a consistent look and feel.
*   **AI Task Suitability:**
    *   **Generally Discouraged for AI:** Direct modification of `Layout.astro` or other potential future layout files by AI is generally discouraged due to the high risk of breaking the site structure.
    *   **Acceptable (with caution):** If specifically instructed to create a *new, distinct* layout for a special section of the site, that might be acceptable, but the use of such a new layout would need careful integration.
    *   **Focus on Slots:** When developing page content that will use these layouts, AI should focus on providing content for the `<slot />` elements rather than attempting to modify the layout files themselves.

Your primary interaction with layouts should be utilizing them in page (`src/pages/`) files, not altering their definitions here.
