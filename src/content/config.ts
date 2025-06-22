// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Schema for the "Projects" collection
// Updated 2025-06-22: Added optional 'slug' for custom URLs and prepared for future per-section metadata.
const projectsCollection = defineCollection({
  // Type-check your frontmatter. See https://docs.astro.build/en/guides/content-collections/
  schema: z.object({
    title: z.string(), // Project title (required)
    description: z.string(), // Project description (required)
    pubDate: z.date(), // Date the project was published (required)
    heroImage: z.string().optional(), // Optional hero image for the project
    tags: z.array(z.string()).optional(), // Optional list of tags for the project
    slug: z.string().optional(), // Optional custom slug for the project URL
    // Optional: for future per-section metadata (not required for single-file multi-page logic)
    // sections: z.array(z.object({
    //   id: z.string(), // Section identifier
    //   title: z.string().optional(), // Section title
    //   tags: z.array(z.string()).optional(), // Section tags
    //   order: z.number().optional(), // Section order
    // })).optional(),
  }),
});

// Schema for the "Blog" collection
// Updated 2025-06-22: Added optional 'slug', 'author', and 'categories' for more flexible blog management.
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(), // Blog post title (required)
    description: z.string(), // Blog post description (required)
    pubDate: z.date(), // Date the blog post was published (required)
    updatedDate: z.date().optional(), // Optional date if the post was updated
    heroImage: z.string().optional(), // Optional hero image for the blog post
    tags: z.array(z.string()).optional(), // Optional list of tags for the blog post
    slug: z.string().optional(), // Optional custom slug for the blog post URL
    author: z.string().optional(), // Optional author field
    categories: z.array(z.string()).optional(), // Optional categories for the blog post
  }),
});

// This is the single export that registers all of your collections
export const collections = {
  'projects': projectsCollection,
  'blog': blogCollection,
};
