import { BreedingTabs } from '@/app/(padded)/breeding/breeding-tabs';

import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breeding',
};

export default function BreedingPage() {
  return (
    <div>
      <BreedingTabs />
    </div>
  );
}
