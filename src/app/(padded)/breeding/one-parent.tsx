'use client';

import { BreedingCard } from '@/app/(padded)/breeding/breeding-card';
import { PalCombobox } from '@/components/PalCombobox';
import { normalPals } from '@/data/parsed';
import { getBreedingResult } from '@/lib/utils';
import { type Pal } from '@/types';
import { EqualIcon, PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

export function OneParent() {
  const [parentAId, setParentAId] = useQueryState('parentA', { defaultValue: '', clearOnDefault: true });
  const [combos, setCombos] = useState<Array<{ parentB: Pal; child: Pal }>>([]);

  const parentA = normalPals.find((pal) => pal.id === parentAId);

  useEffect(() => {
    if (parentAId) {
      const combos = normalPals.map((parentB) => ({ parentB, child: getBreedingResult(parentAId, parentB.id) }));
      setCombos(combos);
    }
  }, [parentAId]);

  return (
    <div className="flex flex-col items-center">
      <PalCombobox label="Parent 1" className="w-fit" value={parentAId} setValue={setParentAId} />

      <div className="mt-4 flex flex-col gap-2">
        {parentA &&
          combos.map(({ parentB, child }) => (
            <div key={parentB.id} className="flex items-center gap-4">
              <BreedingCard pal={parentA} />
              <PlusIcon className="size-4" />
              <BreedingCard pal={parentB} />
              <EqualIcon className="size-4" />
              <BreedingCard pal={child} />
              {/* {parentA.name} + {parentB.name} = {child.name} */}
            </div>
          ))}
      </div>
    </div>
  );
}
