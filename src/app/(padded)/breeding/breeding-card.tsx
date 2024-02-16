import { PalImage } from '@/components/PalImage';
import { Card } from '@/components/ui/card';
import { type Pal } from '@/types';
import Link, { type LinkProps } from 'next/link';

interface BreedingCardProps extends Omit<LinkProps, 'href'> {
  pal: Pal;
  className?: string
}
export function BreedingCard({ pal, className, ...rest }: BreedingCardProps) {
  return (
    <Link {...rest} href={`/pals/${pal.id}`} className={className}>
      <Card className="flex h-28 w-40 flex-col items-center justify-center gap-2" hoverEffect>
        <PalImage id={pal.id} className="size-14 rounded-full border border-gray-6 bg-gray-1" />
        <div className="text-sm text-gray-12">{pal.name}</div>
      </Card>
    </Link>
  );
}
