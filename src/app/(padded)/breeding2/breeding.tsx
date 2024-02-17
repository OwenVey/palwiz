'use client';

import { BreedingComboList } from '@/app/(padded)/breeding/breeding-combo-list';
import { PalCombobox } from '@/components/PalCombobox';
import { Button } from '@/components/ui/button';
import { normalPals } from '@/data/parsed';
import { getBreedingResult, getPalById, notEmpty } from '@/lib/utils';
import { type BreedingCombo } from '@/types';
import { EqualIcon, PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

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

  const combos = useMemo(() => getCombos(parentAId, parentBId, childId), [parentAId, parentBId, childId]);

  function clear() {
    void setParentAId('');
    void setParentBId('');
    void setChildId('');
  }

  return (
    <div>
      <div className="flex w-full flex-col flex-wrap items-center sm:w-auto sm:flex-row sm:items-end sm:gap-4">
        <PalCombobox label="Parent A" className="w-full sm:w-fit" value={parentAId} setValue={setParentAId} />
        <PlusIcon className="size-4 h-10 shrink-0 text-gray-10" />
        <PalCombobox
          label="Parent B"
          className="-mt-5 w-full sm:mt-0 sm:w-fit"
          value={parentBId}
          setValue={setParentBId}
        />
        <EqualIcon className="size-4 h-10 shrink-0 text-gray-10" />
        <PalCombobox label="Child" className="-mt-5 w-full sm:mt-0 sm:w-fit" value={childId} setValue={setChildId} />
        <Button variant="secondary" onClick={clear} className="mt-2 w-full sm:mt-0 sm:w-auto">
          Clear
        </Button>
      </div>

      {(parentAId || parentBId || childId) && <BreedingComboList combos={combos} />}
    </div>
  );
}
