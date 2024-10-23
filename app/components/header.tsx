import Link from 'next/link';
import { ModeToggle } from './theme-toggle';

export function SiteHeader() {
  return (
    <header className="w-full max-w-3xl px-14">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          rel="noreferrer"
          className="font-[375] tracking-tight text-[1.75em] uppercase"
        >
          solaris
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}
