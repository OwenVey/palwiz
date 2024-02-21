import { Skeleton } from '@/components/ui/skeleton';
import { range } from '@/lib/utils';

export default function Loading() {
  return (
    <div className="flex animate-pulse flex-col gap-4 md:flex-row">
      <Skeleton className="h-full w-72" style={{ height: 752 }} />

      <div className="flex-1 @container">
        <div className="grid grid-cols-2 gap-4 @2xl:grid-cols-3 @5xl:grid-cols-4">
          {range(137).map((i) => (
            <Skeleton key={i} className="w-full" style={{ height: 132 }}></Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
}
