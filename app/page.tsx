import { Suspense } from 'react';
import { SiteHeader } from './components/header';
import { UsageTable } from './components/usage-table';
import { TableSkeleton } from './components/usage-table-skeleton';
import { UsageReport } from '../types/usage';

async function getUsageReports(): Promise<UsageReport[] | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/usage`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      // Return null here, but probably would better to render
      // the closest `error.js` Error Boundary
      // throw new Error('Something went wrong!');
      return null;
    }

    const data = await res.json();

    return data.usage as UsageReport[];
  } catch (error) {
    // Again for now just return, otherwise
    //   // Render the closest `not-found.js` Error Boundary
    //   notFound();
    console.error('Failed to fetch usage reports:', error);
    return null;
  }
}

export default async function IndexPage() {
  const data = await getUsageReports();

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 py-12 gap-8 sm:p-20 font-[family-name:var(--font-sans)]">
      <SiteHeader />
      <main className="flex flex-col gap-8 items-center max-w-3xl">
        <div className="flex flex-col">
          <div className="font-bold mb-4">Usage Data</div>
          <Suspense fallback={<TableSkeleton />}>
            {data ? (
              <UsageTable reports={data} />
            ) : (
              <div>No data is returned</div>
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
