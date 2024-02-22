'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { PalImage } from '@/components/PalImage';
import { PartnerSkillImage } from '@/components/PartnerSkillImage';
import { StickySidebar } from '@/components/StickySidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LinkTab, LinkTabs } from '@/components/ui/link-tabs';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip } from '@/components/ui/tooltip';
import NORMAL_PALS from '@/data/normal-pals.json';
import { useQueryString } from '@/hooks/useQueryString';
import { useQueryStringArray } from '@/hooks/useQueryStringArray';
import { PARTNER_SKILL_CATEGORIES } from '@/lib/pal-utils';
import { cn, notEmpty, sortArrayByPropertyInDirection } from '@/lib/utils';
import { useDebounce } from '@uidotdev/usehooks';
import {
  ArrowDownNarrowWideIcon,
  ArrowDownWideNarrowIcon,
  ArrowUpDownIcon,
  FilterXIcon,
  SearchIcon,
} from 'lucide-react';
import Link from 'next/link';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { memo, useMemo } from 'react';

const SORTS = [{ label: 'Name', value: 'name' }] satisfies Array<{ label: string; value: keyof PartnerSkill }>;

const PARTNER_SKILLS = NORMAL_PALS.map(({ partnerSkill }) => partnerSkill)
  .filter(notEmpty)
  .filter((obj, index, self) => index === self.findIndex((t) => t.name === obj.name))
  .map((s) => ({ ...s, pals: NORMAL_PALS.filter((pal) => pal.partnerSkill?.name === s.name) }));

type PartnerSkill = (typeof PARTNER_SKILLS)[number];

export function PartnerSkillsGrid() {
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

  const [categories, setCategories] = useQueryStringArray('categories');

  const filteredSkills = useMemo(
    () =>
      sortArrayByPropertyInDirection(PARTNER_SKILLS, sort as keyof PartnerSkill, sortDirection)
        .filter(({ name }) => (debouncedSearch ? name.toLowerCase().includes(debouncedSearch.toLowerCase()) : true))
        .filter((skill) => (categories.length ? categories.includes(skill.group) : true)),
    [debouncedSearch, categories, sort, sortDirection],
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

          <CollapsibleFilter label="Categories">
            <ToggleGroup
              type="multiple"
              className="md:grid md:grid-cols-6 md:gap-1"
              value={categories}
              onValueChange={(v) => setCategories(v.length > 0 ? v : null)}
            >
              {PARTNER_SKILL_CATEGORIES.map((category) => (
                <Tooltip key={category} content={category}>
                  <span className="flex w-10 md:w-auto">
                    <ToggleGroupItem value={category} className="w-full p-0">
                      <PartnerSkillImage name={category} />
                    </ToggleGroupItem>
                  </span>
                </Tooltip>
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

const Grid = memo(function Grid({ skills }: { skills: PartnerSkill[] }) {
  if (skills.length === 0) return <div className="mt-28 flex justify-center text-gray-11">No passive skills found</div>;

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 @2xl:grid-cols-2">
      {skills.map((partnerSkill) => (
        <Card key={partnerSkill.name} className={cn('relative flex h-full flex-col gap-2')}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PartnerSkillImage name={partnerSkill.group} />
              <div className="text-gray-12">{partnerSkill.name}</div>
            </div>

            <div className="flex gap-1">
              {partnerSkill.pals.map((pal) => (
                <Tooltip key={pal.id} content={pal.name}>
                  <Link href={`/pals/${pal.id}`} className="group">
                    <PalImage
                      id={pal.id}
                      className="size-10 rounded-full border border-gray-7 bg-gray-1 group-hover:border-primary-9 group-hover:bg-gray-2"
                    />
                  </Link>
                </Tooltip>
              ))}
            </div>
          </div>

          <p className="line-clamp-2 text-sm text-gray-11">{partnerSkill.description}</p>
        </Card>
      ))}
    </div>
  );
});
