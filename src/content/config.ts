import { defineCollection, z } from "astro:content";

const guides = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(), // Use z.date() if you prefer Date objects
  }),
});

export const collections = {
  "data-tools": guides,
};

