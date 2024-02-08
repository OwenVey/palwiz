import { ElementImage } from '@/components/ElementImage';
import { PalImage } from '@/components/PalImage';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { type Pal } from '@/types';

interface PalStatsSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  pal: Pal;
}

export function PalStatsSidebar({ pal, ...rest }: PalStatsSidebarProps) {
  const stats = [
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
      label: 'Food Amount',
      value: pal.foodAmount,
    },
    {
      label: 'Male Probability',
      value: pal.maleProbability,
    },
  ];
  return (
    <Card {...rest}>
      <div className="relative flex flex-col">
        <Badge className="absolute items-baseline text-sm tracking-wider">
          <span className="text-gray-8">#{'000'.slice(pal.zukanIndex.toString().length)}</span>
          <span>{pal.zukanIndex}</span>
          <span className="text-xs">{pal.zukanIndexSuffix}</span>
        </Badge>

        <div className="absolute right-0 flex flex-col gap-2 pr-[inherit]">
          {[pal.elementType1, pal.elementType2].filter(Boolean).map((element) => (
            <ElementImage key={element} element={element} className="size-8" />
          ))}
        </div>

        <PalImage id={pal.id} className="mx-auto mt-2 size-36 rounded-full border border-gray-6 bg-gray-1" />

        <div className="mt-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-12">{pal.name}</h1>
          <p className="text-gray-11">{pal.title}</p>
        </div>

        <dl className="mt-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn('flex items-center justify-between rounded-lg p-3 text-sm', index % 2 === 0 && 'bg-gray-3')}
            >
              <dt className="font-medium text-gray-12">{stat.label}</dt>
              <dd className="font-mono text-gray-11">{stat.value.toLocaleString()}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}
