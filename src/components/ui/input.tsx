import * as React from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon: Icon, ...props }, ref) => {
    const id = React.useId();

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className="relative">
          {Icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {<Icon className="size-5 text-gray-10" aria-hidden="true" />}
            </div>
          )}
          <input
            id={id}
            type={type}
            className={cn(
              Icon ? 'pl-10 pr-3' : 'px-3',
              'flex h-10 w-full rounded-lg border border-gray-6 bg-gray-1 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-10 hover:border-gray-7 focus-visible:border-primary-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-4 disabled:cursor-not-allowed disabled:opacity-50',
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
