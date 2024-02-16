'use client';

import { PalCombobox } from '@/components/PalCombobox';
import { EqualIcon, HelpCircleIcon, PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

export function ShortestPath() {
  const [parentA, setParentA] = useQueryState('parentA', { defaultValue: '', clearOnDefault: true });
  const [child, setChild] = useQueryState('child', { defaultValue: '', clearOnDefault: true });

  return (
    <>
      <div className="flex items-end gap-4">
        <PalCombobox label="Parent A" value={parentA} setValue={setParentA} />
        <PlusIcon className="size-4 h-10 text-gray-10" />
        <div className="grid size-10 place-items-center rounded-lg border-2 border-dashed border-gray-6">
          <HelpCircleIcon className="size-5 text-gray-10" />
        </div>
        <EqualIcon className="size-4 h-10 text-gray-10" />
        <PalCombobox label="Desired Child" value={child} setValue={setChild} />
      </div>

      {/* <div>{child.name}</div> */}
    </>
  );
}
