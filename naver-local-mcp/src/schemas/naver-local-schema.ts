import { z } from 'zod';

export const naverLocalSearchRequestSchema = {
  query: z.string(),
  display: z.number().min(1).max(5).optional(),
  start: z.number().min(1).max(1).optional(),
  sort: z.enum(['random', 'comment']).optional(),
}