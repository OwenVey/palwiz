import { ItemsGrid } from '@/app/items/items-grid';
import itemsJson from '@/data/items.json';
import { ItemSchema } from '@/schemas/item';
import { type Metadata } from 'next';
import { Suspense } from 'react';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Items',
};

export default function ItemsPage() {
  const items = z.array(ItemSchema).parse(itemsJson);
  return (
    <Suspense>
      <ItemsGrid items={items} />
    </Suspense>
  );
}
