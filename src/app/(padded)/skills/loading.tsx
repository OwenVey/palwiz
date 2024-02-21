import { LoadingPageSkeleton } from '@/components/LoadingPageSkeleton';

export default function Loading() {
  return (
    <LoadingPageSkeleton
      sidebarHeight={826}
      numItems={109}
      itemHeight={136}
      gridClasses="grid grid-cols-1 gap-4 @2xl:grid-cols-2"
    />
  );
}
