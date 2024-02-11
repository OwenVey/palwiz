import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { type CollapsibleProps } from '@radix-ui/react-collapsible';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface CollapsibleFilterProps extends CollapsibleProps {
  label: string;
}
export function CollapsibleFilter({ label, className, children, ...rest }: CollapsibleFilterProps) {
  return (
    <Collapsible className={cn('space-y-1', className)} {...rest}>
      <div className="flex items-center justify-between">
        <Label className="capitalize">{label}</Label>
        <CollapsibleTrigger className="group grid size-6 place-items-center rounded-md text-gray-11 transition-colors hover:bg-gray-4 hover:text-gray-12 active:bg-gray-5">
          <PlusIcon className="hidden size-4 group-data-[state=closed]:block" />
          <MinusIcon className="hidden size-4 group-data-[state=open]:block" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
