import { z } from 'zod';

export const PalLocationSchema = z.object({
  id: z.string(),
  isBoss: z.boolean(),
  locations: z.object({
    day: z.array(z.object({ x: z.number(), y: z.number(), z: z.number() })),
    night: z.array(z.object({ x: z.number(), y: z.number(), z: z.number() })),
  }),
});
