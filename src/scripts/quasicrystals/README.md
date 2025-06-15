# Quasicrystals & Quantum Insights Compendium

An interactive compendium exploring the connection between quasicrystalline design in Islamic architecture and quantum systems, based on provided research points.

## Project Overview

This application presents textual content organized into expandable sections, accompanied by a sidebar displaying related articles. Users can click on these articles to view more details in a modal window.

## Project Structure

- `index.html`: The main HTML entry point for the application. Includes CDN links for React, ReactDOM, and Tailwind CSS.
- `index.tsx`: The main React application entry point, which renders the `App` component into the DOM.
- `App.tsx`: The root React component that orchestrates the main layout, state management, and interaction logic for the compendium.
- `data/content.ts`: Contains the structured main content for the compendium and the data for related articles.
- `types.ts`: Defines TypeScript types and interfaces (e.g., `MainContentItem`, `RelatedArticle`, `ContentSection`) used throughout the application to ensure data consistency.
- `components/`: This directory houses all reusable React components.
  - `icons/`: A sub-directory within `components/` specifically for SVG icon components.
- `metadata.json`: Contains metadata for the application, such as its name and description.
- `README.md`: This file, providing information about the project.

## Reusable Components

This project emphasizes modular design, and several components are built for reusability across different parts of this application or in other projects.

### Core UI Components

-   **`components/ExpandableSection.tsx`**
    -   **Purpose**: Renders a content section that can be expanded or collapsed by the user. It displays a title and, when open, its associated content items.
    -   **Key Props**: `section` (an object conforming to `ContentSection`, containing the title and content data), `isOpen` (a boolean indicating if the section is currently open), `onToggle` (a callback function executed when the section's toggle button is clicked).
    -   **Dependencies**: `components/ContentRenderer.tsx`, `components/icons/ChevronDownIcon.tsx`.

-   **`components/RelatedArticleCard.tsx`**
    -   **Purpose**: Displays a compact card summarizing a related article. Includes an image, title, source information, and a brief description or date. Clicking the card typically triggers a detailed view.
    -   **Key Props**: `article` (an object conforming to `RelatedArticle`), `onSelect` (a callback function executed when the card is selected).
    -   **Dependencies**: Icon components (e.g., `components/icons/AcademicCapIcon.tsx` as a default, or a specific icon passed via `article.sourceIcon`).

-   **`components/ArticleModal.tsx`**
    -   **Purpose**: A modal dialog that presents detailed information about a selected article. It overlays the main content and includes options to visit the source or close the modal.
    -   **Key Props**: `article` (an object conforming to `RelatedArticle`, or `null` if no article is selected), `onClose` (a callback function to close the modal).
    -   **Dependencies**: `components/icons/LinkIcon.tsx`, `components/icons/XMarkIcon.tsx`.

-   **`components/ContentRenderer.tsx`**
    -   **Purpose**: A flexible component responsible for rendering different types of main content items (e.g., headings, paragraphs, unordered lists) based on the `MainContentItem` type.
    -   **Key Props**: `item` (an object conforming to `MainContentItem`).
    -   **Dependencies**: `components/icons/LinkIcon.tsx`.

### Icon Components

All SVG icons are implemented as standalone, functional React components. They are highly reusable and can be easily styled using standard SVG attributes and CSS classes.

-   **Location**: All icon components reside in the `components/icons/` directory.
-   **Usage**: Import the specific icon component and use it like any other React component. Props like `className`, `width`, `height`, and `fill` can be passed for customization.
-   **Available Icons**:
    -   `AcademicCapIcon.tsx`
    -   `ChevronDownIcon.tsx`
    -   `LinkIcon.tsx`
    -   `MicrophoneIcon.tsx` (Note: If microphone input is implemented, `metadata.json` should request `microphone` permission.)
    -   `MuslimHeritageIcon.tsx`
    -   `NatureIcon.tsx`
    -   `SourceIcon.tsx`
    -   `StemIcon.tsx`
    -   `ThumbsDownIcon.tsx`
    -   `ThumbsUpIcon.tsx`
    -   `XMarkIcon.tsx`

### How to Reuse Components

1.  **Import**: Import the desired component into your React file.
    ```tsx
    // Example for ExpandableSection
    import { ExpandableSection } from './path/to/components/ExpandableSection';

    // Example for an icon
    import { NatureIcon } from './path/to/components/icons/NatureIcon';
    ```
2.  **Provide Props**: Pass the necessary props to the component. Ensure the data structures (e.g., for `article` or `section` props) match the types defined in `types.ts`.
3.  **Styling**: Components are styled using Tailwind CSS utility classes. For reuse in projects without Tailwind, styles would need to be adapted or an alternative styling solution implemented.

## Getting Started

1.  **Clone the repository** (if applicable) or ensure all listed files are present in the correct directory structure.
2.  **Open `index.html`** in a modern web browser that supports ES6 modules.

There are no build steps required for this setup as React and Tailwind CSS are included via CDNs.

## API Key Management (General Guideline)

Should this application integrate with external APIs requiring an API key (e.g., Google Gemini API):
- The API key **must** be sourced exclusively from an environment variable, typically `process.env.API_KEY`.
- This environment variable is assumed to be pre-configured in the execution environment where the application runs.
- The application code **must not** include any UI elements (input fields, forms) or prompts for users to enter or manage the API key directly. The key's availability is an external prerequisite.
