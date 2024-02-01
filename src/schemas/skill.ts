import { z } from 'zod';

export const SkillSchema = z.object({
  category: z.string(),
  cooldownTime: z.number(),
  description: z.string(),
  effects: z.array(z.object({ name: z.string(), value: z.number() })),
  element: z.string(),
  id: z.string(),
  internalId: z.string(),
  maxRange: z.number(),
  minRange: z.number(),
  name: z.string(),
  power: z.number(),
  specialAttackRates: z.array(z.object({ rate: z.number(), type: z.string() })),
});
