'use client';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { isWithinRange } from '@/lib/utils';
import { type Pal } from '@/types';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';

type PalsGridProps = {
  pals: Pal[];
};

export default function PalsGrid({ pals }: PalsGridProps) {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [rarity, setRarity] = useQueryState('rarity', parseAsString.withDefault(''));

  const filteredPals = pals
    .filter((pal) => (search === '' ? true : pal.name.toLowerCase().includes(search.toLowerCase())))
    .filter((pal) => isCorrectRarity(rarity, pal.rarity));

  const elements = [...new Set(pals.flatMap((pal) => pal.elementType1))];
  const workSutibilities = [...new Set(pals.flatMap((pal) => Object.keys(pal.work)))];

  function isCorrectRarity(rarity: string, rarityNum: number) {
    if (rarity === 'all') return true;
    if (rarity === 'common') return isWithinRange(rarityNum, 0, 4);
    if (rarity === 'rare') return isWithinRange(rarityNum, 5, 8);
    if (rarity === 'epic') return isWithinRange(rarityNum, 8, 10);
    if (rarity === 'legendary') return rarityNum > 10;
    return true;
  }

  return (
    <div>
      <div className="flex items-end gap-4">
        <Input
          className="flex-1"
          label="Search"
          placeholder="Search pal name"
          icon={SearchIcon}
          value={search}
          onChange={(event) => setSearch(event.target.value ? event.target.value : null)}
        />

        <div className="flex-1">
          <Label className="mb-1">Rarity</Label>
          <Select value={rarity} onValueChange={setRarity}>
            <SelectTrigger>
              <SelectValue placeholder="Select rarity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="common" className="text-gray-10 focus:text-gray-10">
                Common
              </SelectItem>
              <SelectItem value="rare" className="text-blue-9 focus:text-blue-10 focus:bg-blue-3">
                Rare
              </SelectItem>
              <SelectItem value="epic" className="text-purple-10 focus:bg-purple-3 focus:text-purple-10">
                Epic
              </SelectItem>
              <SelectItem value="legendary" className="text-orange-10 focus:text-orange-10 focus:bg-orange-3">
                Legendary
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <Label>Elements</Label>
          <ToggleGroup type="single" className="mt-1">
            {elements.map((e) => (
              <ToggleGroupItem key={e} value={e} variant="secondary" size="icon">
                <Image
                  className="size-6"
                  src={`/images/elements/${e}.png`}
                  alt={`${e} element`}
                  height={24}
                  width={24}
                  quality={100}
                  unoptimized
                />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <Label>Work Sutibility</Label>
        <ToggleGroup type="single" className="mt-1">
          {workSutibilities.map((work) => (
            <ToggleGroupItem key={work} value={work} variant="secondary" size="icon">
              <Image
                className="size-6"
                src={`/images/work/${work}.png`}
                alt={`${work} element`}
                height={24}
                width={24}
                quality={100}
                unoptimized
              />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-5 gap-4">
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
                          unoptimized
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
                {Object.entries(pal.work)
                  .filter(([_, value]) => value > 0)
                  .map(([work, value]) => (
                    <Tooltip key={work}>
                      <TooltipTrigger className="flex items-center">
                        <Image
                          src={`/images/work/${work}.png`}
                          alt={`${work}`}
                          height={24}
                          width={24}
                          quality={100}
                          unoptimized
                        />
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
                unoptimized
              />

              <div className="font-medium">{pal.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
