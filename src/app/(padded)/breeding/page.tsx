import { BreedingTabs } from '@/app/(padded)/breeding/breeding-tabs';

import { type Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Breeding',
};

export default function BreedingPage() {
  return (
    <Suspense>
      <BreedingTabs />
    </Suspense>
  );
}
