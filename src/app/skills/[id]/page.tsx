import { skills } from '@/data/parsed';
import { getSkillById } from '@/lib/utils';

export function generateMetadata({ params }: { params: { id: string } }) {
  const skill = getSkillById(params.id);
  return {
    title: skill ? skill.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return skills.map(({ id }) => ({ id }));
}

export default function SkillPage({ params }: { params: { id: string } }) {
  const skill = getSkillById(params.id);

  if (!skill) {
    return <div>Could not find skill with id: {params.id}</div>;
  }

  return <div>{skill.name}</div>;
}
