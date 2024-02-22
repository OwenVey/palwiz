import { ElementImage } from '@/components/images/ElementImage';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import ACTIVE_SKILLS from '@/data/active-skills.json';
import { type Pal } from '@/types';
import Link from 'next/link';

interface PalActiveSkillsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  pal: Pal;
}

export function PalActiveSkillsCard({ pal, ...rest }: PalActiveSkillsCardProps) {
  const activeSkills = pal.activeSkills.map((skill) => ({
    ...skill,
    ...ACTIVE_SKILLS.find(({ id }) => id === skill.id)!,
  }));
  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle>Active Skills</CardTitle>
      </CardHeader>
      <div className="flex flex-col gap-2">
        {activeSkills.map((skill) => (
          <Link key={skill.id} href={`/skills/${skill.id}`}>
            <Card className="relative border-gray-5 bg-gray-3" hoverEffect>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Tooltip content={skill.element} className="capitalize">
                    <ElementImage name={skill.element} alt={skill.element} width={32} height={32} />
                  </Tooltip>
                  <div className="font-medium text-gray-12">{skill.name}</div>
                </div>

                <Badge className="absolute right-2 top-2 bg-gray-5 text-sm">Lv {skill.level}</Badge>
              </div>
              <div className="-mt-1 space-y-2 pl-12">
                <div className="flex gap-2">
                  <Badge variant="red">Power: {skill.power}</Badge>
                  <Badge variant="yellow">CT: {skill.cooldownTime}</Badge>
                  <Badge variant="gray">
                    Range: {skill.minRange === skill.maxRange ? skill.minRange : `${skill.minRange}-${skill.maxRange}`}
                  </Badge>
                </div>

                <p className="text-sm text-gray-11">{skill.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Card>
  );
}
