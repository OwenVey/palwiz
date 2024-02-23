'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-lg border border-transparent text-sm font-medium text-gray-12 ring-offset-gray-1 transition-colors focus-visible:border-primary-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-4 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-gray-6 bg-gray-3 hover:border-gray-7 hover:bg-gray-4 active:bg-gray-5 data-[state=on]:border-primary-9 data-[state=on]:bg-primary-4',
        ghost:
          'bg-transparent hover:bg-gray-3 hover:text-gray-11 active:bg-gray-4 data-[state=on]:bg-gray-5 data-[state=on]:text-gray-12',
        outline:
          'border-gray-7 bg-transparent hover:border-gray-7 hover:bg-gray-3 active:bg-gray-4 data-[state=on]:border-gray-8 data-[state=on]:bg-gray-5',
        red: 'border-red-6 bg-red-3 text-red-12 hover:border-red-7 hover:bg-red-4 active:bg-red-5 data-[state=on]:border-red-9 data-[state=on]:bg-red-5 data-[state=on]:text-gray-12',
        yellow:
          'border-yellow-6 bg-yellow-3 text-yellow-12 hover:border-yellow-7 hover:bg-yellow-4 active:bg-yellow-5 data-[state=on]:border-yellow-9 data-[state=on]:bg-yellow-5 data-[state=on]:text-gray-12',
        green:
          'border-green-6 bg-green-3 text-green-12 hover:border-green-7 hover:bg-green-4 active:bg-green-5 data-[state=on]:border-green-9 data-[state=on]:bg-green-5 data-[state=on]:text-gray-12',
        blue: 'border-blue-6 bg-blue-3 text-blue-12 hover:border-blue-7 hover:bg-blue-4 active:bg-blue-5 data-[state=on]:border-blue-9 data-[state=on]:bg-blue-5 data-[state=on]:text-gray-12',
        gray: 'border-gray-6 bg-gray-3 hover:border-gray-7 hover:bg-gray-4 active:bg-gray-5 data-[state=on]:border-gray-9 data-[state=on]:bg-gray-5',
        purple:
          'border-purple-6 bg-purple-3 text-purple-12 hover:border-purple-7 hover:bg-purple-4 active:bg-purple-5 data-[state=on]:border-purple-9 data-[state=on]:bg-purple-5 data-[state=on]:text-gray-12',
      },
      size: {
        default: 'h-10 px-3',
        icon: 'size-10',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
