'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { ItemImage } from '@/components/ItemImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { sortArrayByPropertyInDirection } from '@/lib/utils';
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

type ItemsGridProps = {
  items: Item[];
};
export function ItemsGrid({ items }: ItemsGridProps) {
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

  const filteredItems = sortArrayByPropertyInDirection(items, sort, sortDirection)
    .filter(({ name }) => (search ? name.toLowerCase().includes(search.toLowerCase()) : true))
    .filter((item) => (categories.length > 0 ? categories.includes(item.typeA) : true));

  const ALL_CATEGORIES = [...new Set(items.map((item) => item.typeA))].sort();

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
            onValueChange={async (value: 'asc' | 'desc') => {
              if (value) await setSortDirection(value);
            }}
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
            onValueChange={(e) => setCategories(e.length > 0 ? e : null)}
          >
            {ALL_CATEGORIES.map((category) => (
              <ToggleGroupItem key={category} value={category} className="only:col-span-2">
                {capitalCase(category)}
              </ToggleGroupItem>
            ))}
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
              <Card className="relative flex h-full flex-col" hoverEffect>
                {sort !== 'name' && (
                  <Badge variant="primary" className="absolute -right-1 -top-1 font-mono">
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
