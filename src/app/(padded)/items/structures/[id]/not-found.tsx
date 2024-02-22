import { NotFoundTemplate } from '@/components/NotFoundTemplate';

export default function NotFound() {
  return (
    <NotFoundTemplate
      title="Structure not found"
      message="Sorry, the structure with that id could not be found."
      returnText="View all structures"
      returnHref="/items/structures"
    />
  );
}
