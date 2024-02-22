'use client';

import { cn } from '@/lib/utils';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

interface LinkTabsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LinkTabs({ className, children, ...rest }: LinkTabsProps) {
  return (
    <div
      {...rest}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-1 rounded-lg border border-gray-4 bg-gray-3 p-1 text-gray-10 shadow-inner',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface LinkTabProps extends LinkProps {
  className?: string;
  children?: React.ReactNode;
}
export function LinkTab({ className, children, href, ...rest }: LinkTabProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      {...rest}
      href={href}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-gray-3 transition-all hover:bg-gray-2 hover:text-gray-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-12 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gray-1 data-[state=active]:text-gray-12 data-[state=active]:shadow-sm',
        className,
      )}
      data-state={isActive ? 'active' : undefined}
    >
      {children}
    </Link>
  );
}
