'use client';

import { PalCombobox } from '@/components/PalCombobox';
import { EqualIcon, HelpCircleIcon, PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

export function ShortestPath() {
  const [parentA, setParentA] = useQueryState('parentA', { defaultValue: '', clearOnDefault: true });
  const [child, setChild] = useQueryState('child', { defaultValue: '', clearOnDefault: true });

  return (
    <>
      <div className="flex w-full flex-col items-center gap-1 sm:w-auto sm:flex-row sm:items-end sm:gap-4">
        <div className="flex w-full items-end gap-4">
          <PalCombobox label="Parent A" className="flex-1 sm:w-auto" value={parentA} setValue={setParentA} />
          <PlusIcon className="h-10 w-4 text-gray-10" />
          <div className="grid size-10 place-items-center rounded-lg border-2 border-dashed border-gray-6">
            <HelpCircleIcon className="size-5 text-gray-10" />
          </div>
        </div>
        <EqualIcon className="h-10 w-4 shrink-0 text-gray-10" />
        <PalCombobox
          label="Desired Child"
          className="-mt-5 w-full sm:mt-0 sm:w-auto"
          value={child}
          setValue={setChild}
        />
      </div>

      {/* <div>{child.name}</div> */}
    </>
  );
}
