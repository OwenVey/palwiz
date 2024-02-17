import { type ItemSchema } from '@/schemas/item';
import { type ItemRecipeSchema } from '@/schemas/item-recipe';
import { type PalSchema } from '@/schemas/pal';
import { type PalLocationSchema } from '@/schemas/pal-location';
import { type SkillSchema } from '@/schemas/skill';
import { type z } from 'zod';

export type Pal = z.infer<typeof PalSchema>;
export type WorkSuitability = keyof Pal['workSuitabilities'];
export type Drop = Pal['drops'][number];

export type Item = z.infer<typeof ItemSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type ItemRecipe = z.infer<typeof ItemRecipeSchema>;
export type PalLocation = z.infer<typeof PalLocationSchema>;

export type BreedingCombo = { parentA: Pal; parentB: Pal; child: Pal };
