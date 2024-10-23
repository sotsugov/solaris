import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function TableSkeleton() {
  return (
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
        {[...Array(5)].map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16 ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
