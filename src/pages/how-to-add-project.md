---
title: "How to Add a New Project via GitHub Issue 📝"
description: "Instructions for using the automated GitHub workflow to add new projects to the site."
pubDate: 2025-06-22
updatedDate: 2025-06-22
heroImage: "/google-gemini-codes/assets/automation.svg"
tags: ["guide", "automation", "github", "how-to"]
author: "Kairin"
categories: ["Guides", "How-To"]
---

# How to Add a New Project via GitHub Issue <span style="font-size:1.5em;vertical-align:middle;">📝</span>

Want to add a new project to this site? You can do it in just a few steps—no coding required!

---

## Step 1: Open a New Project Issue <span style="font-size:1.3em;vertical-align:middle;">➕</span>

- Click the <BaseLink href="https://github.com/kairin/google-gemini-codes/issues/new?template=new-project.md">Add New Project</BaseLink> button (or use the link in the site navigation).
- Fill out the form with your project details:
  - **Project Title**
  - **Description**
  - **Tags** (comma-separated)
  - **Hero Image URL** (optional)
  - **Sections** (optional, use `<!-- PAGEBREAK -->` to split into multiple pages)

---

## Step 2: Submit the Issue <span style="font-size:1.3em;vertical-align:middle;">📤</span>

- Click **Submit new issue**.
- Your issue will be labeled `new project` automatically (or a maintainer will add the label).

---

## Step 3: Automation Magic <span style="font-size:1.3em;vertical-align:middle;">🤖</span>

- The GitHub Actions workflow will:
  1. Create a new markdown file in `src/content/projects/` with your details
  2. Commit and push the file to the repository
  3. Close your issue with a confirmation comment
  4. Trigger a site rebuild

---

## Step 4: See Your Project Live! <span style="font-size:1.3em;vertical-align:middle;">🚀</span>

- After a few minutes, your project will appear on the homepage, sitemap, and project lists.
- If you need to edit or update your project, just open a new issue or submit a pull request.

---

## Example: Project Issue Template <span style="font-size:1.3em;vertical-align:middle;">📋</span>

```markdown
---
title: "[Project] My Awesome Project"
labels: ["new project"]
---

**Project Title:**
My Awesome Project

**Description:**
A short description of my project.

**Tags:**
astro, automation, github

**Hero Image URL (optional):**
https://example.com/image.svg

**Sections (optional, use <!-- PAGEBREAK --> to split):**
Introduction
<!-- PAGEBREAK -->
Details
```

---

## Need Help?

- See the <BaseLink href="/blog/how-to-add-projects-online">full automation guide</BaseLink> for technical details.
- Or open an issue with your question!

---

Happy building! <span style="font-size:1.5em;vertical-align:middle;">✨</span>
