import { LoadingPageSkeleton } from '@/components/LoadingPageSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <LoadingPageSkeleton sidebarHeight={398}>
      <div className="flex flex-1 flex-col gap-4">
        <Skeleton className="h-[116px]" />
        <Skeleton className="h-[192px]" />
      </div>
    </LoadingPageSkeleton>
  );
}
