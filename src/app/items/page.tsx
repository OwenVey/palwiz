import { Card } from '@/components/ui/card';
import itemJson from '@/data/items.json';
import { ItemSchema } from '@/schemas/item';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';

export default function ItemsPage() {
  const items = z.array(ItemSchema).parse(itemJson);

  return (
    <div>
      <div>{items.length} Results</div>

      <div className="mt-4 grid grid-cols-6 gap-4">
        {items.map((item) => (
          <Link key={item.internalId} href={`/items/${item.id}`}>
            <Card className="grid h-full place-items-center text-balance text-center text-sm" hoverEffect>
              <div className="rounded-full border border-gray-4 bg-gray-3 p-2">
                {item.imageName ? (
                  <Image
                    src={`/images/items/${item.imageName}.webp`}
                    alt={item.internalId}
                    width={50}
                    height={50}
                    unoptimized
                  />
                ) : (
                  <div className="bg-red-9">NONE</div>
                )}
              </div>

              <div className="mt-2">{item.name}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
