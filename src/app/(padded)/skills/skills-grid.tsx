'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { ElementImage } from '@/components/ElementImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PAL_ELEMENTS } from '@/constants';
import { skills } from '@/data/parsed';
import { parseAsArrayOfStrings, sortArrayByPropertyInDirection } from '@/lib/utils';
import { type Skill } from '@/types';
import { useDebounce } from '@uidotdev/usehooks';
import { capitalCase } from 'change-case';
import {
  ArrowDownNarrowWideIcon,
  ArrowDownWideNarrowIcon,
  ArrowUpDownIcon,
  FilterXIcon,
  SearchIcon,
} from 'lucide-react';
import Link from 'next/link';
import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';
import { memo, useMemo } from 'react';

const SKILL_SORTS = [
  { label: 'Power', value: 'power' },
  { label: 'Name', value: 'name' },
  { label: 'Cooldown Time', value: 'cooldownTime' },
  { label: 'Min Range', value: 'minRange' },
  { label: 'Max Range', value: 'maxRange' },
] satisfies Array<{ label: string; value: keyof Skill }>;

const ALL_EFFECTS = [...new Set(skills.flatMap((skill) => skill.effects.map((effect) => effect.name)))];

export function SkillsGrid() {
  const [search, setSearch] = useQueryState('search', { defaultValue: '', clearOnDefault: true });
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(SKILL_SORTS.map((s) => s.value))
      .withDefault('name')
      .withOptions({ clearOnDefault: true }),
  );
  const [sortDirection, setSortDirection] = useQueryState(
    'sortDirection',
    parseAsStringLiteral(['asc', 'desc']).withDefault('asc').withOptions({ clearOnDefault: true }),
  );
  const [elements, setElements] = useQueryState('elements', parseAsArrayOfStrings);
  const [category, setCategory] = useQueryState('category', parseAsString);
  const [effects, setEffects] = useQueryState('effects', parseAsArrayOfStrings);

  const debouncedSearch = useDebounce(search, 100);

  const filteredSkills = useMemo(
    () =>
      sortArrayByPropertyInDirection(skills, sort, sortDirection)
        .filter(({ name }) => (debouncedSearch ? name.toLowerCase().includes(debouncedSearch.toLowerCase()) : true))
        .filter((skill) => (elements.length > 0 ? elements.includes(skill.element) : true))
        .filter((skill) => (category ? skill.category.toLowerCase() === category : true))
        .filter((skill) =>
          effects.length > 0 ? effects.some((effect) => skill.effects.some(({ name }) => name === effect)) : true,
        ),
    [category, debouncedSearch, effects, elements, sort, sortDirection],
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="flex h-fit flex-col gap-5 md:sticky md:top-[81px] md:w-72">
        <Input
          className="w-full"
          label="Search"
          placeholder="Search skills"
          icon={SearchIcon}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-col items-end gap-2">
          <Select value={sort ?? ''} onValueChange={(v) => setSort(v as (typeof SKILL_SORTS)[number]['value'])}>
            <SelectTrigger label="Sort" icon={ArrowUpDownIcon} placeholder="Sort by" />

            <SelectContent>
              {SKILL_SORTS.map(({ label, value }) => (
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

        <CollapsibleFilter label="Category" defaultOpen>
          <ToggleGroup
            type="single"
            className="flex w-full"
            size="sm"
            value={category ?? ''}
            onValueChange={(v) => setCategory(v ? v : null)}
          >
            <ToggleGroupItem value="melee" className="flex-1">
              Melee
            </ToggleGroupItem>
            <ToggleGroupItem value="shot" className="flex-1">
              Shot
            </ToggleGroupItem>
          </ToggleGroup>
        </CollapsibleFilter>

        <CollapsibleFilter label="Effect" defaultOpen>
          <ToggleGroup
            type="multiple"
            className="md:grid md:grid-cols-2 md:gap-1"
            value={effects}
            onValueChange={(v) => setEffects(v.length > 0 ? v : null)}
          >
            {ALL_EFFECTS.map((effect) => (
              <ToggleGroupItem key={effect} value={effect} size="sm">
                {capitalCase(effect)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CollapsibleFilter>

        <Button asChild variant="outline" className="w-full">
          <Link href="/skills">
            <FilterXIcon className="mr-2 size-4" />
            Clear Filters
          </Link>
        </Button>
      </Card>

      <div className="flex-1 @container">
        <Grid skills={filteredSkills} />
      </div>
    </div>
  );
}

const Grid = memo(function Grid({ skills }: { skills: Skill[] }) {
  console.log('[SKILLS GRID]');

  if (skills.length === 0) return <div className="grid h-full place-items-center text-gray-11">No skills found</div>;

  return (
    <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
      {skills.map((skill) => (
        <Link key={skill.id} href={`/skills/${skill.id}`}>
          <Card className="relative flex h-full flex-col gap-2" hoverEffect>
            <Badge className="absolute right-2 top-2 font-sans">{skill.category}</Badge>

            <div className="flex items-center gap-2">
              <ElementImage element={skill.element} />
              <div>{skill.name}</div>
            </div>

            <div className="flex gap-2">
              <Badge className="font-mono" variant="red">
                Power: {skill.power}
              </Badge>
              <Badge className="font-mono" variant="yellow">
                CT: {skill.cooldownTime}
              </Badge>
              <Badge className="font-mono" variant="gray">
                Range: {skill.minRange === skill.maxRange ? skill.minRange : `${skill.minRange}-${skill.maxRange}`}
              </Badge>
            </div>

            <p className="text-sm text-gray-11">{skill.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
});
