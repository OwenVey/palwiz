'use client';

import { ElementImage } from '@/components/ElementImage';
import { PalImage } from '@/components/PalImage';
import { ColumnHeader } from '@/components/ui/column-header';
import { type Pal } from '@/types';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';

import { ColumnToggle } from '@/components/ui/column-toggle';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const columnHelper = createColumnHelper<Pal>();

export const columns = [
  columnHelper.accessor((row) => `${row.zukanIndex.toString()}${row.zukanIndexSuffix}`, {
    id: 'ID',
    header: ({ column }) => <ColumnHeader column={column} title="#" />,
    cell: ({ row }) => `${row.original.zukanIndex}${row.original.zukanIndexSuffix}`,
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
    cell: ({ row, getValue }) => (
      <div className="flex items-center gap-2">
        <PalImage pal={row.original.id} className="size-8 rounded-full" />
        <span>{getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('elementType1', {
    id: 'Type 1',
    header: ({ column }) => <ColumnHeader column={column} title="Type 1" />,
    cell: ({ getValue }) => <ElementImage key={getValue()} element={getValue()} />,
  }),
  columnHelper.accessor('elementType2', {
    id: 'Type 2',
    header: ({ column }) => <ColumnHeader column={column} title="Type 2" />,
    cell: ({ getValue }) => {
      const type = getValue();
      return type && <ElementImage className="w-fit" key={type} element={type} />;
    },
  }),
];

interface PalTableViewProps {
  pals: Pal[];
  search: string;
}

export function PalTableView({ pals, search }: PalTableViewProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([{ id: 'name', value: search }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: pals,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  useEffect(() => {
    console.log('update search', search);
    table.getColumn('name')?.setFilterValue(search);
  }, [table, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <Input
          icon={SearchIcon}
          placeholder="Search pals..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />

        <ColumnToggle table={table} />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
