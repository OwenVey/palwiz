'use client';

import { StickySidebar } from '@/components/StickySidebar';
import { StructureImage } from '@/components/images/StructureImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LinkTab, LinkTabs } from '@/components/ui/link-tabs';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import STRUCTURES from '@/data/structures.json';
import { useQuerySort } from '@/hooks/useQuerySort';
import { useQueryString } from '@/hooks/useQueryString';
import { sortArrayByPropertyInDirection } from '@/lib/utils';
import { type Structure } from '@/types';
import { useDebounce } from '@uidotdev/usehooks';
import { capitalCase } from 'change-case';
import { FilterXIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { memo, useMemo } from 'react';

const SORTS = [
  { label: 'Build Work', value: 'buildWork' },
  { label: 'Category', value: 'typeA' },
  { label: 'Consume Energy Speed', value: 'consumeEnergySpeed' },
  { label: 'Defense', value: 'defense' },
  { label: 'Deterioration Damage', value: 'deteriorationDamage' },
  { label: 'Extinguish Burn Work', value: 'extinguishBurnWorkAmount' },
  { label: 'HP', value: 'hp' },
  { label: 'Name', value: 'name' },
  { label: 'Subcategory', value: 'typeB' },
] satisfies Array<{ label: string; value: keyof Structure }>;

const CATEGORIES = [...new Set(STRUCTURES.map(({ typeA }) => typeA))].sort();
const SUBCATEGORIES = [...new Set(STRUCTURES.map(({ typeB }) => typeB))].sort();

export function StructuresGrid() {
  const [search, setSearch] = useQueryString('search');
  const [{ sort, sortDirection }, , SortFilter] = useQuerySort(SORTS, 'name');
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
                {typeof structure[sort] === 'number'
                  ? structure[sort].toLocaleString()
                  : typeof structure[sort] === 'string'
                    ? capitalCase(structure[sort] as string)
                    : structure[sort]}
              </Badge>
            )}

            <div className="rounded-full border border-gray-4 bg-gray-3 p-1">
              <StructureImage name={structure.imageName} alt={structure.name} width={60} height={60} />
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
