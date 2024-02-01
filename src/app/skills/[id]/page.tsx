import skills from '@/data/skills.json';
import { getEntityFromListById } from '@/lib/utils';
import { SkillSchema } from '@/schemas/skill';

export function generateMetadata({ params }: { params: { id: string } }) {
  const skill = skills.find(({ id }) => id === params.id);
  return {
    title: skill ? skill.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return skills.map(({ id }) => ({ id }));
}

export default function SkillPage({ params }: { params: { id: string } }) {
  const { data: skill, error } = getEntityFromListById(skills, params.id, SkillSchema);

  if (error !== null) {
    return <div>{error}</div>;
  }

  return <div>{skill.name}</div>;
}
