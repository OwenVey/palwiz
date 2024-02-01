import items from '@/data/items.json';
import { getEntityFromListById } from '@/lib/utils';
import { ItemSchema } from '@/schemas/item';

export function generateMetadata({ params }: { params: { id: string } }) {
  const item = items.find(({ id }) => id === params.id);
  return {
    title: item ? item.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return items.map(({ id }) => ({ id }));
}

export default function ItemPage({ params }: { params: { id: string } }) {
  const { data: item, error } = getEntityFromListById(items, params.id, ItemSchema);

  if (error !== null) {
    return <div>{error}</div>;
  }

  return <div>{item.name}</div>;
}
