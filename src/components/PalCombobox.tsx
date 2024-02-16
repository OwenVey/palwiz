'use client';

import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { PalImage } from '@/components/PalImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { normalPals } from '@/data/parsed';
import { cn } from '@/lib/utils';
import { type Pal } from '@/types';
import { type PopoverTriggerProps } from '@radix-ui/react-popover';

interface PalComboboxProps extends PopoverTriggerProps {
  label?: string;
  value: string;
  setValue: (value: string) => void;
}
export function PalCombobox({ label, value, setValue, className, ...rest }: PalComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn(className, 'flex min-w-56 flex-col gap-1.5')}>
        {label && <Label>{label}</Label>}
        <PopoverTrigger asChild {...rest}>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between px-3">
            {value ? (
              <SelectedPal pal={normalPals.find((pal) => pal.id === value)} />
            ) : (
              <span className="text-gray-10">Select pal...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search pals..." />
          <CommandEmpty>No pals found</CommandEmpty>
          <CommandGroup className="px-0">
            <ScrollArea className="flex max-h-72 flex-col px-1">
              {normalPals
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((pal) => (
                  <CommandItem
                    className={cn(value === pal.id && 'bg-primary-9 aria-selected:bg-primary-10')}
                    key={pal.internalName}
                    value={pal.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <PalImage id={pal.id} className="mr-2 size-6 rounded-full" />
                    {pal.name}
                    <Badge variant="gray" className="ml-auto text-2xs">
                      #{pal.zukanIndex}
                      {pal.zukanIndexSuffix}
                    </Badge>
                  </CommandItem>
                ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function SelectedPal({ pal }: { pal?: Pal }) {
  if (!pal) return;
  return (
    <div className="flex items-center">
      <PalImage id={pal.id} className="mr-2 size-6 rounded-full" />
      <span className="text-gray-12">{pal.name}</span>
    </div>
  );
}
