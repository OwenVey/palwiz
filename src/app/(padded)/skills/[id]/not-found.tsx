import { NotFoundTemplate } from '@/components/NotFoundTemplate';

export default function NotFound() {
  return (
    <NotFoundTemplate
      title="Skill not found"
      message="Sorry, the skill with that id could not be found."
      returnText="View all skills"
      returnHref="/skills"
    />
  );
}
