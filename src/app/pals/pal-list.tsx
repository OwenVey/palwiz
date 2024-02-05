'use client';

import { PalGridView } from '@/app/pals/pal-grid-view';
import { PalTableView, columns } from '@/app/pals/pal-table-view';
import { ElementImage } from '@/components/ElementImage';
import { PartnerSkillImage } from '@/components/PartnerSkillImage';
import { WorkTypeImage } from '@/components/WorkTypeImage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ColumnToggle } from '@/components/ui/column-toggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PAL_ELEMENTS, WORK_SUITABILITIES } from '@/constants';
import { cn, isWithinRange } from '@/lib/utils';
import { type Pal, type WorkSuitability } from '@/types';
import { type CollapsibleProps } from '@radix-ui/react-collapsible';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import {
  ArrowDownNarrowWideIcon,
  ArrowDownWideNarrowIcon,
  ArrowUpDownIcon,
  GemIcon,
  LayoutGridIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  TableIcon,
} from 'lucide-react';
import Link from 'next/link';
import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

type PalListProps = {
  pals: Pal[];
};

const SORTS = [
  { label: 'Capture Rate', value: 'captureRateCorrect' },
  { label: 'Defense', value: 'defense' },
  { label: 'Food Amount', value: 'foodAmount' },
  { label: 'HP', value: 'hp' },
  { label: 'Male Probability', value: 'maleProbability' },
  { label: 'Max Full Stomach', value: 'maxFullStomach' },
  { label: 'Melee Attack', value: 'meleeAttack' },
  { label: 'Name', value: 'name' },
  { label: 'Paldeck Number', value: 'zukanIndex' },
  { label: 'Price', value: 'price' },
  { label: 'Rarity', value: 'rarity' },
  { label: 'Ride Sprint Speed', value: 'rideSprintSpeed' },
  { label: 'Run Speed', value: 'runSpeed' },
  { label: 'Shot Attack', value: 'shotAttack' },
  { label: 'Slow Walk Speed', value: 'slowWalkSpeed' },
  { label: 'Stamina', value: 'stamina' },
  { label: 'Support', value: 'support' },
  { label: 'Transport Speed', value: 'transportSpeed' },
  { label: 'Walk Speed', value: 'walkSpeed' },
] satisfies Array<{ label: string; value: keyof Pal }>;

export default function PalList({ pals }: PalListProps) {
  const [view, setView] = useQueryState('view', parseAsStringLiteral(['grid', 'table']).withDefault('grid'));
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(SORTS.map((s) => s.value)).withDefault('zukanIndex'),
  );
  const [sortDirection, setSortDirection] = useQueryState(
    'sortDirection',
    parseAsStringLiteral(['asc', 'desc']).withDefault('asc'),
  );
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [rarity, setRarity] = useQueryState('rarity', parseAsString.withDefault(''));
  const [elements, setElements] = useQueryState('elements', parseAsArrayOf(parseAsString).withDefault([]));
  const [work, setWork] = useQueryState('work', parseAsStringLiteral(WORK_SUITABILITIES.map(({ id }) => id)));
  const [partnerSkill, setPartnerSkill] = useQueryState('partnerSkill');

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
    .filter((pal) => (partnerSkill ? pal.partnerSkillIcon === +partnerSkill : true))
    .sort((pal1, pal2) => (work ? pal2.workSuitabilities[work] - pal1.workSuitabilities[work] : 0))
    .sort((pal1, pal2) => {
      if (!sort) return 0;
      const val1 = sortDirection === 'asc' ? pal1[sort] : pal2[sort];
      const val2 = sortDirection === 'asc' ? pal2[sort] : pal1[sort];
      if (typeof val1 === 'string' && typeof val2 === 'string') {
        return val1.localeCompare(val2);
      } else if (typeof val1 === 'number' && typeof val2 === 'number') {
        return val1 - val2;
      } else {
        return 0;
      }
    });

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

          <div className="flex flex-col items-end gap-2">
            <Select
              value={sort ?? ''}
              onValueChange={(v) => setSort(v === '' ? null : (v as (typeof SORTS)[number]['value']))}
            >
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
              variant="outline"
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

          <TabsContent value="grid" className="flex flex-col gap-4">
            <Select value={rarity} onValueChange={(v) => setRarity(v && v !== 'all' ? v : null)}>
              <SelectTrigger label="Rarity" icon={GemIcon} placeholder="Select rarity" />

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

            <CollapsibleFilter label="Work Suitability" defaultOpen>
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
            </CollapsibleFilter>

            <CollapsibleFilter label="Elements" defaultOpen>
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
            </CollapsibleFilter>

            <CollapsibleFilter label="Partner Skill">
              <ToggleGroup
                type="single"
                className="md:grid md:grid-cols-6 md:gap-1"
                value={partnerSkill?.toString() ?? ''}
                onValueChange={(v) => setPartnerSkill(v === '' ? null : v)}
              >
                {[...new Set(pals.map((p) => p.partnerSkillIcon))].map((partnerSkillIcon) => (
                  <ToggleGroupItem
                    key={partnerSkillIcon}
                    value={partnerSkillIcon.toString()}
                    className="w-10 p-0 md:w-auto"
                  >
                    <PartnerSkillImage id={partnerSkillIcon.toString()} />
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </CollapsibleFilter>
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

interface CollapsibleFilterProps extends CollapsibleProps {
  label: string;
}
function CollapsibleFilter({ label, className, children, ...rest }: CollapsibleFilterProps) {
  return (
    <Collapsible className={cn('space-y-1', className)} {...rest}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <CollapsibleTrigger className="group grid size-6 place-items-center rounded-md text-gray-11 transition-colors hover:bg-gray-4 hover:text-gray-12">
          <PlusIcon className="hidden size-4 group-data-[state=closed]:block" />
          <MinusIcon className="hidden size-4 group-data-[state=open]:block" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
