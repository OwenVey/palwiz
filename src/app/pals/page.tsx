import PalsGrid from '@/app/pals/grid';
import pals from '@/data/pals.json';
import { Suspense } from 'react';

export default function PalsPage() {
  const sortedPals = pals.sort((a, b) => a.zukanIndex - b.zukanIndex);

  return (
    <div className="mt-4">
      <Suspense>
        <PalsGrid pals={sortedPals} />
      </Suspense>
    </div>
  );
}
