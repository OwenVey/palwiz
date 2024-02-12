import { PalCombobox } from '@/components/PalCombobox';
import { EqualIcon, PlusIcon } from 'lucide-react';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breeding',
};

export default function BreedingPage() {
  return (
    <div>
      <div className="flex items-end gap-4">
        <PalCombobox label="Parent 1" />
        <PlusIcon className="size-4 h-10 text-gray-10" />
        <PalCombobox label="Parent 1" />
        <EqualIcon className="size-4 h-10 text-gray-10" />
      </div>
    </div>
  );
}
