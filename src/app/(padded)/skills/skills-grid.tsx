'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { ElementImage } from '@/components/ElementImage';
import { PalImage } from '@/components/PalImage';
import { PartnerSkillImage } from '@/components/PartnerSkillImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip } from '@/components/ui/tooltip';
import { NORMAL_PALS, PAL_ELEMENTS, PARTNER_SKILL_CATEGORIES } from '@/constants';
import { activeSkills, passiveSkills } from '@/data/parsed';
import { cn, notEmpty, parseAsArrayOfStrings, sortArrayByPropertyInDirection, useQueryString } from '@/lib/utils';
import { type ActiveSkill, type PassiveSkill } from '@/types';
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
import { useRouter } from 'next/navigation';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { memo, useMemo } from 'react';

const SORTS = {
  active: [
    { label: 'Power', value: 'power' },
    { label: 'Name', value: 'name' },
    { label: 'Cooldown Time', value: 'cooldownTime' },
    { label: 'Min Range', value: 'minRange' },
    { label: 'Max Range', value: 'maxRange' },
  ] satisfies Array<{ label: string; value: keyof ActiveSkill }>,
  passive: [
    { label: 'Name', value: 'name' },
    { label: 'Rank', value: 'rank' },
  ] satisfies Array<{ label: string; value: keyof PassiveSkill }>,
  partner: [{ label: 'Name', value: 'name' }],
} as const;

const ACTIVE_SKILL_EFFECTS = [
  ...new Set(activeSkills.flatMap(({ effects }) => effects.map(({ name }) => name))),
].sort();
const PASSIVE_SKILL_TYPES = [
  ...new Set(passiveSkills.flatMap(({ effects }) => effects.map(({ type }) => type))),
].sort();

const PARTNER_SKILLS = NORMAL_PALS.map(({ partnerSkill }) => partnerSkill)
  .filter(notEmpty)
  .filter((obj, index, self) => index === self.findIndex((t) => t.name === obj.name))
  .map((s) => ({ ...s, pals: NORMAL_PALS.filter((pal) => pal.partnerSkill?.name === s.name) }));

type PartnerSkill = (typeof PARTNER_SKILLS)[number];
const skillTypes = ['active', 'passive', 'partner'] as const;
// type SkillType = (typeof skillTypes)[number];

