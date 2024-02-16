'use client';

import { BreedingCard } from '@/app/(padded)/breeding/breeding-card';
import { PalCombobox } from '@/components/PalCombobox';
import { getBreedingResult } from '@/lib/utils';
import { type Pal } from '@/types';
import { PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

export function TwoParents() {
  const [parentA, setParentA] = useQueryState('parentA', { defaultValue: '', clearOnDefault: true });
  const [parentB, setParentB] = useQueryState('parentB', { defaultValue: '', clearOnDefault: true });
  const [child, setChild] = useState<Pal | null>(null);

  useEffect(() => {
    if (parentA && parentB) setChild(getBreedingResult(parentA, parentB));
  }, [parentA, parentB]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-end gap-4">
        <PalCombobox label="Parent 1" value={parentA} setValue={setParentA} />
        <PlusIcon className="size-4 h-10 text-gray-10" />
        <PalCombobox label="Parent 1" value={parentB} setValue={setParentB} />
      </div>
      {child && <BreedingCard pal={child} className="mt-4" />}
    </div>
  );
}
