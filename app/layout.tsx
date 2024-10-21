import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import './globals.css';

const fontSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Solaris',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
