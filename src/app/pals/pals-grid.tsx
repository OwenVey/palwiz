'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { ElementImage } from '@/components/ElementImage';
import { PalImage } from '@/components/PalImage';
import { PartnerSkillImage } from '@/components/PartnerSkillImage';
import { WorkTypeImage } from '@/components/WorkTypeImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PAL_ELEMENTS, WORK_SUITABILITIES } from '@/constants';
import { normalPals } from '@/data/parsed';
import { isWithinRange, notEmpty, sortArrayByPropertyInDirection } from '@/lib/utils';
import { type Pal, type WorkSuitability } from '@/types';
import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, ArrowUpDownIcon, GemIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';
import { useMemo } from 'react';

export const PAL_SORTS = [
  { label: 'Capture Rate', value: 'captureRateCorrect' },
  { label: 'Defense', value: 'defense' },
  { label: 'Food Amount', value: 'foodAmount' },
  { label: 'HP', value: 'hp' },
  { label: 'Male Probability', value: 'maleProbability' },
  { label: 'Max Full Stomach', value: 'maxFullStomach' },
  { label: 'Melee Attack', value: 'meleeAttack' },
  { label: 'Name', value: 'name' },
  { label: 'Paldeck Number', value: 'zukanIndex' },
  { label: 'Price', value: 'price' },
  { label: 'Rarity', value: 'rarity' },
  { label: 'Ride Sprint Speed', value: 'rideSprintSpeed' },
  { label: 'Run Speed', value: 'runSpeed' },
  { label: 'Shot Attack', value: 'shotAttack' },
  { label: 'Slow Walk Speed', value: 'slowWalkSpeed' },
  { label: 'Stamina', value: 'stamina' },
  { label: 'Support', value: 'support' },
  { label: 'Transport Speed', value: 'transportSpeed' },
  { label: 'Walk Speed', value: 'walkSpeed' },
] satisfies Array<{ label: string; value: keyof Pal }>;

