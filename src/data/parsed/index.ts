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
export const items = z.array(ItemSchema).parse(itemsJson);
export const activeSkills = z.array(ActiveSkillSchema).parse(activeSkillsJson);
export const passiveSkills = z.array(PassiveSkillSchema).parse(passiveSkillsJson);
export const itemRecipes = z.array(ItemRecipeSchema).parse(itemRecipesJson);
export const palLocations = z.array(PalLocationSchema).parse(palLocationsJson);
