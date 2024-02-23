import { type Item } from '@/types';
import { createSearchParamsCache, parseAsArrayOf, parseAsString, parseAsStringLiteral } from 'nuqs/server';

export const ITEM_SORTS = [
  { label: 'Category', value: 'typeA' },
  { label: 'Corruption Factor', value: 'corruptionFactor' },
  { label: 'Durability', value: 'durability' },
  { label: 'HP', value: 'hpValue' },
  { label: 'Magazine Size', value: 'magazineSize' },
  { label: 'Magic Attack Value', value: 'magicAttackValue' },
  { label: 'Magic Defense Value', value: 'magicDefenseValue' },
  { label: 'Max Stack Count', value: 'maxStackCount' },
  { label: 'Name', value: 'name' },
  { label: 'Physical Attack Value', value: 'physicalAttackValue' },
  { label: 'Physical Defense Value', value: 'physicalDefenseValue' },
  { label: 'Price', value: 'price' },
  { label: 'Rarity', value: 'rarity' },
  { label: 'Restore Concentration', value: 'restoreConcentration' },
  { label: 'Restore Health', value: 'restoreHealth' },
  { label: 'Restore Sanity', value: 'restoreSanity' },
  { label: 'Restore Satiety', value: 'restoreSatiety' },
  { label: 'Subcategory', value: 'typeB' },
  { label: 'Shield Value', value: 'shieldValue' },
  { label: 'Weight', value: 'weight' },
] satisfies Array<{ label: string; value: keyof Item }>;

export const itemsQueryParsers = {
  search: parseAsString.withDefault(''),
  sort: parseAsStringLiteral(ITEM_SORTS.map(({ value }) => value)).withDefault('name'),
  sortDirection: parseAsStringLiteral(['asc', 'desc']).withDefault('asc'),
  category: parseAsString.withDefault(''),
  subcategory: parseAsString.withDefault(''),
  rarities: parseAsArrayOf(parseAsString).withDefault([]),
};

export const itemsQueryCache = createSearchParamsCache(itemsQueryParsers);
