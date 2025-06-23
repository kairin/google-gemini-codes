# 🗓️ Workday Poster

## Project: Google Gemini Codes

---

### Build & Serve Summary

- **Build Status:** ✅ Successful
- **Static Output:** `dist/`
- **Content Indexed:**  
  - `astro-rebuild-guide.md`
  - `testingtesting-1.md`
  - `how-to-add-projects-online.md`
  - `first-post.md`
- **Generated JSON Indexes:**  
  - `project-astro-rebuild-guide.json`
  - `blog-testingtesting-1.json`
  - `blog-how-to-add-projects-online.json`
  - `blog-first-post.json`

---

### Issues Observed

- 404 errors for:
  - `/google-gemini-codes/_astro/_blogslug_.DXpDK_rW.css`
  - `/google-gemini-codes/favicon.svg`
  - `/google-gemini-codes/projects/astro-rebuild-guide/1`
  - Markdown files like `/README.md`, `/DOCUMENTATION.md`
- Possible **base path misconfiguration** for subfolder deployment.

---

### Next Steps

1. Set `base: '/google-gemini-codes/'` in `astro.config.mjs` if deploying to a subfolder.
2. Add missing static assets (e.g., `favicon.svg`) to `public/`.
3. Rebuild and retest locally.

---

### Useful Commands

```bash
ls -R                # List all files
cat <file>.json      # View JSON file
jq . <file>.json     # Pretty-print JSON
npx serve dist       # Serve static site locally
```

---

*Last updated: 2025-06-23*