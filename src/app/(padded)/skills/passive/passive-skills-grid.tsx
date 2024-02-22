'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { StickySidebar } from '@/components/StickySidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LinkTab, LinkTabs } from '@/components/ui/link-tabs';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip } from '@/components/ui/tooltip';
import PASSIVE_SKILLS from '@/data/passive-skills.json';
import { useQueryString } from '@/hooks/useQueryString';
import { useQueryStringArray } from '@/hooks/useQueryStringArray';
import { cn, sortArrayByPropertyInDirection } from '@/lib/utils';
import { type PassiveSkill } from '@/types';
import { useDebounce } from '@uidotdev/usehooks';
import { capitalCase } from 'change-case';
import {
  ArrowDownNarrowWideIcon,
  ArrowDownWideNarrowIcon,
  ArrowUpDownIcon,
  FilterXIcon,
  SearchIcon,
  UserRoundIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { memo, useMemo } from 'react';

const SORTS = [
  { label: 'Name', value: 'name' },
  { label: 'Rank', value: 'rank' },
] satisfies Array<{ label: string; value: keyof PassiveSkill }>;

const EFFECT_TYPES = [...new Set(PASSIVE_SKILLS.flatMap(({ effects }) => effects.map(({ type }) => type)))].sort();

export function PassiveSkillsGrid() {
  const [search, setSearch] = useQueryString('search');
  const debouncedSearch = useDebounce(search, 100);
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(SORTS.map((s) => s.value))
      .withDefault('name')
      .withOptions({ clearOnDefault: true }),
  );
  const [sortDirection, setSortDirection] = useQueryState(
    'sortDirection',
    parseAsStringLiteral(['asc', 'desc']).withDefault('asc').withOptions({ clearOnDefault: true }),
  );

  const [types, setTypes] = useQueryStringArray('types');
  const [rank, setRank] = useQueryString('rank');

  const filteredSkills = useMemo(
    () =>
      sortArrayByPropertyInDirection(PASSIVE_SKILLS, sort as keyof PassiveSkill, sortDirection)
        .filter(({ name }) => (debouncedSearch ? name.toLowerCase().includes(debouncedSearch.toLowerCase()) : true))
        .filter((skill) => (types.length > 0 ? types.some((type) => skill.effects.some((e) => e.type === type)) : true))
        .filter((skill) => (rank ? (rank === 'positive' ? skill.rank > 0 : skill.rank < 0) : true)),
    [debouncedSearch, rank, sort, sortDirection, types],
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <StickySidebar>
        <div className="space-y-5">
          <LinkTabs className="w-full">
            <LinkTab className="flex-1" href="/skills">
              Active
            </LinkTab>
            <LinkTab className="flex-1" href="/skills/passive">
              Passive
            </LinkTab>
            <LinkTab className="flex-1" href="/skills/partner">
              Partner
            </LinkTab>
          </LinkTabs>

          <Input
            className="w-full"
            label="Search"
            placeholder="Search skills"
            icon={SearchIcon}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-col items-end gap-2">
            <Select value={sort} onValueChange={(v) => setSort(v as (typeof SORTS)[number]['value'])}>
              <SelectTrigger label="Sort" icon={ArrowUpDownIcon} placeholder="Sort by" />

              <SelectContent>
                {SORTS.map(({ label, value }) => (
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
              onValueChange={(value: 'asc' | 'desc') => value && setSortDirection(value)}
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

          <MultiSelect
            label="Types"
            placeholder="Select type(s)"
            emptyIndicator="No types found"
            value={types.map((type) => ({ label: capitalCase(type), value: type }))}
            onChange={(options) => setTypes(options.length ? options.map(({ value }) => value) : null)}
            options={EFFECT_TYPES.map((type) => ({ label: capitalCase(type), value: type }))}
          />

          <CollapsibleFilter label="Rank">
            <ToggleGroup type="single" className="flex w-full" size="sm" value={rank} onValueChange={setRank}>
              <ToggleGroupItem value="negative" variant="red" className="flex-1">
                Negative
              </ToggleGroupItem>
              <ToggleGroupItem value="positive" variant="yellow" className="flex-1">
                Positive
              </ToggleGroupItem>
            </ToggleGroup>
          </CollapsibleFilter>

          <div className="flex flex-col items-end gap-2">
            <div className="text-nowrap text-sm text-gray-11">{filteredSkills.length} results</div>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/skills/passive">
                <FilterXIcon className="mr-2 size-4" />
                Clear Filters
              </Link>
            </Button>
          </div>
        </div>
      </StickySidebar>

      <div className="flex-1 @container">
        <Grid skills={filteredSkills} />
      </div>
    </div>
  );
}

const Grid = memo(function Grid({ skills }: { skills: PassiveSkill[] }) {
  if (skills.length === 0) return <div className="mt-28 flex justify-center text-gray-11">No passive skills found</div>;

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 @2xl:grid-cols-2">
      {skills.map((skill) => (
        <Card
          key={skill.internalId}
          className={cn(
            'relative flex h-full flex-col gap-2',
            skill.rank < 0 && 'border-red-4 bg-red-2',
            skill.rank > 1 && 'border-yellow-4 bg-yellow-2',
          )}
        >
          {skill.effects.map((e) => e.target).includes('Trainer') && (
            <Tooltip content="Applies to player">
              <button className="absolute right-2 top-2 p-1 font-sans">
                <Badge className="p-1">
                  <UserRoundIcon className="size-4 text-gray-11" />
                </Badge>
              </button>
            </Tooltip>
          )}

          <div className="flex items-center gap-2">
            <Image
              src={`/images/passive-ranks/${skill.rank}.webp`}
              className="scale-75"
              height={24}
              width={24}
              alt={`rank ${skill.rank}`}
              unoptimized
            />
            <div className={cn('text-gray-12', skill.rank < 0 && 'text-red-12', skill.rank > 1 && 'text-yellow-12')}>
              {skill.name}
            </div>
          </div>

          <div className="flex gap-2">
            {skill.effects.map((effect) => (
              <Badge
                key={effect.type}
                className="font-sans font-normal"
                variant={effect.value < 0 || skill.rank < 0 ? 'red' : 'green'}
              >
                {capitalCase(effect.type)}:&nbsp;
                <span className="font-mono font-bold">
                  {effect.value > 0 && '+'}
                  {effect.value}%
                </span>
              </Badge>
            ))}
          </div>

          {/* {skill.description && <p className="text-sm text-gray-11">{skill.description}</p>} */}
        </Card>
      ))}
    </div>
  );
});
