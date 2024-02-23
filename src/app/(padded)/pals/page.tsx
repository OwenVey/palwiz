import { palsQueryCache } from '@/app/(padded)/pals/pals-search-params';
import { PalsSidebar } from '@/app/(padded)/pals/pals-sidebar';
import { ElementImage } from '@/components/images/ElementImage';
import { PalImage } from '@/components/images/PalImage';
import { WorkTypeImage } from '@/components/images/WorkTypeImage';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import NORMAL_PALS from '@/data/normal-pals.json';
import { isWithinRange, sortArrayByPropertyInDirection } from '@/lib/utils';
import { type PageParams } from '@/types';
import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pals',
};

function isCorrectRarity(rarityGroup: string, rarity: number) {
  if (rarityGroup === 'all') return true;
  if (rarityGroup === 'common') return isWithinRange(rarity, 0, 4);
  if (rarityGroup === 'rare') return isWithinRange(rarity, 5, 8);
  if (rarityGroup === 'epic') return isWithinRange(rarity, 8, 10);
  if (rarityGroup === 'legendary') return rarity > 10;
  return true;
}

export default function PalsPage({ searchParams }: PageParams) {
  const { search, sort, sortDirection, rarity, work, elements, partnerSkills } = palsQueryCache.parse(searchParams);

  const filteredPals = sortArrayByPropertyInDirection(NORMAL_PALS, sort, sortDirection)
    .filter((pal) => {
      const matchesSearch = !search || pal.name.toLowerCase().includes(search.toLowerCase());
      const matchesRarity = !rarity || isCorrectRarity(rarity ?? 'all', pal.rarity);
      const matchesElement =
        !elements.length || [pal.elementType1, pal.elementType2].some((e) => e && elements.includes(e));
      const matchesWork = !work || pal.workSuitabilities[work] > 0;
      const matchesPartnerSkills =
        !partnerSkills.length || (pal.partnerSkill?.group && partnerSkills.includes(pal.partnerSkill.group));

      return matchesSearch && matchesRarity && matchesElement && matchesWork && matchesPartnerSkills;
    })
    .sort((pal1, pal2) => (work ? pal2.workSuitabilities[work] - pal1.workSuitabilities[work] : 0));

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <PalsSidebar numResults={filteredPals.length} />

      <div className="flex-1 @container">
        {filteredPals.length === 0 ? (
          <div className="grid h-full place-items-center text-gray-11">No pals found</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 @sm:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5">
            {filteredPals.map((pal) => (
              <Link href={`/pals/${pal.id}`} key={pal.id}>
                <Card className="relative p-2" hoverEffect>
                  {sort !== 'name' && sort !== 'zukanIndex' && (
                    <Badge variant="primary" className="absolute -right-1 -top-1 z-10">
                      {pal[sort].toLocaleString()}
                    </Badge>
                  )}
                  <div className="relative flex w-full justify-between">
                    <div className="absolute left-0 flex flex-col">
                      <Badge className="h-fit items-baseline">
                        <span className="text-gray-8">#{'000'.slice(pal.zukanIndex.toString().length)}</span>
                        <span>{pal.zukanIndex}</span>
                        <span className="text-2xs">{pal.zukanIndexSuffix}</span>
                      </Badge>

                      <div className="mt-2 flex flex-col gap-1">
                        {[pal.elementType1, pal.elementType2].filter(Boolean).map((element) => (
                          <ElementImage key={element} name={element} alt={element} width={24} height={24} />
                        ))}
                      </div>
                    </div>

                    <div className="absolute right-0 flex flex-col">
                      {Object.entries(pal.workSuitabilities)
                        .filter(([, value]) => value > 0)
                        .sort(([, value1], [, value2]) => value2 - value1)
                        .map(([work, value]) => (
                          <div key={work} className="flex items-center">
                            <WorkTypeImage name={work} alt={work} width={24} height={24} />
                            <span className="text-xs font-semibold text-gray-11">{value}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-3 py-2">
                    <PalImage
                      name={pal.id}
                      alt={pal.name}
                      width={112}
                      height={112}
                      className="rounded-full border border-gray-6 bg-gray-1"
                    />
                    <div className="font-medium text-gray-12">{pal.name}</div>
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
