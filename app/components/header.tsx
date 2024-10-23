import Link from 'next/link';
import { ModeToggle } from './theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SiteHeader() {
  return (
    <header className="w-full max-w-3xl px-4 py-3">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          rel="noreferrer"
          className="font-[375] tracking-tight text-[1.75em] uppercase"
        >
          solaris
        </Link>
        <div className="flex flex-row items-center gap-x-6">
          <Avatar className="size-8">
            <AvatarImage
              src="https://github.com/sotsugov.png"
              alt="@sotsugov"
            />
            <AvatarFallback>IS</AvatarFallback>
          </Avatar>
          <ModeToggle />
        </div>
      </div>
      <div className="text-muted-foreground capitalize">
        API credit usage dashboard
      </div>
    </header>
  );
}
