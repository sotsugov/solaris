import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function TableSkeleton() {
  const columns = [
    { key: 'message_id', className: 'w-[25%]' },
    { key: 'timestamp', className: 'w-[25%]' },
    { key: 'report_name', className: 'w-[25%]' },
    { key: 'credits_used', className: 'w-[25%] text-right' },
  ];

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Message ID</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Report Name</TableHead>
            <TableHead className="text-right">Credits Used</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className={column.className}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
