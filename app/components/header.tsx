import { ModeToggle } from './theme-toggle';

export function SiteHeader() {
  return (
    <header className="w-full max-w-3xl px-16">
      <div className="flex items-center justify-between">
        <a
          href="/"
          rel="noreferrer"
          className="font-medium text-lg uppercase underline underline-offset-4"
        >
          solaris
        </a>
        <ModeToggle />
      </div>
    </header>
  );
}
