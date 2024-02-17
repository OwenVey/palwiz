'use client';

import { BreedingComboList } from '@/app/(padded)/breeding/breeding-combo-list';
import { PalCombobox } from '@/components/PalCombobox';
import { normalPals } from '@/data/parsed';
import { getBreedingResult, getPalById } from '@/lib/utils';
import { type BreedingCombo } from '@/types';
import { useQueryState } from 'nuqs';

export function DesiredChild() {
  const [parentAId, setParentAId] = useQueryState('parentA', { defaultValue: '', clearOnDefault: true });

  const child = getPalById(parentAId);

  const calculateCombos = (parentId: string) => {
    const newCombos: BreedingCombo[] = [];
    for (let i = 0; i < normalPals.length; i++) {
      const parentA = normalPals[i]!;
      for (let j = i; j < normalPals.length; j++) {
        const parentB = normalPals[j]!;
        const child = getBreedingResult(parentA.id, parentB.id)!;
        if (child.id === parentId) {
          newCombos.push({ parentA, parentB, child });
        }
      }
    }
    return newCombos;
  };

  const combos = parentAId ? calculateCombos(parentAId) : [];

  return (
    <>
      <PalCombobox label="Desired Child" className="w-full sm:w-auto" value={parentAId} setValue={setParentAId} />

      {child && <BreedingComboList combos={combos} />}
    </>
  );
}
