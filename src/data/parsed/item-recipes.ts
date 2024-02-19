import itemRecipesJson from '@/data/item-recipes.json';
import { ItemRecipeSchema } from '@/schemas/item-recipe';
import { z } from 'zod';

export const ITEM_RECIPES = z.array(ItemRecipeSchema).parse(itemRecipesJson);

export function getItemRecipeById(id: string) {
  return ITEM_RECIPES.find((itemRecipe) => itemRecipe.id === id) ?? null;
}
