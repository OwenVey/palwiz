import { LoadingPageSkeleton } from '@/components/LoadingPageSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <LoadingPageSkeleton sidebarHeight={1106}>
      <div className="flex flex-1 grid-cols-1 flex-col gap-4 md:grid md:grid-cols-2">
        <div className="grid gap-4">
          <Skeleton className="min-h-36" />

          <Skeleton className="min-h-36" />
        </div>

        <Skeleton className="h-80" />

        <Skeleton className="col-span-2 h-[192px]" />

        <Skeleton className="col-span-2 h-[900px]" />
      </div>
    </LoadingPageSkeleton>
  );
}
