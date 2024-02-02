import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-12 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-gray-12 border-gray-6',
        secondary: 'border-transparent bg-gray-3 text-gray-12',
        tertiary: 'border-transparent bg-gray-12 text-gray-1',
        red: 'bg-red-3 text-red-11 border-red-6',
        orange: 'bg-orange-3 text-orange-11 border-orange-6',
        yellow: 'bg-yellow-3 text-yellow-11 border-yellow-6',
        lime: 'bg-lime-3 text-lime-11 border-lime-6',
        green: 'bg-green-3 text-green-11 border-green-6',
        iris: 'bg-iris-3 text-iris-11 border-iris-6',
        gray: 'text-gray-11 bg-gray-3 border-gray-6',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
