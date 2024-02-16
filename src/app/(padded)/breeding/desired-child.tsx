'use client';

import { BreedingComboList } from '@/app/(padded)/breeding/breeding-combo-list';
import { PalCombobox } from '@/components/PalCombobox';
import { normalPals } from '@/data/parsed';
import { getBreedingResult } from '@/lib/utils';
import { type BreedingCombo, type Pal } from '@/types';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

export function DesiredChild() {
  const [parentAId, setParentAId] = useQueryState('parentA', { defaultValue: '', clearOnDefault: true });
  const [combos, setCombos] = useState<BreedingCombo[]>([]);

  const child = normalPals.find((pal) => pal.id === parentAId);

  useEffect(() => {
    if (parentAId) {
      const combos: Array<{ parentA: Pal; parentB: Pal; child: Pal }> = [];
      for (let i = 0; i < normalPals.length; i++) {
        const parentA = normalPals[i]!;
        for (let j = i; j < normalPals.length; j++) {
          const parentB = normalPals[j]!;
          const child = getBreedingResult(parentA.id, parentB.id);
          if (child.id === parentAId) {
            combos.push({ parentA, parentB, child });
          }
        }
      }
      setCombos(combos);
    }
  }, [parentAId]);

  return (
    <>
      <PalCombobox label="Desired Child" value={parentAId} setValue={setParentAId} />

      {child && <BreedingComboList combos={combos} />}
    </>
  );
}
