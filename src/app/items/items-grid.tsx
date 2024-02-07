'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { ItemImage } from '@/components/ItemImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { items } from '@/data/parsed';
import { cn, sortArrayByPropertyInDirection } from '@/lib/utils';
import { type Item } from '@/types';
import { capitalCase } from 'change-case';
import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, ArrowUpDownIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';

const ITEM_SORTS = [
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
  { label: 'Shield Value', value: 'shieldValue' },
  { label: 'Weight', value: 'weight' },
] satisfies Array<{ label: string; value: keyof Item }>;

const RARITY_MAP = {
  0: 'common',
  1: 'uncommon',
  2: 'rare',
  3: 'epic',
  4: 'legendary',
} as const;
type RarityKey = keyof typeof RARITY_MAP;

export function ItemsGrid() {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(ITEM_SORTS.map((s) => s.value)).withDefault('name'),
  );
  const [sortDirection, setSortDirection] = useQueryState(
    'sortDirection',
    parseAsStringLiteral(['asc', 'desc']).withDefault('asc'),
  );
  const [categories, setCategories] = useQueryState('categories', parseAsArrayOf(parseAsString).withDefault([]));
  const [rarities, setRarities] = useQueryState('rarity', parseAsArrayOf(parseAsString).withDefault([]));

  const filteredItems = sortArrayByPropertyInDirection(items, sort, sortDirection)
    .filter(({ name }) => (search ? name.toLowerCase().includes(search.toLowerCase()) : true))
    .filter((item) => (categories.length > 0 ? categories.includes(item.typeA) : true))
    .filter((item) => {
      const rarityKey = item.rarity as RarityKey;
      if (rarityKey in RARITY_MAP) {
        return rarities.length > 0 ? rarities.includes(RARITY_MAP[rarityKey]) : true;
      } else {
        return false;
      }
    });

  const ALL_CATEGORIES = [...new Set(items.map((item) => item.typeA))].sort();

  function getItemRarityClass(rarity: number) {
    switch (rarity) {
      case 0:
        return 'bg-gray-2 border-gray-4 hover:bg-gray-3 hover:border-gray-9 hover:shadow-gray-5';
      case 1:
        return 'bg-green-2 border-green-4 hover:bg-green-3 hover:border-green-9 hover:shadow-green-5';
      case 2:
        return 'bg-blue-2 border-blue-4 hover:bg-blue-3 hover:border-blue-9 hover:shadow-blue-5';
      case 3:
        return 'bg-purple-2 border-purple-4 hover:bg-purple-3 hover:border-purple-9 hover:shadow-purple-5';
      case 4:
        return 'bg-yellow-2 border-yellow-4 hover:bg-yellow-3 hover:border-yellow-8 hover:shadow-yellow-5';
      default:
        return 'bg-red-2 border-red-4 hover:bg-red-3 hover:border-red-9 hover:shadow-red-5';
    }
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="flex h-fit flex-col gap-4 md:sticky md:top-[81px] md:w-72">
        <Input
          className="w-full"
          label="Search"
          placeholder="Search items"
          icon={SearchIcon}
          value={search}
          onChange={({ target }) => setSearch(target.value ? target.value : null)}
        />

        <div className="flex flex-col items-end gap-2">
          <Select
            value={sort ?? ''}
            onValueChange={(v) => setSort(v === '' ? null : (v as (typeof ITEM_SORTS)[number]['value']))}
          >
            <SelectTrigger label="Sort" icon={ArrowUpDownIcon} placeholder="Sort by" />

            <SelectContent>
              {ITEM_SORTS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ToggleGroup
            type="single"
            className="flex w-full"
            size="sm"
            value={sortDirection}
            onValueChange={(value: 'asc' | 'desc') => value && setSortDirection(value)}
          >
            <ToggleGroupItem value="asc" className="flex-1">
              <ArrowDownNarrowWideIcon className="mr-1 size-4" />
              Asc
            </ToggleGroupItem>
            <ToggleGroupItem value="desc" className="flex-1">
              <ArrowDownWideNarrowIcon className="mr-1 size-4" />
              Desc
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <CollapsibleFilter label="Category" defaultOpen>
          <ToggleGroup
            type="multiple"
            className="md:grid md:grid-cols-2 md:gap-1"
            value={categories}
            onValueChange={(v) => setCategories(v.length > 0 ? v : null)}
          >
            {ALL_CATEGORIES.map((category) => (
              <ToggleGroupItem key={category} value={category} size="sm">
                {capitalCase(category)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CollapsibleFilter>

        <CollapsibleFilter label="Rarity" defaultOpen>
          <ToggleGroup
            type="multiple"
            className="md:grid md:grid-cols-2 md:gap-1"
            value={rarities}
            onValueChange={(v) => setRarities(v.length > 0 ? v : null)}
          >
            <ToggleGroupItem
              value="common"
              size="sm"
              className="border border-gray-6 bg-gray-3 hover:border-gray-7 hover:bg-gray-4 data-[state=on]:border-gray-9 data-[state=on]:bg-gray-4"
            >
              Common
            </ToggleGroupItem>
            <ToggleGroupItem
              value="uncommon"
              size="sm"
              className="border border-green-6 bg-green-3 hover:border-green-7 hover:bg-green-4 data-[state=on]:border-green-9 data-[state=on]:bg-green-4"
            >
              Uncommon
            </ToggleGroupItem>
            <ToggleGroupItem
              value="rare"
              size="sm"
              className="border border-blue-6 bg-blue-3 hover:border-blue-7 hover:bg-blue-4 data-[state=on]:border-blue-9 data-[state=on]:bg-blue-4"
            >
              Rare
            </ToggleGroupItem>
            <ToggleGroupItem
              value="epic"
              size="sm"
              className="border border-purple-6 bg-purple-3 hover:border-purple-7 hover:bg-purple-4 data-[state=on]:border-purple-9 data-[state=on]:bg-purple-4"
            >
              Epic
            </ToggleGroupItem>
            <ToggleGroupItem
              value="legendary"
              size="sm"
              className="border border-yellow-6 bg-yellow-3 hover:border-yellow-7 hover:bg-yellow-4 data-[state=on]:border-yellow-9 data-[state=on]:bg-yellow-4"
            >
              Legendary
            </ToggleGroupItem>
          </ToggleGroup>
        </CollapsibleFilter>

        <Button asChild variant="secondary" className="w-full">
          <Link href="/items">Clear Filters</Link>
        </Button>
      </Card>

      <div className="flex-1 @container">
        <div className="grid grid-cols-2 gap-4 @2xl:grid-cols-3 @5xl:grid-cols-4">
          {filteredItems.map((item) => (
            <Link key={item.internalId} href={`/items/${item.id}`}>
              <Card className={cn('relative flex h-full flex-col', getItemRarityClass(item.rarity))} hoverEffect>
                {sort !== 'name' && (
                  <Badge variant="primary" className="absolute -right-1 -top-1">
                    {item[sort].toLocaleString()}
                  </Badge>
                )}
                <div className="flex items-center gap-2">
                  <div className="shrink-0 rounded-full border border-gray-4 bg-gray-3 p-1">
                    <ItemImage className="size-10" id={item.imageName} />
                  </div>

                  <div className="">
                    <div className="line-clamp-1 text-sm text-gray-12">{capitalCase(item.name)}</div>
                    <div className="text-sm text-gray-11">{capitalCase(item.typeA)}</div>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="line-clamp-2 text-sm text-gray-11">{item.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
