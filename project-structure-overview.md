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
