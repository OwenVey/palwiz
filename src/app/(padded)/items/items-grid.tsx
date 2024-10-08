'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { ItemImage } from '@/components/images/ItemImage';
import { StickySidebar } from '@/components/StickySidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LinkTab, LinkTabs } from '@/components/ui/link-tabs';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ITEMS from '@/data/items.json';
import { useQuerySort } from '@/hooks/useQuerySort';
import { useQueryString } from '@/hooks/useQueryString';
import { useQueryStringArray } from '@/hooks/useQueryStringArray';
import { cn, sortArrayByPropertyInDirection } from '@/lib/utils';
import { type Item } from '@/types';
import { useDebounce } from '@uidotdev/usehooks';
import { capitalCase } from 'change-case';
import { FilterXIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { memo, useMemo } from 'react';

const SORTS = [
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

const RARITY_MAP = {
  0: 'common',
  1: 'uncommon',
  2: 'rare',
  3: 'epic',
  4: 'legendary',
} as const;
type RarityKey = keyof typeof RARITY_MAP;

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

const CATEGORIES = [...new Set(ITEMS.map(({ typeA }) => typeA))].sort();
const SUBCATEGORIES = [...new Set(ITEMS.map(({ typeB }) => typeB))].sort();

export function ItemsGrid() {
  const [search, setSearch] = useQueryString('search');
  const [{ sort, sortDirection }, , SortFilter] = useQuerySort(SORTS, 'name');
  const [category, setCategory] = useQueryString('category');
  const [subcategory, setSubcategory] = useQueryString('subcategory');
  const [rarities, setRarities] = useQueryStringArray('rarity');

  const debouncedSearch = useDebounce(search, 100);

  const filteredItems = useMemo(
    () =>
      sortArrayByPropertyInDirection(ITEMS, sort, sortDirection)
        .filter(({ name }) => (debouncedSearch ? name.toLowerCase().includes(debouncedSearch.toLowerCase()) : true))
        .filter(({ typeA }) => (category ? typeA === category : true))
        .filter(({ typeB }) => (subcategory ? typeB === subcategory : true))
        .filter((item) => {
          const rarityKey = item.rarity as RarityKey;
          if (rarityKey in RARITY_MAP) {
            return rarities.length > 0 ? rarities.includes(RARITY_MAP[rarityKey]) : true;
          } else {
            return false;
          }
        }),
    [category, debouncedSearch, rarities, sort, sortDirection, subcategory],
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <StickySidebar>
        <div className="space-y-5">
          <LinkTabs className="w-full">
            <LinkTab className="flex-1" href="/items">
              Items
            </LinkTab>
            <LinkTab className="flex-1" href="/items/structures">
              Structures
            </LinkTab>
          </LinkTabs>

          <Input
            className="w-full"
            label="Search"
            placeholder="Search items"
            icon={SearchIcon}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          <SortFilter />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger label="Category" placeholder="Select category" />

            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {capitalCase(cat)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={subcategory} onValueChange={setSubcategory}>
            <SelectTrigger label="Subcategory" placeholder="Select subcategory" />

            <SelectContent>
              {SUBCATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {capitalCase(cat)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <CollapsibleFilter label="Rarity">
            <ToggleGroup
              type="multiple"
              className="md:grid md:grid-cols-2 md:gap-1"
              value={rarities}
              onValueChange={(v) => setRarities(v.length > 0 ? v : null)}
            >
              <ToggleGroupItem value="common" size="sm" variant="gray">
                Common
              </ToggleGroupItem>
              <ToggleGroupItem value="uncommon" size="sm" variant="green">
                Uncommon
              </ToggleGroupItem>
              <ToggleGroupItem value="rare" size="sm" variant="blue">
                Rare
              </ToggleGroupItem>
              <ToggleGroupItem value="epic" size="sm" variant="purple">
                Epic
              </ToggleGroupItem>
              <ToggleGroupItem value="legendary" size="sm" variant="yellow">
                Legendary
              </ToggleGroupItem>
            </ToggleGroup>
          </CollapsibleFilter>

          <div className="flex flex-col items-end gap-2">
            <div className="text-nowrap text-sm text-gray-11">{filteredItems.length} results</div>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/items">
                <FilterXIcon className="mr-2 size-4" />
                Clear Filters
              </Link>
            </Button>
          </div>
        </div>
      </StickySidebar>

      <div className="flex-1 @container">
        <Grid items={filteredItems} sort={sort} />
      </div>
    </div>
  );
}

const Grid = memo(
  function Grid({ items, sort }: { items: Item[]; sort: (typeof SORTS)[number]['value'] }) {
    if (items.length === 0) return <div className="grid h-full place-items-center text-gray-11">No items found</div>;

    return (
      <div className="grid auto-rows-fr grid-cols-2 gap-4 @md:grid-cols-3 @xl:grid-cols-4 @[44rem]:grid-cols-5">
        {items.map((item) => (
          <Link key={item.internalId} href={`/items/${item.id}`}>
            <Card
              className={cn('relative flex h-full flex-col items-center', getItemRarityClass(item.rarity))}
              hoverEffect
            >
              {sort !== 'name' && (
                <Badge variant="primary" className="absolute -right-1 -top-1">
                  {typeof item[sort] === 'number'
                    ? item[sort].toLocaleString()
                    : typeof item[sort] === 'string'
                      ? capitalCase(item[sort] as string)
                      : item[sort]}
                </Badge>
              )}

              <div className="rounded-full border border-gray-4 bg-gray-3 p-1">
                <ItemImage name={item.imageName} alt={item.name} width={60} height={60} />
              </div>

              <div className="mt-2 flex flex-1 items-center">
                <div className="line-clamp-2 text-balance text-center text-sm font-medium text-gray-12 [overflow-wrap:anywhere]">
                  {item.name}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    );
  },
  (prev, next) => JSON.stringify(prev.items) === JSON.stringify(next.items) && prev.sort === next.sort,
);
