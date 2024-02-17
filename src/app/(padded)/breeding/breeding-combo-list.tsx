import { BreedingCard } from '@/app/(padded)/breeding/breeding-card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { type BreedingCombo } from '@/types';
import { EqualIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { memo } from 'react';
import { FixedSizeList } from 'react-window';

const GUTTER_SIZE = 8;

export const BreedingComboList = memo(function BreedingComboList({ combos }: { combos: BreedingCombo[] }) {
  const [search, setSearch] = useQueryState('search', { defaultValue: '', clearOnDefault: true });

  const filteredCombos = search
    ? combos.filter(
        ({ parentA, parentB }) =>
          parentA.name.toLowerCase().includes(search.toLowerCase()) ||
          parentB.name.toLowerCase().includes(search.toLowerCase()),
      )
    : combos;

  return (
    <div className="flex w-full flex-col items-center">
      <Separator className="my-4" />
      <div className="mb-4 flex w-full items-center gap-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search combinations..."
          icon={SearchIcon}
        />
        <div className="text-sm text-gray-11">{filteredCombos.length} results</div>
      </div>

      <List combos={filteredCombos} />
    </div>
  );
});

export const List = memo(function List({ combos }: { combos: BreedingCombo[] }) {
  if (combos.length === 0) return <div className="mt-16 text-sm text-gray-11">No combinations found</div>;

  return (
    <FixedSizeList height={700} itemCount={combos.length} itemSize={112 + GUTTER_SIZE} width={576} itemData={combos}>
      {({ index, style, data }) => (
        <div
          style={{ ...style, top: style.top ?? 0 + GUTTER_SIZE, height: style.height ?? 0 - GUTTER_SIZE }}
          className="mb-2 flex items-center justify-between"
        >
          <BreedingCard pal={data[index]!.parentA} />
          <PlusIcon className="size-4 shrink-0 text-gray-11" />
          <BreedingCard pal={data[index]!.parentB} />
          <EqualIcon className="size-4 shrink-0 text-gray-11" />
          <BreedingCard pal={data[index]!.child} />
        </div>
      )}
    </FixedSizeList>
  );
});
