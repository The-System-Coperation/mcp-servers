import { z } from "zod";

export const BlogSearchSchema = {
    query: z.string(),
    display: z.number().optional(),
    start: z.number().optional(),
    sort: z.union([z.literal('sim'), z.literal('date')]).optional(),
}

