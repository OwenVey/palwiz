'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center border border-transparent justify-center rounded-lg text-sm font-medium ring-offset-gray-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-4 focus-visible:border-primary-9 disabled:pointer-events-none disabled:opacity-50 text-gray-12',
  {
    variants: {
      variant: {
        default:
          'bg-gray-3 hover:bg-gray-4 active:bg-gray-5 data-[state=on]:bg-primary-4 border-gray-6 hover:border-gray-7 data-[state=on]:border-primary-9',
        ghost:
          'bg-transparent hover:bg-gray-3 active:bg-gray-4 hover:text-gray-11 data-[state=on]:bg-gray-5 data-[state=on]:text-gray-12',
        outline:
          'border-gray-7 bg-transparent hover:bg-gray-3 active:bg-gray-4 hover:border-gray-7 data-[state=on]:border-gray-8 data-[state=on]:bg-gray-5',
        red: 'bg-red-3 hover:bg-red-4 active:bg-red-5 data-[state=on]:bg-red-5 border-red-6 hover:border-red-7 data-[state=on]:border-red-9',
        yellow:
          'bg-yellow-3 hover:bg-yellow-4 active:bg-yellow-5 data-[state=on]:bg-yellow-5 border-yellow-6 hover:border-yellow-7 data-[state=on]:border-yellow-9',
        green:
          'bg-green-3 hover:bg-green-4 active:bg-green-5 data-[state=on]:bg-green-5 border-green-6 hover:border-green-7 data-[state=on]:border-green-9',
        blue: 'bg-blue-3 hover:bg-blue-4 active:bg-blue-5 data-[state=on]:bg-blue-5 border-blue-6 hover:border-blue-7 data-[state=on]:border-blue-9',
        gray: 'bg-gray-3 hover:bg-gray-4 active:bg-gray-5 data-[state=on]:bg-gray-5 border-gray-6 hover:border-gray-7 data-[state=on]:border-gray-9',
        purple:
          'bg-purple-3 hover:bg-purple-4 active:bg-purple-5 data-[state=on]:bg-purple-5 border-purple-6 hover:border-purple-7 data-[state=on]:border-purple-9',
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
