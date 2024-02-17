import { Breeding } from '@/app/(padded)/breeding/breeding';
import { type Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Breeding',
};

export default function BreedingPage() {
  return (
    <Suspense>
      <Breeding />
    </Suspense>
  );
}
