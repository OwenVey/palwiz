import { NotFoundTemplate } from '@/components/NotFoundTemplate';

export default function NotFound() {
  return (
    <NotFoundTemplate
      title="Item not found"
      message="Sorry, the item with that id could not be found."
      returnText="View all items"
      returnHref="/items"
    />
  );
}
