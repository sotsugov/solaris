import 'server-only';
import { notFound } from 'next/navigation';
import { UsageReport } from './usage';

export async function getUsageReports(): Promise<UsageReport[]> {
  const res = await fetch(`${process.env.API_URL}/api/usage`);

  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong!');
  }

  const data = await res.json();
  const usageReports = data.usage as UsageReport[];

  if (!Array.isArray(usageReports) || usageReports.length === 0) {
    // Render the closest `not-found.js` Error Boundary
    notFound();
  }

  return usageReports;
}
