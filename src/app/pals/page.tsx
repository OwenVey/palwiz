import PalList from '@/app/pals/pal-list';
import { type Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Pals',
};

export default function PalsPage() {
  return (
    <Suspense>
      <PalList />
    </Suspense>
  );
}
