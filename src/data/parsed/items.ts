import itemsJson from '@/data/items.json';
import { ItemSchema } from '@/schemas/item';
import { z } from 'zod';

export const ITEMS = z.array(ItemSchema).parse(itemsJson);
