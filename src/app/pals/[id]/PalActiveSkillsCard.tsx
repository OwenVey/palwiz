import { ElementImage } from '@/components/ElementImage';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { type Pal } from '@/types';
import Link from 'next/link';

interface PalActiveSkillsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  pal: Pal;
}

export function PalActiveSkillsCard({ pal, ...rest }: PalActiveSkillsCardProps) {
  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle>Active Skills</CardTitle>
      </CardHeader>
      <div className="flex flex-col gap-2">
        {pal.activeSkills.map((skill) => (
          <Link key={skill.id} href={`/skills/${skill.id}`}>
            <Card className="relative border-gray-5 bg-gray-3" hoverEffect>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <ElementImage className="size-8" element={skill.element} tooltipSide="left" />
                  <div className="font-medium text-gray-12">{skill.name}</div>
                </div>

                <Badge className="absolute right-2 top-2 bg-gray-5 font-mono text-sm">Lv {skill.level}</Badge>
              </div>
              <div className="-mt-1 space-y-2 pl-12">
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
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Card>
  );
}
