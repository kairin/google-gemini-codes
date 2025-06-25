# AI Agent Instructions for `src/scripts/` Directory

This document provides specific guidelines for AI agents working within the `src/scripts/` directory. This directory contains Node.js scripts that are typically part of the project's build process, content generation, or development utilities. Please also refer to the root `AGENTS.MD` and `src/AGENTS.MD`.

## 📜 Overview

Scripts in this directory are often critical for automating tasks, processing data, or ensuring content integrity. Modifications can significantly impact the build output or development workflow.

**🔴 EXTREME CAUTION IS ADVISED WHEN MODIFYING SCRIPTS IN THIS DIRECTORY. 🔴**

These scripts often interact with the file system, parse content, or generate data that other parts of the site rely on.

## 🔑 Key Files within `src/scripts/`

The following Key Files are located within this directory:

*   `src/scripts/generate-content-index.js`
*   `src/scripts/check-content-index.js`
*   `src/scripts/generate-trees.js`
*   `src/scripts/generate-file-relationships.js`

*(Human maintainers: Add any other critical scripts from this directory to the Key Files list if they become vital and stable.)*

These Key Scripts are fundamental to the project's data layer and build automation. They are protected by an integrity checksum system.

## 💡 Directory Purpose & AI Guidelines

*   **Primary Purpose:** To house automation scripts related to content processing, data generation, and build steps that are closely tied to the `src` code.
*   **AI Task Suitability:**
    *   **Generally Discouraged for AI:** Direct modification of the Key Scripts by AI is strongly discouraged unless explicitly instructed by a human developer who understands the full implications and the integrity check system.
    *   **Acceptable (with extreme caution and clear specifications):**
        *   Creating *new, standalone* utility scripts if the requirements are very clear and the script does not interfere with existing key scripts.
        *   Making *minor, well-defined, and well-understood* modifications to non-key scripts.
    *   **Focus on Analysis (if applicable):** AI might be helpful in analyzing these scripts for improvements or identifying potential issues, but changes should be human-reviewed and implemented.
    *   **README.md:** This directory contains a `README.md`. AI agents should consult it, and if making approved changes or additions, help update it.

Ensure any new or modified scripts include error handling, clear logging, and comments explaining their logic. Be mindful of dependencies and potential side effects on the project's data or build.
