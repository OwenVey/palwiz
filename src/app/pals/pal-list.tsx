'use client';

import { PalGridView } from '@/app/pals/pal-grid-view';
import { PalTableView, columns } from '@/app/pals/pal-table-view';
import { ElementImage } from '@/components/ElementImage';
import { WorkTypeImage } from '@/components/WorkTypeImage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ColumnToggle } from '@/components/ui/column-toggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PAL_ELEMENTS, WORK_SUITABILITIES } from '@/constants';
import { isWithinRange } from '@/lib/utils';
import { type Pal, type WorkSuitability } from '@/types';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { LayoutGridIcon, SearchIcon, TableIcon } from 'lucide-react';
import Link from 'next/link';
import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

type PalListProps = {
  pals: Pal[];
};

export default function PalList({ pals }: PalListProps) {
  const [view, setView] = useQueryState('view', parseAsStringLiteral(['grid', 'table']).withDefault('grid'));
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [rarity, setRarity] = useQueryState('rarity', parseAsString.withDefault(''));
  const [elements, setElements] = useQueryState('elements', parseAsArrayOf(parseAsString).withDefault([]));
  const [work, setWork] = useQueryState('work', parseAsStringLiteral(WORK_SUITABILITIES.map(({ id }) => id)));

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([{ id: 'Name', value: search }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    'Capture Rate': false,
    Defense: true,
    'Food Amount': false,
    HP: true,
    'Male Probability': false,
    'Max Full Stomach': false,
    'Melee Attack': true,
    Price: false,
    Rarity: false,
    'Ride Sprint Speed': true,
    'Run Speed': false,
    'Shot Attack': true,
    'Slow Walk Speed': false,
    Stamina: false,
    Support: false,
    'Transport Speed': false,
    'Type 1': false,
    'Type 2': false,
    'Walk Speed': false,
  });

  const table = useReactTable({
    data: pals,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  useEffect(() => {
    table.getColumn('Name')?.setFilterValue(search);
  }, [table, search]);

  const filteredPals = pals
    .filter((pal) => (search ? pal.name.toLowerCase().includes(search.toLowerCase()) : true))
    .filter((pal) => (rarity ? isCorrectRarity(rarity ?? 'all', pal.rarity) : true))
    .filter((pal) =>
      elements?.length ? [pal.elementType1, pal.elementType2].filter(Boolean).some((e) => elements.includes(e)) : true,
    )
    .filter((pal) => (work ? pal.workSuitabilities[work] > 0 : true))
    .sort((pal1, pal2) => (work ? pal2.workSuitabilities[work] - pal1.workSuitabilities[work] : 0));

  function isCorrectRarity(rarityGroup: string, rarity: number) {
    if (rarityGroup === 'all') return true;
    if (rarityGroup === 'common') return isWithinRange(rarity, 0, 4);
    if (rarityGroup === 'rare') return isWithinRange(rarity, 5, 8);
    if (rarityGroup === 'epic') return isWithinRange(rarity, 8, 10);
    if (rarityGroup === 'legendary') return rarity > 10;
    return true;
  }

  return (
    <Tabs
      value={view}
      onValueChange={(v) => setView(v === 'grid' ? null : 'table')}
      defaultValue="grid"
      className="flex flex-col gap-4 md:flex-row"
    >
      <Card className="h-fit md:sticky md:top-[81px] md:w-72">
        <div className="flex flex-col gap-5">
          <TabsList className="w-full">
            <TabsTrigger className="flex-1 gap-1.5" value="grid">
              <LayoutGridIcon className="size-4" />
              Grid
            </TabsTrigger>
            <TabsTrigger className="flex-1 gap-1.5" value="table">
              <TableIcon className="size-4" />
              Table
            </TabsTrigger>
          </TabsList>

          <Input
            className="w-full"
            label="Search"
            placeholder="Search pals"
            icon={SearchIcon}
            value={search}
            onChange={({ target }) => setSearch(target.value ? target.value : null)}
          />

          <TabsContent value="grid" className="flex flex-col gap-4">
            <div>
              <Select value={rarity} onValueChange={(v) => setRarity(v && v !== 'all' ? v : null)}>
                <SelectTrigger className="w-full" label="Rarity">
                  <SelectValue placeholder="Select rarity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="common" className="text-gray-10 focus:text-gray-10">
                    Common
                  </SelectItem>
                  <SelectItem value="rare" className="text-blue-9 focus:bg-blue-3 focus:text-blue-10">
                    Rare
                  </SelectItem>
                  <SelectItem value="epic" className="text-purple-10 focus:bg-purple-3 focus:text-purple-10">
                    Epic
                  </SelectItem>
                  <SelectItem value="legendary" className="text-orange-10 focus:bg-orange-3 focus:text-orange-10">
                    Legendary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Work Suitability</Label>
              <ToggleGroup
                type="single"
                className="md:grid md:grid-cols-6 md:gap-1"
                value={work ?? ''}
                onValueChange={(v) => setWork(v === '' ? null : (v as WorkSuitability))}
              >
                {WORK_SUITABILITIES.map((work) => (
                  <ToggleGroupItem key={work.id} value={work.id} className="w-10 p-0 md:w-auto">
                    <WorkTypeImage id={work.id} className="size-7" />
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Elements</Label>
              <ToggleGroup
                type="multiple"
                className="md:grid md:grid-cols-6 md:gap-1"
                value={elements}
                onValueChange={(e) => setElements(e.length > 0 ? e : null)}
              >
                {PAL_ELEMENTS.map((element) => (
                  <ToggleGroupItem key={element} value={element} className="w-10 p-0 md:w-auto">
                    <ElementImage element={element} />
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </TabsContent>

          <TabsContent value="table" className="flex flex-col gap-4">
            <ColumnToggle table={table} />
          </TabsContent>

          <div className="w-full">
            <div className="float-right mb-2 text-nowrap text-sm text-gray-11">{filteredPals.length} results</div>

            <Button asChild variant="secondary" className="w-full">
              <Link href={{ pathname: '/pals', query: { view } }}>Clear Filters</Link>
            </Button>
          </div>
        </div>
      </Card>

      <TabsContent value="grid" className="flex-1 @container">
        <PalGridView pals={filteredPals} />
      </TabsContent>

      <TabsContent value="table" asChild>
        <PalTableView table={table} className="flex-1 overflow-auto" />
      </TabsContent>
    </Tabs>
  );
}
