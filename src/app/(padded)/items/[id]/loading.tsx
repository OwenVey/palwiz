import { LoadingPageSkeleton } from '@/components/LoadingPageSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <LoadingPageSkeleton sidebarHeight={1014}>
      <div className="flex flex-1 flex-col gap-4">
        <Skeleton className="h-[92px]" />
        <Skeleton className="h-[218px]" />
      </div>
    </LoadingPageSkeleton>
  );
}
