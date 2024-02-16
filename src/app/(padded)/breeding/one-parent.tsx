'use client';

import { BreedingComboList } from '@/app/(padded)/breeding/breeding-combo-list';
import { PalCombobox } from '@/components/PalCombobox';
import { normalPals } from '@/data/parsed';
import { getBreedingResult } from '@/lib/utils';
import { type BreedingCombo } from '@/types';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

export function OneParent() {
  const [parentAId, setParentAId] = useQueryState('parentA', { defaultValue: '', clearOnDefault: true });
  const [combos, setCombos] = useState<BreedingCombo[]>([]);

  const parentA = normalPals.find((pal) => pal.id === parentAId);

  useEffect(() => {
    if (parentA) {
      const combos = normalPals.map((parentB) => ({
        parentA,
        parentB,
        child: getBreedingResult(parentA.id, parentB.id),
      }));
      setCombos(combos);
    }
  }, [parentA]);

  return (
    <>
      <PalCombobox label="Parent" className="w-full sm:w-auto" value={parentAId} setValue={setParentAId} />

      {parentA && <BreedingComboList combos={combos} />}
    </>
  );
}
