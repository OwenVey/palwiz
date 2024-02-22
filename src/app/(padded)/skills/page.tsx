import { ActiveSkillsGrid } from '@/app/(padded)/skills/active-skills-grid';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Active Skills',
};

export default function SkillsPage() {
  return <ActiveSkillsGrid />;
}
