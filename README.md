# google-gemini-codes

| **Live Site**                                              | **Linking Guide**                       |
|:----------------------------------------------------------:|:----------------------------------------:|
| [https://kairin.github.io/google-gemini-codes/](https://kairin.github.io/google-gemini-codes/) | [LINKING_GUIDE.md](./LINKING_GUIDE.md) |

---

## Purpose & Objectives

This repository is dedicated to building, automating, and maintaining a modern, scalable Astro site for sharing technical projects, guides, and blog posts. The goals are:

- **Automation:** Streamline content management and deployment with minimal manual intervention.
- **Scalability:** Support multi-page projects, blogs, and future content types with ease.
- **Robust Navigation:** Ensure all internal links and navigation work reliably in both local and GitHub Pages subdirectory deployments.
- **Single Source of Truth:** Centralize configuration, deployment, and linking logic for maintainability.
- **CI/CD:** Use GitHub Actions for automated builds and deployments.
- **Modern Design:** Leverage Tailwind CSS and Astro best practices for a clean, accessible UI.

## What You'll Find Here

- **Content Collections:** For projects and blogs, with schema validation.
- **Multi-Page Project Support:** Write long-form guides as a single Markdown file, split into pages.
- **Automated Navigation:** Dynamic menus and navigation based on content structure.
- **Centralized Configuration:** All deployment, linking, and content rules are documented and referenced.
- **CI/CD Workflow:** Automated deployment to GitHub Pages.

## How to Use This Repo

- Start by reading the [LINKING_GUIDE.md](./LINKING_GUIDE.md) for all rules on linking and asset usage.
- See `src/SITE_DEPLOYMENT_INFO.ts` for deployment and routing settings.
- Content schemas are in `src/content/config.ts`.
- Build and deploy using the provided npm scripts and GitHub Actions workflow.

## Contributing

If you add new content types, change the deployment location, or update navigation logic, update the relevant source-of-truth files and this README.

---

For technical details, linking rules, and configuration, see [LINKING_GUIDE.md](./LINKING_GUIDE.md).
