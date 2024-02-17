import { Breeding } from '@/app/(padded)/breeding2/breeding';
import { type Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Breeding',
};

export default function Breeding2Page() {
  return (
    <Suspense>
      <Breeding />
    </Suspense>
  );
}
