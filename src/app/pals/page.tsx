import PalsGrid from '@/app/pals/grid';
import pals from '@/data/pals.json';
import { type Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Pals',
};

export default function PalsPage() {
  const sortedPals = pals.filter((pal) => pal.zukanIndex > 0).sort((a, b) => a.zukanIndex - b.zukanIndex);

  return (
    <div className="py-4">
      <Suspense>
        <PalsGrid pals={sortedPals} />
      </Suspense>
    </div>
  );
}