export function PalsGrid() {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(PAL_SORTS.map((s) => s.value)).withDefault('zukanIndex'),
  );
  const [sortDirection, setSortDirection] = useQueryState(
    'sortDirection',
    parseAsStringLiteral(['asc', 'desc']).withDefault('asc'),
  );
  const [rarity, setRarity] = useQueryState('rarity', parseAsString.withDefault(''));
  const [work, setWork] = useQueryState('work', parseAsStringLiteral(WORK_SUITABILITIES.map(({ id }) => id)));
  const [elements, setElements] = useQueryState('elements', parseAsArrayOf(parseAsString).withDefault([]));
  const [partnerSkill, setPartnerSkill] = useQueryState('partnerSkill');

  const filteredPals = useMemo(() => {
    return sortArrayByPropertyInDirection(
      normalPals.filter((pal) => {
        if (pal.zukanIndex <= 0 || pal.isBoss) return false;
        if (search && !pal.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (rarity && !isCorrectRarity(rarity ?? 'all', pal.rarity)) return false;
        if (elements?.length && ![pal.elementType1, pal.elementType2].some((e) => elements.includes(e))) return false;
        if (work && pal.workSuitabilities[work] <= 0) return false;
        if (partnerSkill && pal.partnerSkillIcon !== +partnerSkill) return false;
        return true;
      }),
      sort,
      sortDirection,
    ).sort((pal1, pal2) => (work ? pal2.workSuitabilities[work] - pal1.workSuitabilities[work] : 0));
  }, [elements, partnerSkill, rarity, search, sort, sortDirection, work]);

  function isCorrectRarity(rarityGroup: string, rarity: number) {
    if (rarityGroup === 'all') return true;
    if (rarityGroup === 'common') return isWithinRange(rarity, 0, 4);
    if (rarityGroup === 'rare') return isWithinRange(rarity, 5, 8);
    if (rarityGroup === 'epic') return isWithinRange(rarity, 8, 10);
    if (rarityGroup === 'legendary') return rarity > 10;
    return true;
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="h-fit md:sticky md:top-[81px] md:w-72">
        <div className="flex flex-col gap-5">
          <Input
            className="w-full"
            label="Search"
            placeholder="Search pals"
            icon={SearchIcon}
            value={search}
            onChange={({ target }) => setSearch(target.value ? target.value : null)}
          />

          <div className="flex flex-col items-end gap-2">
            <Select
              value={sort ?? ''}
              onValueChange={(v) => setSort(v === '' ? null : (v as (typeof PAL_SORTS)[number]['value']))}
            >
              <SelectTrigger label="Sort" icon={ArrowUpDownIcon} placeholder="Sort by" />

              <SelectContent>
                {PAL_SORTS.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ToggleGroup
              type="single"
              className="flex w-full"
              size="sm"
              value={sortDirection}
              onValueChange={async (value: 'asc' | 'desc') => {
                if (value) await setSortDirection(value);
              }}
            >
              <ToggleGroupItem value="asc" className="flex-1">
                <ArrowDownNarrowWideIcon className="mr-1 size-4" />
                Asc
              </ToggleGroupItem>
              <ToggleGroupItem value="desc" className="flex-1">
                <ArrowDownWideNarrowIcon className="mr-1 size-4" />
                Desc
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <Select value={rarity} onValueChange={(v) => setRarity(v && v !== 'all' ? v : null)}>
            <SelectTrigger label="Rarity" icon={GemIcon} placeholder="Select rarity" />

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

          <CollapsibleFilter label="Work Suitability" defaultOpen>
            <ToggleGroup
              type="single"
              className="md:grid md:grid-cols-6 md:gap-1"
              value={work ?? ''}
              onValueChange={(v) => setWork(v === '' ? null : (v as WorkSuitability))}
            >
              {WORK_SUITABILITIES.map((work) => (
                <ToggleGroupItem key={work.id} value={work.id} className="w-10 p-0 md:w-auto">
                  <WorkTypeImage id={work.id} className="size-7" />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </CollapsibleFilter>

          <CollapsibleFilter label="Elements" defaultOpen>
            <ToggleGroup
              type="multiple"
              className="md:grid md:grid-cols-6 md:gap-1"
              value={elements}
              onValueChange={(e) => setElements(e.length > 0 ? e : null)}
            >
              {PAL_ELEMENTS.map((element) => (
                <ToggleGroupItem key={element} value={element} className="w-10 p-0 md:w-auto">
                  <ElementImage element={element} />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </CollapsibleFilter>

          <CollapsibleFilter label="Partner Skill">
            <ToggleGroup
              type="single"
              className="md:grid md:grid-cols-6 md:gap-1"
              value={partnerSkill?.toString() ?? ''}
              onValueChange={(v) => setPartnerSkill(v === '' ? null : v)}
            >
              {[...new Set(normalPals.map((p) => p.partnerSkillIcon).filter(notEmpty))].map((partnerSkillIcon) => (
                <ToggleGroupItem
                  key={partnerSkillIcon}
                  value={partnerSkillIcon.toString()}
                  className="w-10 p-0 md:w-auto"
                >
                  <PartnerSkillImage id={partnerSkillIcon.toString()} />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </CollapsibleFilter>

          <div className="w-full">
            <div className="float-right mb-2 text-nowrap text-sm text-gray-11">{filteredPals.length} results</div>

            <Button asChild variant="secondary" className="w-full">
              <Link href="/pals">Clear Filters</Link>
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex-1 @container">
        {filteredPals.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 @sm:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5">
            {filteredPals.map((pal) => (
              <Link href={`/pals/${pal.id}`} key={pal.id} className="">
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
                    <PalImage id={pal.id} className="rounded-full border border-gray-6 bg-gray-1" />
                    <div className="font-medium">{pal.name}</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid h-full place-items-center text-gray-11">No pals found</div>
        )}
      </div>
    </div>
  );
}
