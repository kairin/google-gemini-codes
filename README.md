# :rocket: Google Gemini Codes

![GitHub last commit](https://img.shields.io/github/last-commit/kairin/google-gemini-codes?style=for-the-badge&color=00B8D4)
![Languages](https://img.shields.io/github/languages/top/kairin/google-gemini-codes?style=for-the-badge&color=FFC107)
![Repo stars](https://img.shields.io/github/stars/kairin/google-gemini-codes?style=for-the-badge&color=brightgreen)

Welcome to `google-gemini-codes`, a curated collection of projects and analyses showcasing modern solutions for common data and web challenges. This repository contains the source code for the interactive website built with **Astro** and automatically deployed to **GitHub Pages**.

[![Launch Site ↗](https://img.shields.io/badge/Launch-Live%20Website-blue.svg?style=for-the-badge)](https://kairin.github.io/google-gemini-codes/)

## :bulb: The Vision Behind This Project

The core idea of this repository is to tackle real-world problems with the best open-source tools available. The projects documented here are born from genuine curiosity and a desire to find the most efficient and elegant solutions. The "thinking" behind this project is to:

1.  **Solve Practical Problems:** Each project starts with a real-world challenge.
2.  **Learn by Doing:** The code here is a direct result of hands-on experimentation.
3.  **Share the Knowledge:** The ultimate goal is to create well-documented, easy-to-understand resources that others can learn from and build upon.

---

## :file_folder: Project Structure

This project is built with Astro and follows its standard conventions. All source code resides in the `src/` directory.

/
├── public/ # Static assets (images, fonts, etc.)
└── src/
├── components/ # Reusable Astro components (.astro)
│ ├── Accordion.astro
│ ├── Card.astro
│ └── TabbedInterface.astro
├── content/ # Markdown content collections
│ └── data-tools/
│ ├── duckdb-guide.md
│ └── power-query-guide.md
├── layouts/ # Master page layouts
│ └── BaseLayout.astro
├── pages/ # Site pages and routes
│ ├── data-tools/
│ │ ├── comparison.astro
│ │ └── guides/[slug].astro
│ ├── ancient-math/
│ ├── f5-vpn/
│ └── index.astro # Homepage
└── styles/ # Global CSS (rarely used with Tailwind)

---

## :dart: Core Projects on the Site

The repository is organized into four main projects, each explorable on the live website.

### Data Tool Analyzer
A deep dive into the world of data analysis tools, comparing Power Query, DuckDB, and GraphRAG.
> **[Explore on site →](/data-tools)**

### Dockerized F5 VPN
A technical guide to creating a secure and isolated F5 VPN environment using Docker.
> **[Explore on site →](/f5-vpn)**

### Ancient Sophistication
An exploration of the advanced mathematics of quasicrystals hidden within the beauty of Islamic architecture.
> **[Explore on site →](/ancient-math)**

### Learning
A section dedicated to the tools and techniques used to build this site, such as Astro and GitHub Pages deployment.
> **[Explore on site →](/learning/github-pages-ssg)**
