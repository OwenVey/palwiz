import { PalsGrid } from '@/app/(padded)/pals/pals-grid';
import { type Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Pals',
};

export default function PalsPage() {
  return (
    <Suspense>
      <PalsGrid />
    </Suspense>
  );
}
