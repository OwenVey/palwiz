import { Spinner } from '@/components/Spinner';
import { type Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Map',
};

const Map = dynamic(() => import('@/components/Map'), {
  loading: () => (
    <div className="fixed grid h-screen w-screen place-items-center bg-[#102536]">
      <Spinner className="size-6" />
    </div>
  ),
  ssr: false,
});

export default function MyPage() {
  return <Map />;
}
