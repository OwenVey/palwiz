import { items } from '@/data/parsed';
import { getItemById } from '@/lib/utils';

export function generateMetadata({ params }: { params: { id: string } }) {
  const item = getItemById(params.id);
  return {
    title: item ? item.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return items.map(({ id }) => ({ id }));
}

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = getItemById(params.id);

  if (!item) {
    return <div>Could not find item with id: {params.id}</div>;
  }

  return <div>{item.name}</div>;
}
