// IMPORTANT: This file is the source of truth for deployment and routing settings.
//
// - The site is deployed to the /google-gemini-codes/ subdirectory on GitHub Pages.
// - All internal links and static asset paths MUST use Astro.base for correct navigation and resource loading.
// - astro.config.mjs MUST set base: '/google-gemini-codes'.
// - Never use root-relative paths like /projects/ or /favicon.svg directly in .astro files.
// - Always use `${Astro.base}/path` for links and assets in all components and pages.
//
// If you change the deployment location or base path, update this file and all relevant configs and code.
//
// This file should be imported and referenced in header and footer components to ensure consistency and visibility for all contributors.

export const SITE_DEPLOYMENT_INFO = {
  siteUrl: 'https://kairin.github.io/google-gemini-codes/',
  base: '/google-gemini-codes',
  astroBaseUsage: true,
  notes: [
    'All navigation and asset links must use Astro.base.',
    'astro.config.mjs must set base: \'/google-gemini-codes\'',
    'Never use root-relative paths for internal links or assets.'
  ]
};
