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
import { formatTimestamp } from '@/lib/utils';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UsageReport {
  message_id: number;
  timestamp: string;
  report_name?: string;
  credits_used: number;
}

export function UsageTable({ reports }: { reports: UsageReport[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize sorting state from URL parameters
  const initializeSortingState = (): SortingState => {
    const sortParams = searchParams.getAll('sort');
    return sortParams.map((param) => {
      const [id, direction] = param.split(':');
      return {
        id,
        desc: direction === 'desc',
      };
    });
  };

  const [sorting, setSorting] = React.useState<SortingState>(
    initializeSortingState(),
  );

  // Update URL when sorting changes
  const updateURL = (newSorting: SortingState) => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove all existing sort parameters
    const existingParams = Array.from(params.keys());
    existingParams.forEach((key) => {
      if (key === 'sort') params.delete(key);
    });

    // Add new sort parameters
    newSorting.forEach((sort) => {
      params.append('sort', `${sort.id}:${sort.desc ? 'desc' : 'asc'}`);
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSort = (columnId: string, currentSortDir: string | false) => {
    let newSorting: SortingState;

    if (!currentSortDir) {
      newSorting = [...sorting, { id: columnId, desc: false }];
    } else if (currentSortDir === 'asc') {
      newSorting = sorting.map((sort) =>
        sort.id === columnId ? { ...sort, desc: true } : sort,
      );
    } else {
      newSorting = sorting.filter((sort) => sort.id !== columnId);
    }

    setSorting(newSorting);
    updateURL(newSorting);
  };
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
            onClick={() => handleSort('report_name', column.getIsSorted())}
          >
            Report Name
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('report_name') || ''}</div>,
    },
    {
      accessorKey: 'credits_used',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSort('credits_used', column.getIsSorted())}
          >
            Credits Used
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
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
    // Enable multi-sort for sorting both columns
    enableMultiSort: true,
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
