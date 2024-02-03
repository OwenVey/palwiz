'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { type Table } from '@tanstack/react-table';
import { SlidersHorizontalIcon } from 'lucide-react';

interface ColumnToggleProps<TData> {
  table: Table<TData>;
}

export function ColumnToggle<TData>({ table }: ColumnToggleProps<TData>) {
  const columns = table
    .getAllColumns()
    .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontalIcon className="mr-2 h-4 w-4" />
          Toggle Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[--radix-dropdown-menu-trigger-width] max-w-52">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
