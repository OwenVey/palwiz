import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, ArrowUpDownIcon } from 'lucide-react';

type SortFilterProps<T extends string> = {
  sort: T;
  options: { label: string; value: T }[];
  direction: 'asc' | 'desc';
  onDirectionChange: (direction: 'asc' | 'desc') => void;
  onSortChange: (sort: T) => void;
};
export function SortFilter<T extends string>({
  options,
  sort,
  direction,
  onSortChange,
  onDirectionChange,
}: SortFilterProps<T>) {
  return (
    <div className="flex flex-col items-end gap-2">
      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger label="Sort" icon={ArrowUpDownIcon} placeholder="Sort by" />

        <SelectContent>
          {options.map(({ label, value }) => (
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
        value={direction}
        onValueChange={(value: 'asc' | 'desc') => value && onDirectionChange(value)}
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
}
