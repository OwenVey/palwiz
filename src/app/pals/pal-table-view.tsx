'use client';

import { ElementImage } from '@/components/ElementImage';
import { PalImage } from '@/components/PalImage';
import { ColumnHeader } from '@/components/ui/column-header';
import { type Pal } from '@/types';
import { createColumnHelper, flexRender, type Table as TableType } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const columnHelper = createColumnHelper<Pal>();

export const columns = [
  columnHelper.accessor((row) => `${row.zukanIndex.toString()}${row.zukanIndexSuffix}`, {
    id: '#',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => `${row.original.zukanIndex}${row.original.zukanIndexSuffix}`,
  }),
  columnHelper.accessor('name', {
    id: 'Name',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row, getValue }) => (
      <div className="flex items-center gap-2">
        <PalImage pal={row.original.id} className="border-5 size-8 rounded-full border border-gray-3" />
        <span className="text-nowrap">{getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('captureRateCorrect', {
    id: 'Capture Rate',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('defense', {
    id: 'Defense',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('foodAmount', {
    id: 'Food Amount',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('hp', {
    id: 'HP',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('maleProbability', {
    id: 'Male Probability',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('maxFullStomach', {
    id: 'Max Full Stomach',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('meleeAttack', {
    id: 'Melee Attack',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('price', {
    id: 'Price',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('rarity', {
    id: 'Rarity',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('rideSprintSpeed', {
    id: 'Ride Sprint Speed',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('runSpeed', {
    id: 'Run Speed',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('shotAttack', {
    id: 'Shot Attack',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('slowWalkSpeed', {
    id: 'Slow Walk Speed',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('stamina', {
    id: 'Stamina',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('support', {
    id: 'Support',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('transportSpeed', {
    id: 'Transport Speed',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
  columnHelper.accessor('elementType1', {
    id: 'Type 1',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ getValue }) => <ElementImage key={getValue()} element={getValue()} />,
  }),
  columnHelper.accessor('elementType2', {
    id: 'Type 2',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ getValue }) => {
      const type = getValue();
      return type && <ElementImage className="w-fit" key={type} element={type} />;
    },
  }),
  columnHelper.accessor('walkSpeed', {
    id: 'Walk Speed',
    header: ({ column }) => <ColumnHeader column={column} />,
  }),
];

interface PalTableViewProps extends React.HTMLAttributes<HTMLTableElement> {
  table: TableType<Pal>;
}

export function PalTableView({ table, ...rest }: PalTableViewProps) {
  return (
    <Table {...rest}>
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
            <TableCell colSpan={columns.length} className="h-36 text-center">
              No pals found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
