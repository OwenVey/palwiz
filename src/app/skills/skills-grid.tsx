'use client';

import { ElementImage } from '@/components/ElementImage';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { type Skill } from '@/types';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';

type SkillsGridProps = {
  skills: Skill[];
};
export function SkillsGrid({ skills }: SkillsGridProps) {
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const filteredSkills = skills.filter(({ name }) =>
    search ? name.toLowerCase().includes(search.toLowerCase()) : true,
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="h-fit md:sticky md:top-[81px] md:w-72">
        <Input
          className="w-full"
          label="Search"
          placeholder="Search skills"
          icon={SearchIcon}
          value={search}
          onChange={({ target }) => setSearch(target.value ? target.value : null)}
        />
      </Card>

      <div className="grid flex-1 grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <Link key={skill.id} href={`/skills/${skill.id}`}>
            <Card className="flex h-full flex-col gap-2" hoverEffect>
              <div className="flex items-center gap-2">
                <ElementImage element={skill.element} />
                <div>{skill.name}</div>
              </div>
              {/* <div className="font-mono text-xs text-gray-11">{skill.id}</div> */}
              {/* <div className="font-mono text-xs text-gray-11">{skill.internalId}</div> */}
              <p className="text-sm text-gray-11">{skill.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
