import { LoadingPageSkeleton } from '@/components/LoadingPageSkeleton';

export default function Loading() {
  return (
    <LoadingPageSkeleton
      sidebarHeight={814}
      numItems={137}
      itemHeight={152}
      gridClasses="grid auto-rows-fr grid-cols-2 gap-4 @md:grid-cols-3 @xl:grid-cols-4 @[44rem]:grid-cols-5"
    />
  );
}
