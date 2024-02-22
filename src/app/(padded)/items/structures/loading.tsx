import { LoadingPageSkeleton } from '@/components/LoadingPageSkeleton';

export default function Loading() {
  return (
    <LoadingPageSkeleton
      sidebarHeight={526}
      numItems={238}
      itemHeight={152}
      gridClasses="grid grid-cols-2 gap-4 @2xl:grid-cols-3 @5xl:grid-cols-4"
    />
  );
}
