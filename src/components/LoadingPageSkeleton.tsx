import { Skeleton } from '@/components/ui/skeleton';
import { range } from '@/lib/utils';

export function LoadingPageSkeleton({
  sidebarHeight,
  itemHeight,
  numItems,
  gridClasses,
}: {
  sidebarHeight: number;
  itemHeight: number;
  numItems: number;
  gridClasses: string;
}) {
  return (
    <div className="flex animate-pulse flex-col gap-4 md:flex-row">
      <Skeleton className="max-h-[50vh] w-full md:max-h-none md:w-72" style={{ height: sidebarHeight }} />

      <div className="flex-1 @container">
        <div className={gridClasses}>
          {range(numItems).map((i) => (
            <Skeleton key={i} className="w-full" style={{ height: itemHeight }}></Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
}
