'use client';

import { PalCombobox } from '@/components/PalCombobox';
import { PalImage } from '@/components/PalImage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { normalPals } from '@/data/parsed';
import { cn, getBreedingResult, getPalById, notEmpty } from '@/lib/utils';
import { type BreedingCombo, type Pal } from '@/types';
import { useDebounce } from '@uidotdev/usehooks';
import { EqualIcon, PlusIcon, RotateCcwIcon, SearchIcon } from 'lucide-react';
import Link, { type LinkProps } from 'next/link';
import { useQueryState } from 'nuqs';
import { memo, useMemo } from 'react';

function getCombos(parentAId: string, parentBId: string, childId: string): BreedingCombo[] {
  console.log('get combos', { parentAId, parentBId, childId });

  // calculate child of both parents
  if (parentAId && parentBId) {
    const child = getBreedingResult(parentAId, parentBId)!;
    if (childId && childId !== child.id) return [];

    return [
      {
        parentA: getPalById(parentAId)!,
        parentB: getPalById(parentBId)!,
        child,
      },
    ];
  }

  // calculate all combos for a specific child
  if (childId) {
    let combos = normalPals.flatMap((parentA, i) =>
      normalPals
        .slice(i)
        .map((parentB) => {
          const child = getBreedingResult(parentA.id, parentB.id);
          return child && child.id === childId ? { parentA, parentB, child } : null;
        })
        .filter(notEmpty),
    );

    // filter only combos where one of the parent matches parentFilterId
    const parentFilterId = parentAId || parentBId;
    if (parentFilterId) {
      combos = combos
        .filter(({ parentA, parentB }) => parentA.id === parentFilterId || parentB.id === parentFilterId)
        // flip parents if needed so that the order matches the inputs above
        .map(({ parentA, parentB, child }) => ({
          parentA: parentA.id === parentAId ? parentA : parentB,
          parentB: parentA.id === parentAId ? parentB : parentA,
          child,
        }));
    }
    return combos;
  }

  // calculate all combos for single parent
  if ((parentAId && !parentBId) || (parentBId && !parentAId)) {
    const parentPal = getPalById(parentAId || parentBId)!;
    return normalPals.map((otherParent) => ({
      parentA: parentAId ? parentPal : otherParent,
      parentB: parentBId ? parentPal : otherParent,
      child: getBreedingResult(parentPal.id, otherParent.id)!,
    }));
  }

  return [];
}

export function Breeding() {
  const [parentAId, setParentAId] = useQueryState('parentA', { defaultValue: '', clearOnDefault: true });
  const [parentBId, setParentBId] = useQueryState('parentB', { defaultValue: '', clearOnDefault: true });
  const [childId, setChildId] = useQueryState('child', { defaultValue: '', clearOnDefault: true });
  const [search, setSearch] = useQueryState('search', { defaultValue: '', clearOnDefault: true });
  const debouncedSearch = useDebounce(search, 100);

  const isAnyInputSet = parentAId !== '' || parentBId !== '' || childId !== '';
  const combos = useMemo(() => getCombos(parentAId, parentBId, childId), [parentAId, parentBId, childId]);

  const filteredCombos = debouncedSearch
    ? combos.filter(
        ({ parentA, parentB }) =>
          parentA.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          parentB.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      )
    : combos;

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="h-fit p-0 md:sticky md:top-[81px] md:w-72">
        <div className="flex w-full flex-col items-center gap-4 p-4">
          <PalCombobox label="Parent A" className="w-full" value={parentAId} setValue={setParentAId} />
          <PlusIcon className="size-4 text-gray-10" />
          <PalCombobox label="Parent B" className="-mt-5 w-full" value={parentBId} setValue={setParentBId} />
          <EqualIcon className="size-4 text-gray-10" />
          <PalCombobox label="Child" className="-mt-5 w-full" value={childId} setValue={setChildId} />
        </div>

        {isAnyInputSet && (
          <>
            <Separator className="my-2" />
            <div className="flex w-full flex-col gap-2 p-4">
              <Input
                label={`${filteredCombos.length} Combinations`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search combinations..."
                icon={SearchIcon}
              />
              <Button asChild variant="outline" className="w-full">
                <Link href="/breeding2">
                  <RotateCcwIcon className="mr-1 size-4" />
                  Reset
                </Link>
              </Button>
            </div>
          </>
        )}
      </Card>

      <div className="flex-1 @container">
        {isAnyInputSet ? (
          <List combos={filteredCombos} />
        ) : (
          <div className="grid h-full place-items-center text-sm text-gray-11">
            Select any combination of parent(s) and/or child to see breeding results
          </div>
        )}
      </div>
    </div>
  );
}

const List = memo(function List({ combos }: { combos: BreedingCombo[] }) {
  if (combos.length === 0)
    return <div className="grid h-full place-items-center text-sm text-gray-11">No combinations found</div>;

  return (
    <div className="mx-auto space-y-2 md:max-w-xl">
      {combos.map(({ parentA, parentB, child }) => (
        <Card key={`${parentA.id}+${parentB.id}=${child.id}`} className="flex items-center justify-between p-2">
          <PalCard pal={parentA} className="flex-1" />
          <PlusIcon className="mx-4 size-4 shrink-0 text-gray-11" />
          <PalCard pal={parentB} className="flex-1" />
          <EqualIcon className="mx-4 size-4 shrink-0 text-gray-11" />
          <PalCard pal={child} className="flex-1" />
        </Card>
      ))}
    </div>
  );
});

interface PalCardProps extends Omit<LinkProps, 'href'> {
  pal: Pal;
  className?: string;
}
export function PalCard({ pal, className, ...rest }: PalCardProps) {
  return (
    <Link {...rest} href={`/pals/${pal.id}`} className={cn(className, '')}>
      <Card className="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-3 p-2" hoverEffect>
        <PalImage id={pal.id} className="size-14 rounded-full border border-gray-6 bg-gray-1" />
        <div className="text-center text-sm text-gray-12">{pal.name}</div>
      </Card>
    </Link>
  );
}
