import { type ItemSchema } from '@/schemas/item';
import { type PalSchema } from '@/schemas/pal';
import { type z } from 'zod';

export type Pal = z.infer<typeof PalSchema>;
export type WorkSuitability = keyof Pal['workSuitabilities'];
export type Drop = Pal['drops'][number];

export type Item = z.infer<typeof ItemSchema>;
