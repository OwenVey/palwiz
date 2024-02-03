import { ElementImage } from '@/components/ElementImage';
import { PalImage } from '@/components/PalImage';
import { WorkTypeImage } from '@/components/WorkTypeImage';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { type Pal } from '@/types';
import Link from 'next/link';

type PalGridViewProps = {
  pals: Pal[];
};
export function PalGridView({ pals }: PalGridViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 @sm:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5">
      {pals.map((pal) => (
        <Link href={`/pals/${pal.id}`} key={pal.id} className="">
          <Card className="p-2" hoverEffect>
            <div className="relative flex w-full justify-between">
              <div className="absolute left-0 flex flex-col">
                <Badge className="h-fit items-baseline font-mono font-bold tracking-wide">
                  <span className="text-gray-8">#{'000'.slice(pal.zukanIndex.toString().length)}</span>
                  <span>{pal.zukanIndex}</span>
                  <span className="text-[10px]">{pal.zukanIndexSuffix}</span>
                </Badge>

                <div className="mt-2 flex flex-col gap-1">
                  {[pal.elementType1, pal.elementType2].filter(Boolean).map((element) => (
                    <ElementImage key={element} element={element} tooltipSide="left" />
                  ))}
                </div>
              </div>

              <div className="absolute right-0 flex flex-col">
                {Object.entries(pal.workSuitabilities)
                  .filter(([, value]) => value > 0)
                  .sort(([, value1], [, value2]) => value2 - value1)
                  .map(([work, value]) => (
                    <div key={work} className="flex items-center">
                      <WorkTypeImage id={work} />
                      <span className="text-xs font-semibold text-gray-11">{value}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 py-2">
              <PalImage pal={pal.id} className="rounded-full border border-gray-6 bg-gray-1" />
              <div className="font-medium">{pal.name}</div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
