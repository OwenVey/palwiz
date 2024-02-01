import { ItemImage } from '@/components/ItemImage';
import { Card } from '@/components/ui/card';
import itemsJson from '@/data/items.json';
import { ItemSchema } from '@/schemas/item';
import { type Metadata } from 'next';
import Link from 'next/link';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Items',
};

export default function ItemsPage() {
  const items = z.array(ItemSchema).parse(itemsJson);

  return (
    <div>
      <div>{items.length} Results</div>

      <div className="mt-4 grid grid-cols-6 gap-4">
        {items.map((item) => (
          <Link key={item.internalId} href={`/items/${item.id}`}>
            <Card className="grid h-full place-items-center text-balance text-center text-sm" hoverEffect>
              <div className="rounded-full border border-gray-4 bg-gray-3 p-2">
                {item.imageName && <ItemImage className="size-12" id={item.imageName} />}
              </div>

              <div className="mt-2">{item.name}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
