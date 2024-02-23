import { Skeleton } from '@/components/ui/skeleton';
import { range } from '@/lib/utils';

interface BaseProps {
  sidebarHeight: number;
}

interface WithoutChildrenProps extends BaseProps {
  itemHeight: number;
  numItems: number;
  gridClasses: string;
  children?: never;
}

interface WithChildrenProps extends BaseProps {
  itemHeight?: never;
  numItems?: never;
  gridClasses?: never;
  children: React.ReactNode;
}

type LoadingPageSkeletonProps = WithChildrenProps | WithoutChildrenProps;

export function LoadingPageSkeleton({
  sidebarHeight,
  itemHeight,
  numItems = 100,
  gridClasses,
  children,
}: LoadingPageSkeletonProps) {
  return (
    <div className="flex animate-pulse flex-col gap-4 md:flex-row">
      <Skeleton className="max-h-[50vh] w-full md:max-h-none md:w-[294px]" style={{ height: sidebarHeight }} />
      {children ? (
        children
      ) : (
        <div className="flex-1 @container">
          <div className={gridClasses}>
            {range(numItems).map((i) => (
              <Skeleton key={i} className="w-full" style={{ height: itemHeight }}></Skeleton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
