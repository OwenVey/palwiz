import { ItemsGrid } from '@/app/(padded)/items/items-grid';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Items',
};

export default function ItemsPage() {
  return <ItemsGrid />;
}
