# Application Specifications

**Note:** Do not modify this document without explicit approval from the repository owner.

## 1. Overview

This document outlines the functional and non-functional requirements for the `google-gemini-codes` project. It serves as the authoritative reference for the application's expected behavior and requirements.

## 2. Core Functionality

*   **Content Management:**
    *   The application must allow users to create, manage, and display technical projects, guides, and blog posts.
    *   Content is written in Markdown.
    *   Content should be organized into projects and blog posts.
    *   Multi-page content should be supported using a `<!-- PAGEBREAK -->` delimiter.
*   **Navigation:**
    *   The application must provide clear and consistent navigation.
    *   All internal links must work correctly in both local and GitHub Pages subdirectory deployments.
    *   A sitemap should be automatically generated.
*   **Automation:**
    *   Content indexing, sectioning, and metadata generation should be automated.
    *   Publication dates should be automatically handled, including history tracking.
*   **Design and User Interface:**
    *   The application should have a modern, clean, and accessible user interface.
    *   The site structure should consist of a header, main content area, and footer.

## 3. Non-Functional Requirements

*   **Scalability:** The application should be able to support a growing number of projects, blog posts, and other content types.
*   **Maintainability:** The codebase should be well-organized, documented, and easy to maintain. DRY (Don't Repeat Yourself) principles should be followed.
*   **Deployment:** The application must be deployable to GitHub Pages.
*   **CI/CD:** Continuous integration and continuous deployment should be implemented using GitHub Actions.

## 4. Key Technologies

*   Astro
*   React (for interactive components)
*   Tailwind CSS
*   Markdown

## 5. Key Files and Structure

(This section can be populated with references to the `AGENTS.MD` file or a summary of critical files and their roles, as per user preference.)

## 6. Future Enhancements

(This section can be used to track planned features or improvements.)
