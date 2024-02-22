import { LoadingPageSkeleton } from '@/components/LoadingPageSkeleton';

export default function Loading() {
  return (
    <LoadingPageSkeleton
      sidebarHeight={630}
      numItems={129}
      itemHeight={122}
      gridClasses="grid auto-rows-fr grid-cols-1 gap-4 @2xl:grid-cols-2"
    />
  );
}
