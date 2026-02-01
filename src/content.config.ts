import { defineCollection, z } from 'astro:content';

const tutorials = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string(),
	}),
});

export const collections = { tutorials };
