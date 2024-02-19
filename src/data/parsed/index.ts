import { SAME_PARENT_CHILDREN, UNIQUE_BREEDING_CHILDREN } from '@/constants';
import activeSkillsJson from '@/data/active-skills.json';
import itemRecipesJson from '@/data/item-recipes.json';
import itemsJson from '@/data/items.json';
import palLocationsJson from '@/data/pal-locations.json';
import palsJson from '@/data/pals.json';
import passiveSkillsJson from '@/data/passive-skills.json';
import { ItemSchema } from '@/schemas/item';
import { ItemRecipeSchema } from '@/schemas/item-recipe';
import { PalSchema } from '@/schemas/pal';
import { PalLocationSchema } from '@/schemas/pal-location';
import { ActiveSkillSchema, PassiveSkillSchema } from '@/schemas/skill';
import { z } from 'zod';

export const allPals = z.array(PalSchema).parse(palsJson);
export const normalPals = allPals
  .filter(({ isBoss }) => !isBoss)
  .filter(({ zukanIndex }) => zukanIndex > 0)
  .filter(({ internalName }) => internalName !== 'PlantSlime_Flower');
export const breedOrderPals = normalPals
  .filter((pal) => !UNIQUE_BREEDING_CHILDREN.includes(pal.id))
  .filter((pal) => !SAME_PARENT_CHILDREN.includes(pal.id))
  .sort((a, b) => (a.breedOrder ?? 0) - (b.breedOrder ?? 0));

export const items = z.array(ItemSchema).parse(itemsJson);
export const activeSkills = z.array(ActiveSkillSchema).parse(activeSkillsJson);
export const passiveSkills = z.array(PassiveSkillSchema).parse(passiveSkillsJson);
export const itemRecipes = z.array(ItemRecipeSchema).parse(itemRecipesJson);
export const palLocations = z.array(PalLocationSchema).parse(palLocationsJson);
