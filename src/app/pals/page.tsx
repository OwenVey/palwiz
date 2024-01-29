import PalsGrid from '@/app/pals/grid';
import pals from '@/data/pals.json';
import { type Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Pals',
};

export default function PalsPage() {
  const sortedPals = pals
    .filter((pal) => pal.zukanIndex > 0)
    .sort((a, b) => a.zukanIndex - b.zukanIndex)
    .map(({ id, name, zukanIndex, zukanIndexSuffix, rarity, elementType1, elementType2, workSuitabilities }) => ({
      id,
      name,
      zukanIndex,
      zukanIndexSuffix,
      rarity,
      elementType1,
      elementType2,
      workSuitabilities,
    }));

  return (
    <div className="py-4">
      <Suspense>
        <PalsGrid pals={sortedPals} />
      </Suspense>
    </div>
  );
}
