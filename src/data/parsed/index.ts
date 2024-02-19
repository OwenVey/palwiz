import activeSkillsJson from '@/data/active-skills.json';
import itemRecipesJson from '@/data/item-recipes.json';

import palsJson from '@/data/pals.json';
import passiveSkillsJson from '@/data/passive-skills.json';
import { ItemRecipeSchema } from '@/schemas/item-recipe';
import { PalSchema } from '@/schemas/pal';
import { ActiveSkillSchema, PassiveSkillSchema } from '@/schemas/skill';
import { z } from 'zod';

export const allPals = z.array(PalSchema).parse(palsJson);

export const activeSkills = z.array(ActiveSkillSchema).parse(activeSkillsJson);
export const passiveSkills = z.array(PassiveSkillSchema).parse(passiveSkillsJson);
export const itemRecipes = z.array(ItemRecipeSchema).parse(itemRecipesJson);
