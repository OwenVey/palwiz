'use client';

import { PalImage } from '@/components/images/PalImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useQuerySort } from '@/hooks/useQuerySort';
import { cn, getBadgeVariantForRate, sortArrayByPropertyInDirection } from '@/lib/utils';
import { ArrowUpIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SORTS = [
  { label: 'Name', value: 'name' },
  { label: 'Drop Rate', value: 'rate' },
  { label: 'Min # Dropped', value: 'min' },
  { label: 'Max # Dropped', value: 'max' },
] satisfies Array<{ label: string; value: keyof DroppedByPal }>;

type SortType = (typeof SORTS)[number]['value'];

type DroppedByPal = {
  id: string;
  max: number;
  min: number;
  rate: number;
  name: string;
  isBoss: boolean;
  internalName: string;
};

export function DroppedByPalsCard({ droppedByPals }: { droppedByPals: DroppedByPal[] }) {
  const [{ sort, sortDirection }, { setSort, setSortDirection }] = useQuerySort(SORTS, 'max', 'desc');

  const sortedDrops = sortArrayByPropertyInDirection(
    droppedByPals.sort((a, b) => a.name.localeCompare(b.name)),
    sort,
    sortDirection,
  );

  return (
    <Card className="@container">
      <CardHeader className="relative">
        <CardTitle>Dropped By</CardTitle>
        <CardDescription>All pals who drop this item</CardDescription>
        <div className="absolute right-0 top-0 flex gap-2">
          <Select value={sort} onValueChange={(v) => setSort(v as SortType)}>
            <SelectTrigger placeholder="Sorty by" className="w-40" />

            <SelectContent>
              {SORTS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            size="icon"
            variant="outline"
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          >
            <ArrowUpIcon className={cn('size-4 transition-transform', sortDirection === 'desc' && 'rotate-180')} />
          </Button>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 gap-2 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
        {sortedDrops.map((pal) => (
          <Link key={pal.internalName} href={`/pals/${pal.id}`}>
            <Card className="relative flex h-full flex-col items-center border-gray-5 bg-gray-3 p-2" hoverEffect>
              <Badge variant="iris" className="absolute left-1 top-1">
                {pal.min === pal.max ? pal.min : `${pal.min}-${pal.max}`}
              </Badge>
              <Badge variant={getBadgeVariantForRate(pal.rate)} className="absolute right-1 top-1">
                {pal.rate}%
              </Badge>

              <PalImage
                name={pal.id}
                alt={pal.name}
                width={74}
                height={74}
                className="rounded-full border border-gray-6 bg-gray-4"
              />

              <div className="relative mt-2">
                {pal.isBoss && (
                  <Image
                    className="absolute -left-7 size-6"
                    src="/images/alpha.png"
                    alt="alpha"
                    height={24}
                    width={24}
                    unoptimized
                  />
                )}
                <div className="text-center font-medium text-gray-12">{pal.name}</div>{' '}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Card>
  );
}
