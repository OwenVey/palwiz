import { SkillsGrid } from '@/app/(padded)/skills/skills-grid';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
};

export default function SkillsPage() {
  return <SkillsGrid />;
}
