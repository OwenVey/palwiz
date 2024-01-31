import PalsGrid from '@/app/pals/grid';
import palsJson from '@/data/pals.json';
import { PalSchema } from '@/schemas/pal';
import { type Metadata } from 'next';
import { Suspense } from 'react';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Pals',
};

export default function PalsPage() {
  const pals = z.array(PalSchema).parse(palsJson);

  const sortedPals = pals
    .filter((pal) => pal.zukanIndex > 0)
    .map(({ id, name, zukanIndex, zukanIndexSuffix, rarity, elementType1, elementType2, workSuitabilities }) => ({
      id,
      name,
      zukanIndex,
      zukanIndexSuffix,
      rarity,
      elementType1,
      elementType2,
      workSuitabilities,
    }))
    .sort((a, b) => a.zukanIndex - b.zukanIndex);

  return (
    <Suspense>
      <PalsGrid pals={sortedPals} />
    </Suspense>
  );
}
