import { Spinner } from '@/components/Spinner';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function MyPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => (
          <div className="fixed grid h-screen w-screen place-items-center">
            <Spinner className="size-6" />
          </div>
        ),
        ssr: false,
      }),
    [],
  );

  return <Map />;
}
