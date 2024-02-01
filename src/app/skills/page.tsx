import { ElementImage } from '@/components/ElementImage';
import { Card } from '@/components/ui/card';
import skillsJson from '@/data/skills.json';
import { SkillSchema } from '@/schemas/skill';
import { type Metadata } from 'next';
import Link from 'next/link';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Skills',
};

export default function SkillsPage() {
  const skills = z.array(SkillSchema).parse(skillsJson);

  return (
    <div>
      <div>{skills.length} Results</div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {skills.map((skill) => (
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
