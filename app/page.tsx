import { getUsageReports } from './api/usage/getUsage';
import { Suspense } from 'react';
import UsageTable, { TableSkeleton } from './components/usage-table';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const reports = await getUsageReports();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center max-w-2xl">
        <div className="text-4xl font-medium uppercase">solaris</div>
        <div className="container p-4">
          <h1 className="font-bold mb-4">Usage Data</h1>
          <Suspense fallback={<TableSkeleton />}>
            <UsageTable initialReports={reports} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
