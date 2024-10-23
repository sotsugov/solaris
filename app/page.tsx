import { SiteHeader } from './components/header';
import { UsageTable } from './components/usage-table';
import CreditBarChart from './components/usage-chart';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import getUsageReports from './api/getUsageReports';
import { TableSkeleton } from './components/table-skeleton';

async function ChartSection() {
  const reports = await getUsageReports();
  if (!reports) return <div>No data for a chart display</div>;
  return <CreditBarChart reports={reports} />;
}

async function TableSection() {
  const reports = await getUsageReports();
  if (!reports) return <div>No data for reports</div>;
  return <UsageTable reports={reports} />;
}

export default async function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 py-12 gap-8 sm:p-20 font-[family-name:var(--font-sans)]">
      <SiteHeader />
      <main className="flex flex-col gap-8 items-center max-w-3xl">
        <div className="flex flex-col">
          <div className="w-full min-w-full space-y-8">
            <Suspense
              fallback={
                <Skeleton className="h-[300px] w-full min-w-full rounded-xl p-6 pt-0" />
              }
            >
              <ChartSection />
            </Suspense>
            <Suspense fallback={<TableSkeleton />}>
              <TableSection />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
