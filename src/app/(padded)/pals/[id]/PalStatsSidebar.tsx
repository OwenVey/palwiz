import { ElementImage } from '@/components/images/ElementImage';
import { PalImage } from '@/components/images/PalImage';
import { StickySidebar } from '@/components/StickySidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { cn, range } from '@/lib/utils';
import { type Pal } from '@/types';
import { HeartIcon, MapPinnedIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PalStatsSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  pal: Pal;
}

export function PalStatsSidebar({ pal, ...rest }: PalStatsSidebarProps) {
  const stats = [
    {
      label: 'Food',
      value: pal.foodAmount,
      element: (
        <div className="flex">
          {range(pal.foodAmount).map((i) => (
            <Image key={i} src="/images/food.png" height={18} width={18} alt="food" unoptimized />
          ))}
        </div>
      ),
    },
    {
      label: 'Size',
      value: pal.size,
    },
    {
      label: 'Rarity',
      value: pal.rarity,
    },
    {
      label: 'HP',
      value: pal.hp,
    },
    {
      label: 'Melee Attack',
      value: pal.meleeAttack,
    },
    {
      label: 'Shot Attack',
      value: pal.shotAttack,
    },
    {
      label: 'Defense',
      value: pal.defense,
    },
    {
      label: 'Support',
      value: pal.support,
    },
    {
      label: 'Craft Speed',
      value: pal.craftSpeed,
    },
    {
      label: 'Capture Rate',
      value: pal.captureRateCorrect,
    },
    {
      label: 'Price',
      value: pal.price,
    },
    {
      label: 'Slow Walk Speed',
      value: pal.slowWalkSpeed,
    },
    {
      label: 'Walk Speed',
      value: pal.walkSpeed,
    },
    {
      label: 'Transport Speed',
      value: pal.transportSpeed,
    },
    {
      label: 'Run Speed',
      value: pal.runSpeed,
    },
    {
      label: 'Ride Sprint Speed',
      value: pal.rideSprintSpeed,
    },
    {
      label: 'Male Probability',
      value: `${pal.maleProbability}%`,
    },
  ];
  return (
    <StickySidebar {...rest}>
      <div className="flex justify-between">
        <Badge className="h-fit items-baseline text-sm tracking-wider">
          <span className="text-gray-8">#{'000'.slice(pal.zukanIndex.toString().length)}</span>
          <span>{pal.zukanIndex}</span>
          <span className="text-xs">{pal.zukanIndexSuffix}</span>
        </Badge>

        <div className="flex flex-col gap-2">
          {[pal.elementType1, pal.elementType2].filter(Boolean).map((element) => (
            <Tooltip key={element} content={element} className="capitalize">
              <ElementImage name={element} alt={element} width={32} height={32} />
            </Tooltip>
          ))}
        </div>
      </div>

      <PalImage
        name={pal.id}
        alt={pal.name}
        width={144}
        height={144}
        className="mx-auto -mt-8 rounded-full border border-gray-6 bg-gray-1"
      />

      <div className="mt-2 text-center">
        <h1 className="text-2xl font-semibold text-gray-12">{pal.name}</h1>
        <p className="text-gray-11">{pal.title}</p>
      </div>

      <div className="mt-4 space-y-1">
        <Button className="w-full" size="sm" variant="secondary" asChild>
          <Link href={{ pathname: '/map', query: { pal: pal.id } }}>
            <MapPinnedIcon className="mr-2 size-4" />
            View Map Locations
          </Link>
        </Button>

        <Button className="w-full" size="sm" variant="secondary" asChild>
          <Link href={{ pathname: '/breeding', query: { child: pal.id } }}>
            <HeartIcon className="mr-2 size-4" />
            View Breed Combinations
          </Link>
        </Button>
      </div>

      <dl className="mt-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn('flex items-center justify-between rounded-lg p-3 text-sm', index % 2 === 0 && 'bg-gray-3')}
          >
            <dt className="font-medium text-gray-12">{stat.label}</dt>
            <dd className="font-mono text-gray-11">{stat.element ?? stat.value.toLocaleString()}</dd>
          </div>
        ))}
      </dl>
    </StickySidebar>
  );
}
