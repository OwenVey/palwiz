import { SkillsGrid } from '@/app/skills/skills-grid';
import skillsJson from '@/data/skills.json';
import { SkillSchema } from '@/schemas/skill';
import { type Metadata } from 'next';
import { Suspense } from 'react';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Skills',
};

export default function SkillsPage() {
  const skills = z.array(SkillSchema).parse(skillsJson);

  return (
    <Suspense>
      <SkillsGrid skills={skills} />
    </Suspense>
  );
}
