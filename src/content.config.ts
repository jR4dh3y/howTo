import { defineCollection, z } from 'astro:content';

const tutorials = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string(),
		tags: z.array(z.string()).default([]),
		youtubeUrl: z.string().optional(),
	}),
});

export const collections = { tutorials };
