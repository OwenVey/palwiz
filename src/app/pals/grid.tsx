'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PAL_ELEMENTS, WORK_SUITABILITIES } from '@/constants';
import { isWithinRange } from '@/lib/utils';
import { type Pal, type WorkSuitability } from '@/types';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';

type PalsGridProps = {
  pals: Pal[];
};

export default function PalsGrid({ pals }: PalsGridProps) {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [rarity, setRarity] = useQueryState('rarity', parseAsString.withDefault(''));
  const [elements, setElements] = useQueryState('elements', parseAsArrayOf(parseAsString).withDefault([]));
  const [work, setWork] = useQueryState('work', parseAsStringLiteral(WORK_SUITABILITIES));

  const filteredPals = pals
    .filter((pal) => (search ? pal.name.toLowerCase().includes(search.toLowerCase()) : true))
    .filter((pal) => (rarity ? isCorrectRarity(rarity ?? 'all', pal.rarity) : true))
    .filter((pal) =>
      elements?.length ? [pal.elementType1, pal.elementType2].filter(Boolean).some((e) => elements.includes(e)) : true,
    )
    .filter((pal) => (work ? pal.workSuitabilities[work] > 0 : true))
    .sort((pal1, pal2) => (work ? pal2.workSuitabilities[work] - pal1.workSuitabilities[work] : 0));

  console.log({ search, rarity, elements, work });

  function isCorrectRarity(rarityGroup: string, rarity: number) {
    if (rarityGroup === 'all') return true;
    if (rarityGroup === 'common') return isWithinRange(rarity, 0, 4);
    if (rarityGroup === 'rare') return isWithinRange(rarity, 5, 8);
    if (rarityGroup === 'epic') return isWithinRange(rarity, 8, 10);
    if (rarityGroup === 'legendary') return rarity > 10;
    return true;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 px-4 sm:px-0">
        <div className="flex flex-wrap items-end gap-4">
          <Input
            className="w-full sm:max-w-72"
            label="Search"
            placeholder="Search pal name"
            icon={SearchIcon}
            value={search}
            onChange={(event) => setSearch(event.target.value ? event.target.value : null)}
          />

          <div className="flex-1">
            <Label className="mb-1">Rarity</Label>
            <Select value={rarity} onValueChange={(v) => setRarity(v && v !== 'all' ? v : null)}>
              <SelectTrigger className="min-w-36 sm:max-w-48">
                <SelectValue placeholder="Select rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="common" className="text-gray-10 focus:text-gray-10">
                  Common
                </SelectItem>
                <SelectItem value="rare" className="text-blue-9 focus:bg-blue-3 focus:text-blue-10">
                  Rare
                </SelectItem>
                <SelectItem value="epic" className="text-purple-10 focus:bg-purple-3 focus:text-purple-10">
                  Epic
                </SelectItem>
                <SelectItem value="legendary" className="text-orange-10 focus:bg-orange-3 focus:text-orange-10">
                  Legendary
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col">
          <Label>Work Suitability</Label>
          <ToggleGroup
            type="single"
            className="mt-1"
            value={work ?? ''}
            onValueChange={(v) => setWork(v === '' ? null : (v as WorkSuitability))}
          >
            {WORK_SUITABILITIES.map((work) => (
              <ToggleGroupItem key={work} value={work} variant="secondary" size="icon">
                <Image
                  className="size-6"
                  src={`/images/work/${work}.png`}
                  alt={`${work} element`}
                  height={24}
                  width={24}
                  quality={100}
                />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col">
            <Label>Elements</Label>
            <ToggleGroup
              className="mt-1"
              type="multiple"
              value={elements}
              onValueChange={(e) => setElements(e.length > 0 ? e : null)}
            >
              {PAL_ELEMENTS.map((e) => (
                <ToggleGroupItem key={e} value={e} variant="secondary" size="icon">
                  <Image
                    className="size-6"
                    src={`/images/elements/${e}.png`}
                    alt={`${e} element`}
                    height={24}
                    width={24}
                    quality={100}
                  />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="text-nowrap text-sm text-gray-11">{filteredPals.length} results</div>
            <Button asChild variant="secondary">
              <Link href="/pals">Clear</Link>
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:px-0 lg:grid-cols-4 xl:grid-cols-5">
        {filteredPals.map((pal) => (
          <Link
            href={`/pals/${pal.id}`}
            key={pal.id}
            className="flex flex-col items-center rounded-lg border border-gray-6 bg-gray-2 p-2 shadow-sm transition-colors hover:border-primary-9 hover:shadow-md hover:shadow-primary-5"
          >
            <div className="relative flex w-full justify-between">
              <div className="absolute left-0 flex flex-col">
                <Badge className="h-fit items-baseline font-mono font-bold tracking-wide" variant="outline">
                  <span className="text-gray-8">#{'000'.slice(pal.zukanIndex.toString().length)}</span>
                  <span>{pal.zukanIndex}</span>
                  <span className="text-[10px]">{pal.zukanIndexSuffix}</span>
                </Badge>

                <div className="mt-2 flex flex-col gap-1">
                  {[pal.elementType1, pal.elementType2].filter(Boolean).map((element) => (
                    <Tooltip key={element}>
                      <TooltipTrigger>
                        <Image
                          className="size-6"
                          src={`/images/elements/${element}.png`}
                          alt={`${element} element`}
                          height={24}
                          width={24}
                          quality={100}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="left" className="capitalize">
                        {element}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              <div className="absolute right-0 flex flex-col flex-wrap gap-0">
                {Object.entries(pal.workSuitabilities)
                  .filter(([, value]) => value > 0)
                  .sort(([, value1], [, value2]) => value2 - value1)
                  .map(([work, value]) => (
                    <Tooltip key={work}>
                      <TooltipTrigger className="flex items-center">
                        <Image src={`/images/work/${work}.png`} alt={`${work}`} height={24} width={24} quality={100} />
                        <span className="text-xs font-semibold text-gray-11">{value}</span>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="fcapitalize">
                        {work.replace('-', ' ')}
                      </TooltipContent>
                    </Tooltip>
                  ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 py-2">
              <Image
                className="size-28 rounded-full border border-gray-6 bg-gray-1"
                src={`/images/pals/${pal.name.toLowerCase()}.png`}
                alt={`image of ${pal.name}`}
                height={112}
                width={112}
                quality={100}
              />

              <div className="font-medium">{pal.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
