// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  // Type-check your frontmatter.
  // See https://docs.astro.build/en/guides/content-collections/#defining-a-collection-schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
  }),
});

export const collections = {
  'projects': projectsCollection,
};