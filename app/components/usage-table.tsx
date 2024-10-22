'use client';
import React, { useState } from 'react';
import { UsageReport } from '../api/usage/usage';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatTimestamp } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 10;

export default function UsageTable({
  initialReports,
}: {
  initialReports: UsageReport[] | null;
}) {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const loadMore = () => {
    setDisplayCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  if (initialReports === null) {
    return <div>Loading usage data...</div>;
  }

  if (!Array.isArray(initialReports) || initialReports.length === 0) {
    return <div>No usage data available.</div>;
  }

  return (
    <>
      <Table>
        <TableCaption>A list of recent usage reports</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Message ID</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Report Name</TableHead>
            <TableHead className="text-right w-[100px]">Credits Used</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialReports.slice(0, displayCount).map((report) => (
            <TableRow key={report.message_id}>
              <TableCell className="font-medium">{report.message_id}</TableCell>
              <TableCell>{formatTimestamp(report.timestamp)}</TableCell>
              <TableCell>{report.report_name || ''}</TableCell>
              <TableCell className="text-right">
                {Number(report.credits_used).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total reports</TableCell>
            <TableCell className="text-right">
              {initialReports.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {displayCount < initialReports.length && (
        <div className="mt-4 text-center">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </>
  );
}

export function TableSkeleton() {
  return (
    <TableRow className="w-full">
      <TableCell className="font-medium">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>
      <TableCell className="text-right">
        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse ml-auto"></div>
      </TableCell>
    </TableRow>
  );
}
