'use client';

import { ItemImage } from '@/components/ItemImage';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { type Item } from '@/types';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';

type ItemsGridProps = {
  items: Item[];
};
export function ItemsGrid({ items }: ItemsGridProps) {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const filteredItems = items.filter(({ name }) => (search ? name.toLowerCase().includes(search.toLowerCase()) : true));

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="h-fit md:sticky md:top-[81px] md:w-72">
        <Input
          className="w-full"
          label="Search"
          placeholder="Search items"
          icon={SearchIcon}
          value={search}
          onChange={({ target }) => setSearch(target.value ? target.value : null)}
        />
      </Card>

      <div className="flex-1 @container">
        <div className="grid grid-cols-2 gap-4 @2xl:grid-cols-3 @4xl:grid-cols-4">
          {filteredItems.map((item) => (
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
    </div>
  );
}
