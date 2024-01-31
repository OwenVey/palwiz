'use client';

import { useState } from 'react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import { ItemImage } from '@/components/ItemImage';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { type Drop } from '@/types';
import Link from 'next/link';

const getBadgeVariantForRate = (rate: number): BadgeProps['variant'] => {
  if (rate >= 0 && rate <= 20) {
    return 'red';
  } else if (rate > 20 && rate <= 40) {
    return 'yellow';
  } else if (rate > 40 && rate <= 60) {
    return 'orange';
  } else if (rate > 60 && rate <= 80) {
    return 'lime';
  } else if (rate > 80 && rate <= 100) {
    return 'green';
  } else {
    return 'default';
  }
};

interface ItemDropsCardProps {
  drops: Drop[];
  alphaDrops: Drop[];
}

export function ItemDropsCard({ drops, alphaDrops }: ItemDropsCardProps) {
  const [showAlphaDrops, setShowAlphaDrops] = useState(false);
  const dropsToShow = showAlphaDrops ? alphaDrops : drops;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="relative flex justify-between">
          Item Drops
          <div className="absolute right-0 flex items-center gap-2">
            <Label htmlFor="alpha-mode">Normal</Label>
            <Switch id="alpha-mode" checked={showAlphaDrops} onCheckedChange={setShowAlphaDrops} />
            <Label htmlFor="alpha-mode">Alpha</Label>
          </div>
        </CardTitle>
      </CardHeader>
      <div className="grid grid-cols-4 gap-2">
        {dropsToShow.map((drop) => (
          <Tooltip key={drop.id}>
            <TooltipTrigger asChild>
              <Link href={`/items/${drop.id}`}>
                <Card className="relative flex h-full flex-col items-center bg-gray-3 p-2" hoverEffect>
                  <div className="absolute top-0 flex w-full justify-between p-[inherit] font-mono text-xs tracking-wider text-white">
                    <Badge variant="iris">{drop.min === drop.max ? drop.min : `${drop.min}-${drop.max}`}</Badge>
                    <Badge variant={getBadgeVariantForRate(drop.rate)}>{drop.rate}</Badge>
                  </div>

                  <div className="w-fit rounded-full border border-gray-5 bg-gray-4 p-2">
                    <ItemImage id={drop.id} className="size-14" />
                  </div>
                  <div className="mt-2 text-center font-medium text-gray-12">{drop.name}</div>
                </Card>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="max-w-64">{drop.description}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
}

export default ItemDropsCard;
