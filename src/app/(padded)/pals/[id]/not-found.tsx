import { NotFoundTemplate } from '@/components/NotFoundTemplate';

export default function NotFound() {
  return (
    <NotFoundTemplate
      title="Pal not found"
      message="Sorry, the pal with that id could not be found."
      returnText="View all pals"
      returnHref="/pals"
    />
  );
}
