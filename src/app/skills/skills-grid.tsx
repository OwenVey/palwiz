'use client';

import { ElementImage } from '@/components/ElementImage';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { skills } from '@/data/parsed';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';

export function SkillsGrid() {
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

      <div className="flex-1 @container">
        <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
          {filteredSkills.map((skill) => (
            <Link key={skill.id} href={`/skills/${skill.id}`}>
              <Card className="flex h-full flex-col gap-2" hoverEffect>
                <div className="flex items-center gap-2">
                  <ElementImage element={skill.element} />
                  <div>{skill.name}</div>
                </div>
                {/* <div className="font-mono text-xs text-gray-11">{skill.id}</div> */}
                {/* <div className="font-mono text-xs text-gray-11">{skill.internalId}</div> */}
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
