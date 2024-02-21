import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-lg border border-gray-3 bg-gray-2', className)} {...props} />;
}

export { Skeleton };
