import itemRecipesJson from '@/data/item-recipes.json';
import itemsJson from '@/data/items.json';
import palsJson from '@/data/pals.json';
import skillsJson from '@/data/skills.json';
import { ItemSchema } from '@/schemas/item';
import { ItemRecipeSchema } from '@/schemas/item-recipe';
import { PalSchema } from '@/schemas/pal';
import { SkillSchema } from '@/schemas/skill';
import { z } from 'zod';

export const allPals = z.array(PalSchema).parse(palsJson);
export const normalPals = z
  .array(PalSchema)
  .parse(palsJson)
  .filter(({ isBoss }) => !isBoss)
  .filter(({ zukanIndex }) => zukanIndex > 0)
  .filter(({ internalName }) => internalName !== 'PlantSlime_Flower');
export const items = z.array(ItemSchema).parse(itemsJson);
export const skills = z.array(SkillSchema).parse(skillsJson);
export const itemRecipes = z.array(ItemRecipeSchema).parse(itemRecipesJson);
