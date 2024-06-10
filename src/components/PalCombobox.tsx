'use client';

import { PalImage } from '@/components/images/PalImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import NORMAL_PALS_MINIMAL from '@/data/normal-pals-minimal.json';
import { cn } from '@/lib/utils';
import { type PopoverTriggerProps } from '@radix-ui/react-popover';
import { ChevronsUpDown, XIcon } from 'lucide-react';
import * as React from 'react';

const SORTED_PALS = NORMAL_PALS_MINIMAL.sort((a, b) => a.name.localeCompare(b.name));

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
        <div className="relative">
          <PopoverTrigger asChild {...rest}>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between px-3">
              {value ? (
                <SelectedPal pal={SORTED_PALS.find(({ id }) => id === value)} />
              ) : (
                <span className="text-gray-10">Select pal</span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-gray-10" />
            </Button>
          </PopoverTrigger>

          {value && (
            <Button
              onClick={() => setValue('')}
              className="absolute right-8 top-2 size-6 rounded-full p-1 text-gray-10 hover:text-gray-12"
              variant="ghost"
              size="icon"
            >
              <XIcon className="size-4" />
            </Button>
          )}
        </div>
      </div>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search pals" />
          <CommandEmpty>No pals found</CommandEmpty>
          <CommandList>
            <ScrollArea className="flex max-h-72 flex-col px-1">
              {SORTED_PALS.map((pal) => (
                <CommandItem
                  className={cn(value === pal.id && 'bg-primary-9 aria-selected:bg-primary-10')}
                  key={pal.id}
                  value={pal.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <PalImage name={pal.id} alt={pal.name} width={24} height={24} className="mr-2 rounded-full" />
                  {pal.name}
                  <Badge variant="gray" className="ml-auto text-2xs">
                    #{pal.zukanIndex}
                    {pal.zukanIndexSuffix}
                  </Badge>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function SelectedPal({ pal }: { pal?: { id: string; name: string } }) {
  if (!pal) return;
  return (
    <div className="flex items-center">
      <PalImage name={pal.id} alt={pal.name} width={24} height={24} className="mr-2 rounded-full" />
      <span className="text-gray-12">{pal.name}</span>
    </div>
  );
}
