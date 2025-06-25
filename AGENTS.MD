# AI Agent Instructions for `google-gemini-codes` Repository

Welcome, AI Agent! This document provides guidelines for assisting with development in this repository. Your cooperation is appreciated to maintain project stability and integrity.

## 📜 Overview

This project utilizes a system to protect certain **Key Files** from unintentional modifications. These files are critical to the core functionality, structure, configuration, or build processes of the website.

**🔴 EXTREME CAUTION IS ADVISED WHEN MODIFYING KEY FILES. 🔴**

These files are, or will soon be, monitored by an integrity checksum system (hash validation). Any changes to these files will require a corresponding update to an integrity manifest file. Accidental or unapproved changes will likely block commits or builds.

## 🔑 Key Files

The following files are designated as **Key Files**. Please avoid making direct, unsolicited changes to them. If you believe a change is necessary, please highlight it for human review and discussion. Any deliberate, approved changes must follow the project's workflow for updating the integrity manifest (details will be in `DOCUMENTATION.md` once Phase 1 of the integrity system is complete).

### Core Configuration & Setup:
1.  `astro.config.mjs`
2.  `package.json`
3.  `tsconfig.json`
4.  `src/SITE_DEPLOYMENT_INFO.ts`
5.  `src/content/config.ts`

### Core Layout & Structure:
6.  `src/layouts/Layout.astro`
7.  `src/components/SiteHead.astro`

### Critical Reusable Components:
8.  `src/components/BaseLink.astro`
    *(Human maintainers: Review and expand this list if other components become critical and stable.)*

### Core Page Templates/Entry Points:
9.  `src/pages/index.astro`
10. `src/pages/blog/[...blogslug].astro`
11. `src/pages/projects/[...slug].astro`

### Key Scripts (Automation & Build):
12. `src/scripts/generate-content-index.js`
13. `src/scripts/check-content-index.js`
14. `src/scripts/generate-trees.js`
15. `src/scripts/generate-file-relationships.js`
16. `scripts/check-protected-files.js` (Root level script)

### Global Styles:
17. `src/styles/global.css`

### Important Utilities:
18. `src/utils/getStaticPaths.js`
19. `src/utils/content-utils.js`

## 📂 Scoped Instructions

More specific instructions for certain directories may be found in `AGENTS.MD` files within those subdirectories (e.g., `src/layouts/AGENTS.MD`). Please adhere to those as well. If instructions conflict, the more specific (deeper nested) `AGENTS.MD` file usually takes precedence for files within its scope.

## 💡 General Guidelines for AI Agents

*   **Prioritize Non-Invasive Changes:** When possible, suggest additions or modifications to non-key files, or new files, to achieve goals.
*   **Seek Clarification:** If a task seems to require modification of a key file, please ask for explicit confirmation or suggest alternative approaches.
*   **Content Generation:** You are encouraged to help generate content (Markdown for blogs/projects), new components (that are not replacements for key components unless specified), or utility scripts, provided they don't alter key files without approval.
*   **Adhere to Project Structure:** Follow the existing project structure and conventions when adding new files.
*   **Testing:** If you help write code that can be tested, please also help write the tests.

Thank you for your assistance in maintaining a high-quality and stable codebase!
