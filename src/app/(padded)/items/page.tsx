import { itemsQueryCache } from '@/app/(padded)/items/items-search-params';
import { ItemsSidebar } from '@/app/(padded)/items/items-sidebar';
import { ItemImage } from '@/components/images/ItemImage';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import ITEMS from '@/data/items.json';
import { cn, sortArrayByPropertyInDirection } from '@/lib/utils';
import { type PageParams } from '@/types';
import { capitalCase } from 'change-case';
import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Items',
};

const RARITY_MAP = {
  0: 'common',
  1: 'uncommon',
  2: 'rare',
  3: 'epic',
  4: 'legendary',
} as const;
type RarityKey = keyof typeof RARITY_MAP;

function getItemRarityClass(rarity: number) {
  switch (rarity) {
    case 0:
      return 'bg-gray-2 border-gray-4 hover:bg-gray-3 hover:border-gray-9 hover:shadow-gray-5';
    case 1:
      return 'bg-green-2 border-green-4 hover:bg-green-3 hover:border-green-9 hover:shadow-green-5';
    case 2:
      return 'bg-blue-2 border-blue-4 hover:bg-blue-3 hover:border-blue-9 hover:shadow-blue-5';
    case 3:
      return 'bg-purple-2 border-purple-4 hover:bg-purple-3 hover:border-purple-9 hover:shadow-purple-5';
    case 4:
      return 'bg-yellow-2 border-yellow-4 hover:bg-yellow-3 hover:border-yellow-8 hover:shadow-yellow-5';
    default:
      return 'bg-red-2 border-red-4 hover:bg-red-3 hover:border-red-9 hover:shadow-red-5';
  }
}

const CATEGORIES = [...new Set(ITEMS.map(({ typeA }) => typeA))].sort();
const SUBCATEGORIES = [...new Set(ITEMS.map(({ typeB }) => typeB))].sort();

export default function ItemsPage({ searchParams }: PageParams) {
  const { search, sort, sortDirection, category, subcategory, rarities } = itemsQueryCache.parse(searchParams);

  const filteredItems = sortArrayByPropertyInDirection(ITEMS, sort, sortDirection).filter((item) => {
    const nameMatches = !search || item.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatches = !category || item.typeA === category;
    const subcategoryMatches = !subcategory || item.typeB === subcategory;
    const rarityMatches = (() => {
      if (!(item.rarity in RARITY_MAP)) return false;
      return rarities.length === 0 || rarities.includes(RARITY_MAP[item.rarity as RarityKey]);
    })();

    return nameMatches && categoryMatches && subcategoryMatches && rarityMatches;
  });

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <ItemsSidebar categories={CATEGORIES} subcategories={SUBCATEGORIES} numResults={filteredItems.length} />

      <div className="flex-1 @container">
        {filteredItems.length === 0 ? (
          <div className="grid h-full place-items-center text-gray-11">No items found</div>
        ) : (
          <div className="grid auto-rows-fr grid-cols-2 gap-4 @md:grid-cols-3 @xl:grid-cols-4 @[44rem]:grid-cols-5">
            {filteredItems.map((item) => (
              <Link key={item.internalId} href={`/items/${item.id}`}>
                <Card
                  className={cn('relative flex h-full flex-col items-center', getItemRarityClass(item.rarity))}
                  hoverEffect
                >
                  {sort !== 'name' && (
                    <Badge variant="primary" className="absolute -right-1 -top-1">
                      {typeof item[sort] === 'number'
                        ? item[sort].toLocaleString()
                        : typeof item[sort] === 'string'
                          ? capitalCase(item[sort] as string)
                          : item[sort]}
                    </Badge>
                  )}

                  <div className="rounded-full border border-gray-4 bg-gray-3 p-1">
                    <ItemImage name={item.imageName} alt={item.name} width={60} height={60} />
                  </div>

                  <div className="mt-2 flex flex-1 items-center">
                    <div className="line-clamp-2 text-balance text-center text-sm font-medium text-gray-12 [overflow-wrap:anywhere]">
                      {item.name}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
