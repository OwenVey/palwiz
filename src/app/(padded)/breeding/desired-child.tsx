'use client';

import { BreedingCard } from '@/app/(padded)/breeding/breeding-card';
import { PalCombobox } from '@/components/PalCombobox';
import { normalPals } from '@/data/parsed';
import { getBreedingResult } from '@/lib/utils';
import { type Pal } from '@/types';
import { EqualIcon, PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

export function DesiredChild() {
  const [parentAId, setParentAId] = useQueryState('parentA', { defaultValue: '', clearOnDefault: true });
  const [combos, setCombos] = useState<Array<{ parentA: Pal; parentB: Pal }>>([]);

  const child = normalPals.find((pal) => pal.id === parentAId);

  useEffect(() => {
    if (parentAId) {
      const combos: Array<{ parentA: Pal; parentB: Pal }> = [];
      for (const parentA of normalPals) {
        for (const parentB of normalPals) {
          const child = getBreedingResult(parentA.id, parentB.id);
          if (child.id === parentAId) {
            combos.push({ parentA, parentB });
          }
        }
      }
      setCombos(combos);
    }
  }, [parentAId]);

  return (
    <div className="flex flex-col items-center">
      <PalCombobox label="Parent 1" className="w-fit" value={parentAId} setValue={setParentAId} />

      <div className="mt-4 flex flex-col gap-2">
        {child &&
          combos.map(({ parentA, parentB }) => (
            <div key={`${parentA.id}+${parentB.id}`} className="flex items-center gap-4">
              <BreedingCard pal={parentA} />
              <PlusIcon className="size-4 text-gray-11" />
              <BreedingCard pal={parentB} />
              <EqualIcon className="size-4 text-gray-11" />
              <BreedingCard pal={child} />
            </div>
          ))}
      </div>
    </div>
  );
}
