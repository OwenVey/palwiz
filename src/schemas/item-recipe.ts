import { z } from 'zod';

export const ItemRecipeSchema = z.object({
  energyAmount: z.number(),
  id: z.string(),
  materials: z.array(z.object({ count: z.number(), id: z.string() })),
  productCount: z.number(),
  unlockItemId: z.string(),
  workAmount: z.number(),
  workableAttribute: z.number(),
});
