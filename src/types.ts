import { type ItemSchema } from '@/schemas/item';
import { type ItemRecipeSchema } from '@/schemas/item-recipe';
import { type PalSchema } from '@/schemas/pal';
import { type PalLocationSchema } from '@/schemas/pal-location';
import { type ActiveSkillSchema, type PassiveSkillSchema } from '@/schemas/skill';
import { type z } from 'zod';

export type Pal = z.infer<typeof PalSchema>;
export type WorkSuitability = keyof Pal['workSuitabilities'];
export type Drop = Pal['drops'][number];

export type Item = z.infer<typeof ItemSchema>;
export type ActiveSkill = z.infer<typeof ActiveSkillSchema>;
export type PassiveSkill = z.infer<typeof PassiveSkillSchema>;
export type ItemRecipe = z.infer<typeof ItemRecipeSchema>;
export type PalLocation = z.infer<typeof PalLocationSchema>;

export type BreedingCombo = { parentA: Pal; parentB: Pal; child: Pal };

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}
