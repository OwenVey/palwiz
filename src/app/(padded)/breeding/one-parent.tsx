'use client';

import { BreedingComboList } from '@/app/(padded)/breeding/breeding-combo-list';
import { PalCombobox } from '@/components/PalCombobox';
import { normalPals } from '@/data/parsed';
import { getBreedingResult, getPalById } from '@/lib/utils';
import { useQueryState } from 'nuqs';

export function OneParent() {
  const [parentAId, setParentAId] = useQueryState('parentA', { defaultValue: '', clearOnDefault: true });

  const parentA = getPalById(parentAId);

  const combos = parentA
    ? normalPals.map((parentB) => ({
        parentA,
        parentB,
        child: getBreedingResult(parentA.id, parentB.id)!,
      }))
    : [];

  return (
    <>
      <PalCombobox label="Parent" className="w-full sm:w-auto" value={parentAId} setValue={setParentAId} />

      {parentA && <BreedingComboList combos={combos} />}
    </>
  );
}
