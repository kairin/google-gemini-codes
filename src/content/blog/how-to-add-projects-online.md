---
title: "How to Add New Projects Online: GitHub Actions & Static Sites 🛠️✨"
description: "A step-by-step guide to enabling user-generated content for Astro + GitHub Pages using GitHub Issues, Actions, and DRY components."
pubDate: 2025-06-22
updatedDate: 2025-06-22
heroImage: "/google-gemini-codes/assets/automation.svg"
tags:
  - astro
  - github
  - automation
  - static-site
  - ci/cd
author: "Kairin"
categories:
  - Guides
  - Automation
---

# How to Add New Projects Online: GitHub Actions & Static Sites <span style="font-size:2em;vertical-align:middle;">🛠️✨</span>

> Enable user-generated content for your Astro + GitHub Pages site—no backend required! <span style="font-size:1.5em;vertical-align:middle;">🚀</span>

---

## Why Can't Static Sites Edit Content Online? <span style="font-size:1.5em;vertical-align:middle;">🤔</span>

![Static vs Dynamic](https://raw.githubusercontent.com/kairin/google-gemini-codes/main/src/assets/static-vs-dynamic.svg)

Static sites (like Astro + GitHub Pages) are fast and secure, but they can't write new files from the browser. All content must be added as markdown files in your repo.

---

## Solution: GitHub-Powered Content Creation <span style="font-size:1.5em;vertical-align:middle;">📝</span>

You can let users propose new projects or blog posts by combining:

- <span style="font-size:1.3em;vertical-align:middle;">🟦</span> A button on your site that opens a pre-filled GitHub Issue or Pull Request template
- <span style="font-size:1.3em;vertical-align:middle;">🤖</span> A GitHub Actions workflow that turns those issues/PRs into markdown files
- <span style="font-size:1.3em;vertical-align:middle;">🧩</span> Your existing DRY Astro components to render the new content

---

## Step-by-Step: Add a "New Project" Button <span style="font-size:1.5em;vertical-align:middle;">➕</span>

### 1. Add a Button to Your Site

```astro
<BaseLink href="https://github.com/kairin/google-gemini-codes/issues/new?template=new-project.md">➕ Add New Project</BaseLink>
```

This opens a GitHub Issue with a template for new project details.

### 2. Create a GitHub Issue Template <span style="font-size:1.2em;vertical-align:middle;">📝</span>

Add `.github/ISSUE_TEMPLATE/new-project.md`:

```markdown
---
title: "[Project] <Project Title>"
labels: ["new project"]
---

**Project Title:**

**Description:**

**Tags:**

**Hero Image URL (optional):**

**Sections (optional, use <!-- PAGEBREAK --> to split):**
```

### 3. Automate with GitHub Actions <span style="font-size:1.2em;vertical-align:middle;">🤖</span>

Set up a workflow to convert new issues into markdown files in `src/content/projects/` and trigger a site rebuild.

---

## Visual Workflow <span style="font-size:1.5em;vertical-align:middle;">🖼️</span>

![Workflow Diagram](https://raw.githubusercontent.com/kairin/google-gemini-codes/main/src/assets/gh-actions-workflow.svg)

---

## How It Looks in Practice <span style="font-size:1.5em;vertical-align:middle;">👀</span>

- Users click "Add New Project" and fill out a form on GitHub
- A maintainer (or bot) reviews and merges
- The new project appears on your site after the next deploy

---

## Bonus: Use All DRY Components <span style="font-size:1.5em;vertical-align:middle;">🧩</span>

- **Navigation:** All links use `<BaseLink>` <span style="font-size:1.3em;vertical-align:middle;">🔗</span>
- **Project Cards:** New projects appear automatically in `<ProjectCard>` lists <span style="font-size:1.3em;vertical-align:middle;">🗂️</span>
- **Sitemap:** The sitemap updates via `<SitemapList>` <span style="font-size:1.3em;vertical-align:middle;">🗺️</span>
- **Sectioned Markdown:** Users can split content with `<!-- PAGEBREAK -->` for multi-section guides <span style="font-size:1.3em;vertical-align:middle;">📄</span>

---

## Example SVG: Static vs Dynamic <span style="font-size:1.5em;vertical-align:middle;">🖌️</span>

```svg
<svg width="320" height="120" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="20" width="120" height="80" fill="#e0e7ef" stroke="#333"/>
  <text x="70" y="55" font-size="16" text-anchor="middle" fill="#333">Static Site 🏝️</text>
  <rect x="190" y="20" width="120" height="80" fill="#fbe9e7" stroke="#333"/>
  <text x="250" y="55" font-size="16" text-anchor="middle" fill="#333">Dynamic Site 🏙️</text>
  <line x1="130" y1="60" x2="190" y2="60" stroke="#888" stroke-width="2" marker-end="url(#arrow)"/>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#888"/>
    </marker>
  </defs>
</svg>
```

---

## Resources <span style="font-size:1.5em;vertical-align:middle;">📚</span>

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [How to Use Issue Templates](https://docs.github.com/en/issues/using-issues/creating-issue-templates-for-your-repository)

---

*Want to see this in action? Try the "Add New Project" button on the site navigation! <span style="font-size:1.5em;vertical-align:middle;">➕</span>*
