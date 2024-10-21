import { getUsageReports } from '@/app/api/usage/getUsage';
import UsageTable, { TableSkeleton } from '@/app/components/usage-table';
import { Suspense } from 'react';

export default async function UsageTableWrapper() {
  const reports = await getUsageReports();
  return (
    <div className="container p-4">
      <h1 className="font-bold mb-4">Usage Data</h1>
      <Suspense fallback={<TableSkeleton />}>
        <UsageTable initialReports={reports} />
      </Suspense>
    </div>
  );
}
