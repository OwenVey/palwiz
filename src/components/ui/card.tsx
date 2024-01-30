import * as React from 'react';

import { cn } from '@/lib/utils';

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CustomCardProps>(({ className, hoverEffect = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-gray-4 bg-gray-2 p-4 shadow-sm',
      hoverEffect && 'transition-all hover:border-primary-9 hover:bg-gray-3 hover:shadow-md hover:shadow-primary-5',
      className,
    )}
    {...props}
  ></div>
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4 flex flex-col gap-1.5', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-lg font-semibold leading-none', className)} {...props} />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn('text-sm text-gray-11', className)} {...props} />,
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('', className)} {...props} />,
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('mt-4 flex items-center', className)} {...props} />,
);
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
