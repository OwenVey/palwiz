import items from '@/data/items.json';
import { ItemSchema } from '@/schemas/item';

export function generateMetadata({ params }: { params: { id: string } }) {
  const item = items.find((pal) => pal.id === params.id);
  return {
    title: item ? item.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return items.map(({ id }) => ({ id }));
}

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = ItemSchema.parse(items.find(({ id }) => id === params.id));

  if (!item) return <div>No item found with the id {params.id}</div>;

  return <div>{item.name}</div>;
}
