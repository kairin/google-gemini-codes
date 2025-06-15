# :rocket: Google Gemini Codes

![GitHub last commit](https://img.shields.io/github/last-commit/kairin/google-gemini-codes?style=for-the-badge&color=00B8D4)
![Languages](https://img.shields.io/github/languages/top/kairin/google-gemini-codes?style=for-the-badge&color=FFC107)

Welcome to `google-gemini-codes`, a curated collection of projects and analyses showcasing modern solutions for common data and web challenges. This repository contains the source code for the interactive website built with **Astro** and automatically deployed to **GitHub Pages**.

[![Launch Site ↗](https://img.shields.io/badge/Launch-Live%20Website-blue.svg?style=for-the-badge)](https://kairin.github.io/google-gemini-codes/)

## :bulb: The Vision Behind This Project

The core idea of this repository is to tackle real-world problems with the best open-source tools available. The projects documented here are born from genuine curiosity and a desire to find the most efficient and elegant solutions. The "thinking" behind this project is to:

1.  **Solve Practical Problems:** Each project starts with a real-world challenge.
2.  **Learn by Doing:** The code here is a direct result of hands-on experimentation.
3.  **Share the Knowledge:** The ultimate goal is to create well-documented, easy-to-understand resources that others can learn from and build upon.

---

## :file_folder: Project Structure

This project is built with Astro and follows its standard conventions. The navigation structure is automated and controlled by a single source of truth located at `src/data/navigation.ts`.

```
/google-gemini-codes
├── public/
│   └── scripts/
│       └── girih-tiles.js       # (Drawing library for the Ancient Math page)
└── src/
    ├── components/              # Reusable Astro components (.astro)
    │   ├── BaseLink.astro
    │   ├── Card.astro
    │   ├── Footer.astro
    │   └── Header.astro
    ├── data/
    │   └── navigation.ts        # << SINGLE SOURCE OF TRUTH FOR ALL NAVIGATION
    ├── layouts/                 # Master page layouts
    │   └── BaseLayout.astro
    └── pages/                   # Site pages and routes
        ├── ancient-math/
        │   └── index.astro
        ├── ai-warfare/
        │   └── index.astro
        ├── data-tools/
        │   ├── comparison.astro
        │   └── index.astro
        ├── f5-vpn/
        │   └── index.astro
        ├── learning/
        │   └── github-pages-ssg.astro
        └── index.astro          # Homepage
```

---

This concludes all the steps. You have successfully created a single source of truth for your navigation and updated all the relevant components to use it. Your project is now fully automated, consistent, and easy to maintain.
