import { defineCollection, z } from 'astro:content';

const dataToolsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(), // We'll use this for sorting
  }),
});

export const collections = {
  'data-tools': dataToolsCollection,
};
