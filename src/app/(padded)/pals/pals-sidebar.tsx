'use client';

import { PAL_SORTS, palsQueryParsers } from '@/app/(padded)/pals/pals-search-params';
import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { SortFilter } from '@/components/SortFilter';
import { StickySidebar } from '@/components/StickySidebar';
import { ElementImage } from '@/components/images/ElementImage';
import { PartnerSkillImage } from '@/components/images/PartnerSkillImage';
import { WorkTypeImage } from '@/components/images/WorkTypeImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip } from '@/components/ui/tooltip';
import { PAL_ELEMENTS, WORK_SUITABILITIES } from '@/constants';
import { PARTNER_SKILL_CATEGORIES } from '@/lib/pal-utils';
import { type WorkSuitability } from '@/types';
import { FilterXIcon, GemIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useQueryStates } from 'nuqs';

export function PalsSidebar({ numResults }: { numResults: number }) {
  const [{ search, sort, sortDirection, rarity, work, elements, partnerSkills }, setQueryParams] =
    useQueryStates(palsQueryParsers);

  function updateQuery(values: Parameters<typeof setQueryParams>[0]) {
    void setQueryParams(values, { clearOnDefault: true, shallow: false });
  }

  return (
    <StickySidebar>
      <div className="space-y-5">
        <Input
          className="w-full"
          label="Search"
          placeholder="Search pals"
          icon={SearchIcon}
          value={search}
          onChange={(e) => updateQuery({ search: e.target.value })}
        />

        <SortFilter
          options={PAL_SORTS}
          sort={sort}
          direction={sortDirection}
          onSortChange={(sort) => updateQuery({ sort })}
          onDirectionChange={(sortDirection) => updateQuery({ sortDirection })}
        />

        <Select value={rarity} onValueChange={(rarity) => updateQuery({ rarity })}>
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

        <CollapsibleFilter label="Work Suitability">
          <ToggleGroup
            type="single"
            className="md:grid md:grid-cols-6 md:gap-1"
            value={work ?? ''}
            onValueChange={(work: WorkSuitability) => updateQuery({ work: work.length ? work : null })}
          >
            {WORK_SUITABILITIES.map((work) => (
              <Tooltip key={work.id} content={work.label}>
                <span className="flex w-10 md:w-auto">
                  <ToggleGroupItem value={work.id} className="w-full p-0">
                    <WorkTypeImage name={work.id} alt={work.id} width={32} height={32} />
                  </ToggleGroupItem>
                </span>
              </Tooltip>
            ))}
          </ToggleGroup>
        </CollapsibleFilter>

        <CollapsibleFilter label="Elements">
          <ToggleGroup
            type="multiple"
            className="md:grid md:grid-cols-6 md:gap-1"
            value={elements}
            onValueChange={(elements) => updateQuery({ elements: elements.length ? elements : null })}
          >
            {PAL_ELEMENTS.map((element) => (
              <Tooltip key={element} content={element} className="capitalize">
                <span className="flex w-10 md:w-auto">
                  <ToggleGroupItem value={element} className="w-full p-0">
                    <ElementImage name={element} alt={element} width={24} height={24} />
                  </ToggleGroupItem>
                </span>
              </Tooltip>
            ))}
          </ToggleGroup>
        </CollapsibleFilter>

        <CollapsibleFilter label="Partner Skill Category">
          <ToggleGroup
            type="multiple"
            className="md:grid md:grid-cols-6 md:gap-1"
            value={partnerSkills}
            onValueChange={(partnerSkills) =>
              updateQuery({ partnerSkills: partnerSkills.length ? partnerSkills : null })
            }
          >
            {PARTNER_SKILL_CATEGORIES.map((category) => (
              <Tooltip key={category} content={category}>
                <span className="flex w-10 md:w-auto">
                  <ToggleGroupItem value={category} className="w-full p-0">
                    <PartnerSkillImage name={category} alt={category} width={38} height={38} className="scale-[1.15]" />
                  </ToggleGroupItem>
                </span>
              </Tooltip>
            ))}
          </ToggleGroup>
        </CollapsibleFilter>

        <div className="flex flex-col items-end gap-2">
          <div className="text-nowrap text-sm text-gray-11">{numResults} results</div>

          <Button asChild variant="secondary" className="w-full">
            <Link href="/pals">
              <FilterXIcon className="mr-2 size-4" />
              Clear Filters
            </Link>
          </Button>
        </div>
      </div>
    </StickySidebar>
  );
}
