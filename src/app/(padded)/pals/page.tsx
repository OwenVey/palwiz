import { PalsGrid } from '@/app/(padded)/pals/pals-grid';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pals',
};

export default function PalsPage() {
  return <PalsGrid />;
}
