'use client';

import * as React from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
  TableCaption,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { formatTimestamp } from '@/lib/utils';

interface UsageReport {
  message_id: number;
  timestamp: string;
  report_name?: string;
  credits_used: number;
}

export function UsageTable({ reports }: { reports: UsageReport[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<UsageReport>[] = [
    {
      accessorKey: 'message_id',
      header: 'Message ID',
      cell: ({ row }) => <div>{row.getValue('message_id')}</div>,
    },
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
      cell: ({ row }) => (
        <div>{formatTimestamp(row.getValue('timestamp'))}</div>
      ),
    },
    {
      accessorKey: 'report_name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-transparent"
          >
            Report Name
            {column.getIsSorted() === 'asc' ? (
              <ChevronUpIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('report_name') || '-'}</div>,
    },
    {
      accessorKey: 'credits_used',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="hover:bg-transparent"
          >
            Credits Used
            {column.getIsSorted() === 'asc' ? (
              <ChevronUpIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-right">
          {Number(row.getValue('credits_used')).toFixed(2)}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: reports,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full">
      <Table>
        <TableCaption>A list of recent usage reports</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total reports</TableCell>
            <TableCell className="text-right">{reports.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
