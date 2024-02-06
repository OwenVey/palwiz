import { SkillsGrid } from '@/app/skills/skills-grid';
import { type Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Skills',
};

export default function SkillsPage() {
  return (
    <Suspense>
      <SkillsGrid />
    </Suspense>
  );
}
