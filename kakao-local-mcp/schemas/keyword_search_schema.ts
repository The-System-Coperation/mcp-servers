import { z } from "zod";
import { CategoryGroupCode } from "../enums/category_group_code";

export const keywordSearchSchemaShape = {
    query: z.string(),
    category_group_code: z.nativeEnum(CategoryGroupCode).optional(),
    x: z.string().optional(),
    y: z.string().optional(),
    radius: z.number().optional(),
    rect: z.string().optional(),
    page: z.number().min(1).max(45).optional(),
    size: z.number().min(1).max(15).optional(),
    sort: z.enum(['distance', 'accuracy']).optional(),
};

export const keywordSearchSchema = z.object(keywordSearchSchemaShape);

export type KeywordSearchSchemaType = z.infer<typeof keywordSearchSchema>; 