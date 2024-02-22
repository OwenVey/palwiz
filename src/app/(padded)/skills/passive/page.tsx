import { PassiveSkillsGrid } from '@/app/(padded)/skills/passive/passive-skills-grid';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Passive Skills',
};

export default function PassiveSkillsPage() {
  return <PassiveSkillsGrid />;
}
