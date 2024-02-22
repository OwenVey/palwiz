'use client';

import { useState } from 'react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import { ItemImage } from '@/components/ItemImage';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip } from '@/components/ui/tooltip';
import ALPHA_PALS from '@/data/alpha-pals.json';
import ITEMS from '@/data/items.json';
import { cn, getBadgeVariantForRate } from '@/lib/utils';
import { type Pal } from '@/types';
import Link from 'next/link';

interface ItemDropsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  pal: Pal;
}

export function ItemDropsCard({ pal, className, ...rest }: ItemDropsCardProps) {
  const [showAlphaDrops, setShowAlphaDrops] = useState(false);

  const normalDrops = pal.drops.map((drop) => ({ ...drop, item: ITEMS.find(({ id }) => id === drop.id)! }));
  const bossDrops =
    ALPHA_PALS.find(({ name }) => name === pal.name)?.drops.map((drop) => ({
      ...drop,
      item: ITEMS.find(({ id }) => id === drop.id)!,
    })) ?? [];

  const dropsToShow = showAlphaDrops ? bossDrops : normalDrops;

  return (
    <Card {...rest} className={cn('@container', className)}>
      <CardHeader>
        <CardTitle className="relative flex justify-between">
          Item Drops
          <div className="absolute -top-1 right-0 flex items-center gap-2">
            <Label htmlFor="alpha-mode">Normal</Label>
            <Switch id="alpha-mode" checked={showAlphaDrops} onCheckedChange={setShowAlphaDrops} />
            <Label htmlFor="alpha-mode">Alpha</Label>
          </div>
        </CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 gap-2 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
        {dropsToShow.map((drop) => (
          <Tooltip key={drop.id} content={drop.item.description} className="max-w-64">
            <Link href={`/items/${drop.item.id}`}>
              <Card className="relative flex h-full flex-col items-center border-gray-5 bg-gray-3 p-2" hoverEffect>
                <div className="absolute top-0 flex w-full justify-between p-1">
                  <Badge variant="iris">{drop.min === drop.max ? drop.min : `${drop.min}-${drop.max}`}</Badge>
                  <Badge variant={getBadgeVariantForRate(drop.rate)}>{drop.rate}%</Badge>
                </div>

                <div className="w-fit rounded-full border border-gray-5 bg-gray-4 p-2">
                  {drop.item.imageName && (
                    <ItemImage id={drop.item.imageName} alt={drop.item.name} width={56} height={56} />
                  )}
                </div>
                <div className="mt-2 text-center font-medium text-gray-12">{drop.item.name}</div>
              </Card>
            </Link>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
}
