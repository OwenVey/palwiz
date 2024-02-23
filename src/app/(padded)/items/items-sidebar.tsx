'use client';

import { ITEM_SORTS, itemsQueryParsers } from '@/app/(padded)/items/items-search-params';
import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { SortFilter } from '@/components/SortFilter';
import { StickySidebar } from '@/components/StickySidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LinkTab, LinkTabs } from '@/components/ui/link-tabs';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { capitalCase } from 'change-case';
import { FilterXIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useQueryStates } from 'nuqs';

export function ItemsSidebar({
  categories,
  subcategories,
  numResults,
}: {
  categories: string[];
  subcategories: string[];
  numResults: number;
}) {
  const [{ search, sort, sortDirection, category, subcategory, rarities }, setItemsQuery] =
    useQueryStates(itemsQueryParsers);

  function updateQuery(values: Parameters<typeof setItemsQuery>[0]) {
    void setItemsQuery(values, { clearOnDefault: true, shallow: false });
  }

  return (
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
          onChange={(e) => updateQuery({ search: e.target.value })}
        />

        <SortFilter
          options={ITEM_SORTS}
          sort={sort}
          direction={sortDirection}
          onSortChange={(sort) => updateQuery({ sort })}
          onDirectionChange={(sortDirection) => updateQuery({ sortDirection })}
        />

        <Select value={category} onValueChange={(category) => updateQuery({ category })}>
          <SelectTrigger label="Category" placeholder="Select category" />

          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {capitalCase(cat)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={subcategory} onValueChange={(subcategory) => updateQuery({ subcategory })}>
          <SelectTrigger label="Subcategory" placeholder="Select subcategory" />

          <SelectContent>
            {subcategories.map((cat) => (
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
            onValueChange={(rarities) => updateQuery({ rarities: rarities.length ? rarities : null })}
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
          <div className="text-nowrap text-sm text-gray-11">{numResults} results</div>
          <Button asChild variant="secondary" className="w-full">
            <Link href="/items">
              <FilterXIcon className="mr-2 size-4" />
              Clear Filters
            </Link>
          </Button>
        </div>
      </div>
    </StickySidebar>
  );
}
