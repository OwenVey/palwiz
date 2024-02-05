import PalList from '@/app/pals/pal-list';
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

  const sortedPals = pals.sort((a, b) => a.zukanIndex - b.zukanIndex);

  return (
    <Suspense>
      <PalList pals={sortedPals} />
    </Suspense>
  );
}