export function SkillsGrid() {
  const router = useRouter();

  const [type] = useQueryState(
    'type',
    parseAsStringLiteral(skillTypes).withDefault('active').withOptions({ clearOnDefault: true }),
  );
  const [search, setSearch] = useQueryString('search');
  const debouncedSearch = useDebounce(search, 100);
  const [sort, setSort] = useQueryState('sort', {
    defaultValue: type === 'active' ? 'name' : type === 'passive' ? 'rank' : type === 'partner' ? 'name' : 'name',
    clearOnDefault: true,
  });
  const [sortDirection, setSortDirection] = useQueryState(
    'sortDirection',
    parseAsStringLiteral(['asc', 'desc'])
      .withDefault(type === 'active' ? 'asc' : type === 'passive' ? 'desc' : type === 'partner' ? 'asc' : 'asc')
      .withOptions({ clearOnDefault: true }),
  );

  // Active skill filters
  const [elements, setElements] = useQueryState('elements', parseAsArrayOfStrings);
  const [activeSkillCategory, setActiveSkillCategory] = useQueryString('category');
  const [effects, setEffects] = useQueryState('effects', parseAsArrayOfStrings);

  // Passive skill filters
  const [types, setTypes] = useQueryState('types', parseAsArrayOfStrings);
  const [rank, setRank] = useQueryString('rank');

  // Partner skill filters
  const [partnerSkillCategories, setPartnerSkillCategories] = useQueryState('categories', parseAsArrayOfStrings);

  const filteredActiveSkills = useMemo(
    () =>
      sortArrayByPropertyInDirection(activeSkills, sort as keyof ActiveSkill, sortDirection)
        .filter(({ name }) => (debouncedSearch ? name.toLowerCase().includes(debouncedSearch.toLowerCase()) : true))
        .filter((skill) => (elements.length > 0 ? elements.includes(skill.element) : true))
        .filter((skill) => (activeSkillCategory ? skill.category.toLowerCase() === activeSkillCategory : true))
        .filter((skill) =>
          effects.length > 0 ? effects.some((effect) => skill.effects.some(({ name }) => name === effect)) : true,
        ),
    [activeSkillCategory, debouncedSearch, effects, elements, sort, sortDirection],
  );

  const filteredPassiveSkills = useMemo(
    () =>
      sortArrayByPropertyInDirection(passiveSkills, sort as keyof PassiveSkill, sortDirection)
        .filter(({ name }) => (debouncedSearch ? name.toLowerCase().includes(debouncedSearch.toLowerCase()) : true))
        .filter((skill) => (types.length > 0 ? types.some((type) => skill.effects.some((e) => e.type === type)) : true))
        .filter((skill) => (rank ? (rank === 'positive' ? skill.rank > 0 : skill.rank < 0) : true)),
    [debouncedSearch, rank, sort, sortDirection, types],
  );

  const filteredPartnerSkills = useMemo(
    () =>
      sortArrayByPropertyInDirection(PARTNER_SKILLS, sort as keyof PartnerSkill, sortDirection)
        .filter(({ name }) => (debouncedSearch ? name.toLowerCase().includes(debouncedSearch.toLowerCase()) : true))
        .filter((skill) => (partnerSkillCategories.length ? partnerSkillCategories.includes(skill.group) : true)),
    [debouncedSearch, partnerSkillCategories, sort, sortDirection],
  );

  return (
    <Tabs
      className="flex flex-col gap-4 md:flex-row"
      value={type}
      onValueChange={(v) => router.replace(`/skills/?type=${v}${search && `&search=${search}`}`)}
    >
      <Card className="z-10 flex h-fit flex-col gap-5 md:sticky md:top-[81px] md:w-72">
        <TabsList className="w-full">
          <TabsTrigger value="active" className="flex-1">
            Active
          </TabsTrigger>
          <TabsTrigger value="passive" className="flex-1">
            Passive
          </TabsTrigger>
          <TabsTrigger value="partner" className="flex-1">
            Partner
          </TabsTrigger>
        </TabsList>

        <Input
          className="w-full"
          label="Search"
          placeholder="Search skills"
          icon={SearchIcon}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-col items-end gap-2">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger label="Sort" icon={ArrowUpDownIcon} placeholder="Sort by" />

            <SelectContent>
              {SORTS[type].map(({ label, value }) => (
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

        <TabsContent value="active" className="space-y-5">
          <CollapsibleFilter label="Elements">
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
              {ACTIVE_SKILL_EFFECTS.map((effect) => (
                <ToggleGroupItem key={effect} value={effect} size="sm">
                  {capitalCase(effect)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </CollapsibleFilter>
        </TabsContent>

        <TabsContent value="passive" className="space-y-5">
          <MultiSelect
            label="Types"
            placeholder="Select type(s)"
            emptyIndicator="No types found"
            value={types.map((type) => ({ label: capitalCase(type), value: type }))}
            onChange={(options) => setTypes(options.length ? options.map(({ value }) => value) : null)}
            options={PASSIVE_SKILL_TYPES.map((type) => ({ label: capitalCase(type), value: type }))}
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
        </TabsContent>

        <TabsContent value="partner" className="space-y-5">
          <CollapsibleFilter label="Categories">
            <ToggleGroup
              type="multiple"
              className="md:grid md:grid-cols-6 md:gap-1"
              value={partnerSkillCategories}
              onValueChange={(v) => setPartnerSkillCategories(v.length > 0 ? v : null)}
            >
              {PARTNER_SKILL_CATEGORIES.map((category) => (
                <Tooltip key={category} content={category}>
                  <span className="flex">
                    <ToggleGroupItem value={category} className="w-10 p-0 md:w-auto">
                      <PartnerSkillImage name={category} />
                    </ToggleGroupItem>
                  </span>
                </Tooltip>
              ))}
            </ToggleGroup>
          </CollapsibleFilter>
        </TabsContent>

        <Button asChild variant="secondary" className="w-full">
          <Link href={{ pathname: '/skills', query: { type } }}>
            <FilterXIcon className="mr-2 size-4" />
            Clear Filters
          </Link>
        </Button>
      </Card>

      <div className="flex-1 @container">
        <TabsContent value="active">
          <ActiveSkills skills={filteredActiveSkills} />
        </TabsContent>

        <TabsContent value="passive">
          <PassiveSkills skills={filteredPassiveSkills} />
        </TabsContent>

        <TabsContent value="partner">
          <PartnerSkills skills={filteredPartnerSkills} />
        </TabsContent>
      </div>
    </Tabs>
  );
}

const ActiveSkills = memo(function ActiveSkills({ skills }: { skills: ActiveSkill[] }) {
  if (skills.length === 0) return <div className="mt-28 flex justify-center text-gray-11">No active skills found</div>;

  return (
    <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
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

            <p className="text-sm text-gray-11">{skill.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
});

const PassiveSkills = memo(function PassiveSkills({ skills }: { skills: PassiveSkill[] }) {
  if (skills.length === 0) return <div className="mt-28 flex justify-center text-gray-11">No passive skills found</div>;

  return (
    <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
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

const PartnerSkills = memo(function PartnerSkills({ skills }: { skills: PartnerSkill[] }) {
  if (skills.length === 0) return <div className="mt-28 flex justify-center text-gray-11">No passive skills found</div>;

  return (
    <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
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

          <p className="text-sm text-gray-11">{partnerSkill.description}</p>
        </Card>
      ))}
    </div>
  );
});
