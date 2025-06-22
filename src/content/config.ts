// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Schema for the "Projects" collection
const projectsCollection = defineCollection({
  // Type-check your frontmatter. See https://docs.astro.build/en/guides/content-collections/
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // The date the project was published
    pubDate: z.date(),
    // An optional hero image for the project
    heroImage: z.string().optional(),
    // An optional list of tags
    tags: z.array(z.string()).optional(),
  }),
});

// Schema for the "Blog" collection
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // The date the blog post was published
    pubDate: z.date(),
    // An optional date if the post was updated
    updatedDate: z.date().optional(),
    // An optional hero image for the blog post
    heroImage: z.string().optional(),
     // An optional list of tags
    tags: z.array(z.string()).optional(),
  }),
});

// This is the single export that registers all of your collections
export const collections = {
  'projects': projectsCollection,
  'blog': blogCollection,
};
