import { z } from 'zod';

export const ItemSchema = z.object({
  description: z.string(),
  id: z.string(),
  imageName: z.string().nullable(),
  internalId: z.string(),
  name: z.string(),
});
