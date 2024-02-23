import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-1.5 py-0.5 font-mono text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-gray-12 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-gray-6 text-gray-12',
        secondary: 'border-transparent bg-gray-3 text-gray-12',
        tertiary: 'border-transparent bg-gray-12 text-gray-1',

        // colors
        primary: 'border-primary-6 bg-primary-3 text-primary-11',
        red: 'border-red-6 bg-red-3 text-red-11',
        orange: 'border-orange-6 bg-orange-3 text-orange-11',
        yellow: 'border-yellow-6 bg-yellow-3 text-yellow-11',
        lime: 'border-lime-6 bg-lime-3 text-lime-11',
        green: 'border-green-6 bg-green-3 text-green-11',
        iris: 'border-iris-6 bg-iris-3 text-iris-11',
        gray: 'border-gray-6 bg-gray-3 text-gray-11',
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
