import { PartnerSkillsGrid } from '@/app/(padded)/skills/partner/partner-skills-grid';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner Skills',
};

export default function PartnerSkillsPage() {
  return <PartnerSkillsGrid />;
}
