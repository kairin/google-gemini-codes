# AI Agent Instructions for Root `scripts/` Directory

This document provides specific guidelines for AI agents working with scripts located in the project's root `scripts/` directory. Please also refer to the main root `AGENTS.MD` for overall project guidelines.

## 📜 Overview

Scripts in this top-level `scripts/` directory typically handle project-wide tasks, development workflows, deployment actions, or pre-commit checks. Modifications to these scripts can affect how the project is built, tested, committed, or deployed.

**🔴 CAUTION IS ADVISED WHEN MODIFYING SCRIPTS IN THIS DIRECTORY. 🔴**

## 🔑 Key Files within the root `scripts/`

The following Key Files are located within this directory:

*   `scripts/check-protected-files.js`
*   `scripts/check-layout-integrity.js` (Ensures consistent page layout structure)

*(Human maintainers: Add any other critical scripts from this directory to the Key Files list if they become vital and stable, such as deployment scripts or complex pre-commit hooks. The upcoming `validate-file-hashes.js` will also be a key file here.)*

The Key Scripts in this directory are important for maintaining project policies and workflow integrity. They will be protected by an integrity checksum system.

## 💡 Directory Purpose & AI Guidelines

*   **Primary Purpose:** To house project-level automation scripts that are not directly part of the `src` build pipeline but support development, validation, or deployment. Examples include pre-commit hooks, deployment utilities, and global validation checks.
*   **AI Task Suitability:**
    *   **Generally Discouraged for AI:** Direct modification of Key Scripts (like `check-protected-files.js`, `check-layout-integrity.js`, or the upcoming integrity validation scripts) by AI is strongly discouraged unless under explicit human supervision.
    *   **Acceptable (with caution and clear specifications):**
        *   Assisting in the creation of *new* utility scripts for project tasks (e.g., a new linting script, a helper for a specific workflow) if requirements are clear.
        *   Making *minor, well-understood* modifications to non-key scripts.
    *   **Pre-commit Hooks:** Be especially careful when dealing with scripts tied to Git hooks (like those run by `npm run precommit`), as errors here can block development.

Ensure any new or modified scripts are robust, include error handling, and have clear purposes. If a script interacts with external services or the file system extensively, ensure its actions are idempotent where possible and well-documented.
