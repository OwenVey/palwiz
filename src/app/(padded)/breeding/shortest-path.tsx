'use client';

import { getBreedingResult } from '@/lib/utils';

export function ShortestPath() {
  const child = getBreedingResult('incineram-noct', 'incineram-noct');

  return (
    <>
      <div>{child.name}</div>
    </>
  );
}
