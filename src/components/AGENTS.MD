# AI Agent Instructions for `src/components/` Directory

This document provides specific guidelines for AI agents working within the `src/components/` directory. Please also refer to the root `AGENTS.MD` and `src/AGENTS.MD` for broader project-wide and source-level instructions.

## 📜 Overview

The `src/components/` directory contains reusable Astro components and potentially UI framework components (e.g., React .jsx) that are used to build the user interface of the website.

**CAUTION IS ADVISED WHEN MODIFYING EXISTING COMPONENTS, ESPECIALLY KEY COMPONENTS.**

## 🔑 Key Files within `src/components/`

The following Key Files are located within this directory:

*   `src/components/SiteHead.astro`
*   `src/components/BaseLink.astro`

*(Human maintainers: Review and update this list if other components become critical, stable, and require version protection.)*

Modifications to these key components should be done with care as they are protected by an integrity checksum system. Changes to other components should also be handled carefully to avoid breaking pages where they are used.

## 💡 Directory Purpose & AI Guidelines

*   **Primary Purpose:** To house modular UI building blocks. This promotes reusability and maintainability.
*   **AI Task Suitability:**
    *   **Excellent for AI:** Creating *new* components based on specifications is a highly suitable task for AI.
    *   **Acceptable (with caution):** Assisting in refactoring existing non-key components, adding features to non-key components, or creating variations of existing components.
    *   **Discouraged for Key Components:** Direct, unsolicited modification of the Key Components listed above by AI is generally discouraged. These are foundational and changes require careful consideration and updates to the integrity manifest.
    *   **Consider Dependencies:** When modifying any component, AI should be mindful of where it's used and the potential impact of changes on those pages or other components.

When creating new components, please follow existing coding styles and patterns found in this directory. Ensure components are well-structured and clearly purposed.
