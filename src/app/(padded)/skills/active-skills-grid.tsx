'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { ElementImage } from '@/components/ElementImage';
import { StickySidebar } from '@/components/StickySidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LinkTab, LinkTabs } from '@/components/ui/link-tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip } from '@/components/ui/tooltip';
import { PAL_ELEMENTS } from '@/constants';
import ACTIVE_SKILLS from '@/data/active-skills.json';
import { useQuerySort } from '@/hooks/useQuerySort';
import { useQueryString } from '@/hooks/useQueryString';
import { useQueryStringArray } from '@/hooks/useQueryStringArray';
import { sortArrayByPropertyInDirection } from '@/lib/utils';
import { type ActiveSkill } from '@/types';
import { useDebounce } from '@uidotdev/usehooks';
import { capitalCase } from 'change-case';
import { FilterXIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { memo, useMemo } from 'react';

const SORTS = [
  { label: 'Power', value: 'power' },
  { label: 'Name', value: 'name' },
  { label: 'Cooldown Time', value: 'cooldownTime' },
  { label: 'Min Range', value: 'minRange' },
  { label: 'Max Range', value: 'maxRange' },
] satisfies Array<{ label: string; value: keyof ActiveSkill }>;

const EFFECT_TYPES = [...new Set(ACTIVE_SKILLS.flatMap(({ effects }) => effects.map(({ name }) => name)))].sort();

export function ActiveSkillsGrid() {
  const [search, setSearch] = useQueryString('search');
  const [{ sort, sortDirection }, , SortFilter] = useQuerySort(SORTS, 'name');
  const [elements, setElements] = useQueryStringArray('elements');
  const [activeSkillCategory, setActiveSkillCategory] = useQueryString('category');
  const [effects, setEffects] = useQueryStringArray('effects');

  const debouncedSearch = useDebounce(search, 100);

  const filteredSkills = useMemo(
    () =>
      sortArrayByPropertyInDirection(ACTIVE_SKILLS, sort as keyof ActiveSkill, sortDirection)
        .filter(({ name }) => (debouncedSearch ? name.toLowerCase().includes(debouncedSearch.toLowerCase()) : true))
        .filter((skill) => (elements.length > 0 ? elements.includes(skill.element) : true))
        .filter((skill) => (activeSkillCategory ? skill.category.toLowerCase() === activeSkillCategory : true))
        .filter((skill) =>
          effects.length > 0 ? effects.some((effect) => skill.effects.some(({ name }) => name === effect)) : true,
        ),
    [activeSkillCategory, debouncedSearch, effects, elements, sort, sortDirection],
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

          <SortFilter />

          <CollapsibleFilter label="Elements">
            <ToggleGroup
              type="multiple"
              className="md:grid md:grid-cols-6 md:gap-1"
              value={elements}
              onValueChange={(e) => setElements(e.length > 0 ? e : null)}
            >
              {PAL_ELEMENTS.map((element) => (
                <Tooltip key={element} content={element} className="capitalize">
                  <span className="flex w-10 md:w-auto">
                    <ToggleGroupItem value={element} className="w-full p-0">
                      <ElementImage element={element} />
                    </ToggleGroupItem>
                  </span>
                </Tooltip>
              ))}
            </ToggleGroup>
          </CollapsibleFilter>

          <CollapsibleFilter label="Category">
            <ToggleGroup
              type="single"
              className="flex w-full"
              size="sm"
              value={activeSkillCategory}
              onValueChange={setActiveSkillCategory}
            >
              <ToggleGroupItem value="melee" className="flex-1">
                Melee
              </ToggleGroupItem>
              <ToggleGroupItem value="shot" className="flex-1">
                Shot
              </ToggleGroupItem>
            </ToggleGroup>
          </CollapsibleFilter>

          <CollapsibleFilter label="Effects">
            <ToggleGroup
              type="multiple"
              className="md:grid md:grid-cols-2 md:gap-1"
              value={effects}
              onValueChange={(v) => setEffects(v.length > 0 ? v : null)}
            >
              {EFFECT_TYPES.map((effect) => (
                <ToggleGroupItem key={effect} value={effect} size="sm">
                  {capitalCase(effect)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </CollapsibleFilter>

          <div className="flex flex-col items-end gap-2">
            <div className="text-nowrap text-sm text-gray-11">{filteredSkills.length} results</div>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/skills">
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

const Grid = memo(function Grid({ skills }: { skills: ActiveSkill[] }) {
  if (skills.length === 0) return <div className="mt-28 flex justify-center text-gray-11">No active skills found</div>;

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 @2xl:grid-cols-2">
      {skills.map((skill) => (
        <Link key={skill.id} href={`/skills/${skill.id}`}>
          <Card className="relative flex h-full flex-col gap-2" hoverEffect>
            <Badge className="absolute right-2 top-2 font-sans">{skill.category}</Badge>

            <div className="flex items-center gap-2">
              <ElementImage element={skill.element} />
              <div className="text-gray-12">{skill.name}</div>
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

            <p className="line-clamp-2 text-sm text-gray-11">{skill.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
});
