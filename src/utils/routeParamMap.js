// Central mapping of dynamic route param names for Astro catch-all routes
// Keeps param logic DRY and robust for static path generation and route files

export const routeParamMap = {
  blog: 'slug',      // for src/pages/blog/[...slug].astro
  projects: 'slug',  // for src/pages/projects/[...slug].astro
  // Add more as needed
};

// Usage:
//   import { routeParamMap } from '@/utils/routeParamMap.js';
//   const paramName = routeParamMap['blog'];
//   paths.push({ params: { [paramName]: [...] }, ... });
