'use client';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, ArrowUpDownIcon } from 'lucide-react';
import { parseAsStringLiteral, useQueryState } from 'nuqs';

export function useQuerySort<T extends string>(
  sorts: { label: string; value: T }[],
  defaultSort: T,
  defaultSortDirection: 'asc' | 'desc' = 'asc',
) {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(sorts.map((s) => s.value))
      .withDefault(defaultSort)
      .withOptions({ clearOnDefault: true }),
  );
  const [sortDirection, setSortDirection] = useQueryState<'asc' | 'desc'>(
    'sortDirection',
    parseAsStringLiteral(['asc', 'desc']).withDefault(defaultSortDirection).withOptions({ clearOnDefault: true }),
  );

  const Component = () => (
    <div className="flex flex-col items-end gap-2">
      <Select value={sort} onValueChange={(v) => setSort(v as T)}>
        <SelectTrigger label="Sort" icon={ArrowUpDownIcon} placeholder="Sort by" />

        <SelectContent>
          {sorts.map(({ label, value }) => (
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
  );

  return [{ sort, sortDirection }, { setSort, setSortDirection }, Component] as const;
}
