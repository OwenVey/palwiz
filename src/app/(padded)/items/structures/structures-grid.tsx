'use client';

import { StickySidebar } from '@/components/StickySidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LinkTab, LinkTabs } from '@/components/ui/link-tabs';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import STRUCTURES from '@/data/structures.json';
import { useQueryString } from '@/hooks/useQueryString';
import { sortArrayByPropertyInDirection } from '@/lib/utils';
import { type Structure } from '@/types';
import { useDebounce } from '@uidotdev/usehooks';
import { capitalCase } from 'change-case';
import {
  ArrowDownNarrowWideIcon,
  ArrowDownWideNarrowIcon,
  ArrowUpDownIcon,
  FilterXIcon,
  SearchIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { memo, useMemo } from 'react';

const SORTS = [
  { label: 'Build Work', value: 'buildWork' },
  { label: 'Consume Energy Speed', value: 'consumeEnergySpeed' },
  { label: 'Defense', value: 'defense' },
  { label: 'Deterioration Damage', value: 'deteriorationDamage' },
  { label: 'Extinguish Burn Work', value: 'extinguishBurnWorkAmount' },
  { label: 'HP', value: 'hp' },
  { label: 'Name', value: 'name' },
] satisfies Array<{ label: string; value: keyof Structure }>;

const CATEGORIES = [...new Set(STRUCTURES.map(({ typeA }) => typeA))].sort();
const SUBCATEGORIES = [...new Set(STRUCTURES.map(({ typeB }) => typeB))].sort();

export function StructuresGrid() {
  const [search, setSearch] = useQueryString('search');
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(SORTS.map((s) => s.value))
      .withDefault('name')
      .withOptions({ clearOnDefault: true }),
  );
  const [sortDirection, setSortDirection] = useQueryState(
    'sortDirection',
    parseAsStringLiteral(['asc', 'desc']).withDefault('asc').withOptions({ clearOnDefault: true }),
  );

  const [category, setCategory] = useQueryString('category');
  const [subcategory, setSubcategory] = useQueryString('subcategory');

  const debouncedSearch = useDebounce(search, 100);

  const filteredStructures = useMemo(
    () =>
      sortArrayByPropertyInDirection(STRUCTURES, sort, sortDirection)
        .filter(({ name }) => (debouncedSearch ? name.toLowerCase().includes(debouncedSearch.toLowerCase()) : true))
        .filter(({ typeA }) => (category ? typeA === category : true))
        .filter(({ typeB }) => (subcategory ? typeB === subcategory : true)),
    [category, debouncedSearch, sort, sortDirection, subcategory],
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
          />

          <div className="flex flex-col items-end gap-2">
            <Select value={sort} onValueChange={(v) => setSort(v as (typeof SORTS)[number]['value'])}>
              <SelectTrigger label="Sort" icon={ArrowUpDownIcon} placeholder="Sort by" />

              <SelectContent>
                {SORTS.map(({ label, value }) => (
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

          <div className="flex flex-col items-end gap-2">
            <div className="text-nowrap text-sm text-gray-11">{filteredStructures.length} results</div>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/items/structures">
                <FilterXIcon className="mr-2 size-4" />
                Clear Filters
              </Link>
            </Button>
          </div>
        </div>
      </StickySidebar>

      <div className="flex-1 @container">
        <Grid structures={filteredStructures} sort={sort} />
      </div>
    </div>
  );
}

const Grid = memo(function Grid({
  structures,
  sort,
}: {
  structures: Structure[];
  sort: (typeof SORTS)[number]['value'];
}) {
  if (structures.length === 0)
    return <div className="grid h-full place-items-center text-gray-11">No structures found</div>;

  return (
    <div className="grid auto-rows-fr grid-cols-2 gap-4 @md:grid-cols-3 @xl:grid-cols-4 @[44rem]:grid-cols-5">
      {structures.map((structure) => (
        <Link key={structure.internalId} href={`/items/structures/${structure.id}`}>
          <Card className="relative flex h-full flex-col items-center" hoverEffect>
            {sort !== 'name' && (
              <Badge variant="primary" className="absolute -right-1 -top-1">
                {structure[sort].toLocaleString()}
              </Badge>
            )}

            <div className="rounded-full border border-gray-4 bg-gray-3 p-1">
              <Image
                src={`/images/structures/${structure.imageName}.webp`}
                height={60}
                width={60}
                alt={structure.name}
              />
            </div>

            <div className="mt-2 flex flex-1 items-center">
              <div className="line-clamp-2 text-balance text-center text-sm text-gray-12 [overflow-wrap:anywhere]">
                {structure.name}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
});
