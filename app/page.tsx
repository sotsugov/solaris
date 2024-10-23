import { SiteHeader } from './components/header';
import { UsageTable } from './components/usage-table';
import CreditBarChart from './components/usage-chart';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import getUsageReports from './api/getUsageReports';
import { TableSkeleton } from './components/table-skeleton';

async function ChartSection() {
  const reports = await getUsageReports();
  if (!reports)
    return <div className="w-full">No data for a chart display</div>;
  return <CreditBarChart reports={reports} />;
}

async function TableSection() {
  const reports = await getUsageReports();
  if (!reports) return <div className="w-full">No data for reports</div>;
  return <UsageTable reports={reports} />;
}

export default async function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen py-12 gap-8 font-[family-name:var(--font-sans)]">
      <SiteHeader />
      <main className="w-full max-w-3xl px-4">
        <div className="w-full flex flex-col gap-8">
          <Suspense
            fallback={<Skeleton className="h-[370px] w-full rounded-xl" />}
          >
            <ChartSection />
          </Suspense>
          <Suspense fallback={<TableSkeleton />}>
            <TableSection />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
