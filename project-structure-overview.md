# Project Structure Overview

This project contains several important directories and files. Each group serves a specific purpose in the development, configuration, and deployment of your site.

## Main Groups

- [:zap: .astro](./astro-internals.md): Astro internal cache and metadata
- [:octocat: .github](./github-config.md): GitHub configuration for issues and workflows
- [:gear: .vscode](./vscode-config.md): Visual Studio Code workspace settings
- [:card_index: data/content-index](./data-content-index.md): Generated JSON indexes for content
- [:package: dist](./dist-structure.md): Built static site output

Click the links above for detailed explanations of each group.

---

## Quick Reference Table

| Icon | Folder/File                | Purpose                                                                                 |
|------|----------------------------|-----------------------------------------------------------------------------------------|
| ⚡   | `.astro/`                  | Astro’s internal cache, content schemas, and type definitions.                          |
| 🐙   | `.github/`                 | GitHub issue templates and CI/CD workflows.                                             |
| ⚙️   | `.vscode/`                 | VS Code settings, tasks, and recommended extensions.                                    |
| 🗂️   | `data/content-index/`      | Generated JSON indexes for fast content lookup and search.                              |
| 📦   | `dist/`                    | The built static site, ready for deployment.                                            |
| 📁   | `public/`                  | Static assets (e.g., favicon) copied directly to the build output.                      |
| 📝   | `src/`                     | All editable source code: content, components, layouts, pages, scripts, styles, utils.  |
| 🛠️   | `scripts/`                 | Custom scripts for content indexing, deployment, and file protection.                   |
| 📦   | `node_modules/`            | Installed npm packages (managed by npm).                                                |
| 📄   | `README.md` & docs         | Project documentation and guides.                                                       |

---

## Project Goals

- **Separation of Concerns:** Each folder has a clear responsibility (content, components, scripts, data, etc.).
- **Automation:** Scripts automate content indexing, validation, and deployment, reducing manual work and errors.
- **Scalability:** Modular components and dynamic routes make it easy to add new content and features.
- **Collaboration:** VS Code and GitHub configs ensure a smooth workflow for all contributors.
- **Performance:** Pre-generated JSON indexes and site trees enable fast, dynamic features on a static site.

---

## 🛡️ Key File Integrity & AI Agent Guidance

To ensure project stability, certain **Key Files** critical to the site's structure, configuration, and functionality are (or will be) protected by an integrity checksum system.
- **AI Agents:** Please refer to the root `AGENTS.MD` and scoped `AGENTS.MD` files (e.g., in `src/`, `src/layouts/`) for specific instructions on handling these key files. Extreme caution is advised.
- **Developers:** Modifying a Key File will require updating an integrity manifest (`file-integrity-manifest.json`) to ensure changes are deliberate and authorized. This system (`npm run validate-integrity`) is integrated into `precommit` and `prebuild` hooks.
- The list of Key Files is maintained in the root `AGENTS.MD` and used by the integrity scripts.

### How the Integrity Check Works
- A manifest file, `file-integrity-manifest.json`, located at the project root, stores a list of all Key Files and their corresponding SHA256 checksums (hashes).
- The `npm run validate-integrity` script (found in `scripts/validate-file-hashes.js`) is triggered automatically before commits and builds.
- This script recalculates the hash for each Key File and compares it against the hash stored in the manifest.
- If any file has been modified (its hash changes) or is missing, the script will fail, printing an error and preventing the commit or build.

### Workflow for Modifying a Key File
If you need to make a **deliberate and approved** change to a Key File:
1.  **Make your changes** to the Key File(s) as needed.
2.  **Update the manifest:** Run the command `npm run generate-hashes`. This will execute `scripts/generate-file-hashes.js`, which recalculates the hashes for all Key Files and updates `file-integrity-manifest.json`.
3.  **Commit changes:** Add both the modified Key File(s) AND the updated `file-integrity-manifest.json` to your commit.
    ```bash
    git add path/to/your/keyfile.astro file-integrity-manifest.json
    git commit -m "feat: Updated Key File X and refreshed integrity manifest"
    ```
4.  The pre-commit hook will now run `npm run validate-integrity`. Since the manifest matches the new state of the Key File, the check will pass.

**What if the integrity check fails?**
- The error message from `validate-integrity` will indicate which file(s) caused the failure (either a hash mismatch or a missing file).
- **If the change was unintentional:** Revert the changes to the specified Key File(s) to match their state in the last valid commit.
- **If the change was intentional but you forgot to update the manifest:** Run `npm run generate-hashes`, then add the updated `file-integrity-manifest.json` to your commit and try committing again.
