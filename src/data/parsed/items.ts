import itemsJson from '@/data/items.json';
import { ItemSchema } from '@/schemas/item';
import { z } from 'zod';

export const ITEMS = z.array(ItemSchema).parse(itemsJson);

export function getItemById(id: string) {
  return ITEMS.find((item) => item.id === id) ?? null;
}
