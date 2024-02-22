import { StructuresGrid } from '@/app/(padded)/items/structures/structures-grid';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Structures',
};

export default function StructuresPage() {
  return <StructuresGrid />;
}
