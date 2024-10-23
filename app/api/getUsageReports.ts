'use server';
import { UsageReport } from '@/types/usage';

export default async function getUsageReports(): Promise<UsageReport[] | null> {
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
