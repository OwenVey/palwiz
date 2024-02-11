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
import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, ArrowUpDownIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';

const SKILL_SORTS = [
  { label: 'Power', value: 'power' },
  { label: 'Name', value: 'name' },
  { label: 'Cooldown Time', value: 'cooldownTime' },
  { label: 'Min Range', value: 'minRange' },
  { label: 'Max Range', value: 'maxRange' },
] satisfies Array<{ label: string; value: keyof Skill }>;

export function SkillsGrid() {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(SKILL_SORTS.map((s) => s.value)).withDefault('name'),
  );
  const [sortDirection, setSortDirection] = useQueryState(
    'sortDirection',
    parseAsStringLiteral(['asc', 'desc']).withDefault('asc'),
  );
  const [elements, setElements] = useQueryState('elements', parseAsArrayOfStrings);

  const filteredSkills = sortArrayByPropertyInDirection(skills, sort, sortDirection)
    .filter(({ name }) => (search ? name.toLowerCase().includes(search.toLowerCase()) : true))
    .filter((skill) => (elements.length > 0 ? elements.includes(skill.element) : true));

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="flex h-fit flex-col gap-5 md:sticky md:top-[81px] md:w-72">
        <Input
          className="w-full"
          label="Search"
          placeholder="Search skills"
          icon={SearchIcon}
          value={search}
          onChange={({ target }) => setSearch(target.value ? target.value : null)}
        />

        <div className="flex flex-col items-end gap-2">
          <Select
            value={sort ?? ''}
            onValueChange={(v) => setSort(v === '' ? null : (v as (typeof SKILL_SORTS)[number]['value']))}
          >
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

        <Button asChild variant="secondary" className="w-full">
          <Link href="/items">Clear Filters</Link>
        </Button>
      </Card>

      <div className="flex-1 @container">
        <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
          {filteredSkills.map((skill) => (
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
      </div>
    </div>
  );
}
