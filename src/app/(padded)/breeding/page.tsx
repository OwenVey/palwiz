import { Breeding } from '@/app/(padded)/breeding/breeding';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breeding',
};

export default function BreedingPage() {
  return <Breeding />;
}
