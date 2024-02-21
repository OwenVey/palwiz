import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-gray-1 transition-colors focus-visible:outline-none focus-visible:ring-2 border border-transparent focus-visible:ring-primary-4 disabled:pointer-events-none disabled:opacity-50 focus-visible:border-primary-9',
  {
    variants: {
      variant: {
        default: 'bg-primary-9 text-white hover:bg-primary-10 active:bg-primary-11',
        destructive: 'bg-red-9 text-white hover:bg-red-10 active:bg-red-11',
        outline: 'border-gray-6 hover:border-gray-7 bg-gray-1 hover:bg-gray-2 text-gray-12 active:bg-gray-3',
        secondary: 'bg-gray-3 text-gray-12 hover:bg-gray-4 border-gray-6 hover:border-gray-7 active:bg-gray-5',
        ghost: 'hover:bg-gray-3 active:bg-gray-4 text-gray-12',
        link: 'text-gray-12 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
