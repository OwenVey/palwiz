import { ItemsGrid } from '@/app/(padded)/items/items-grid';
import { type Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Items',
};

export default function ItemsPage() {
  return (
    <Suspense>
      <ItemsGrid />
    </Suspense>
  );
}
