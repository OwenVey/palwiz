import { LoadingPageSkeleton } from '@/components/LoadingPageSkeleton';

export default function Loading() {
  return (
    <LoadingPageSkeleton
      sidebarHeight={534}
      numItems={121}
      itemHeight={88}
      gridClasses="grid auto-rows-fr grid-cols-1 gap-4 @2xl:grid-cols-2"
    />
  );
}
