"use client";

import { useFoodyStore } from "@/lib/store";
import { ThemeToggle } from "@/components/theme-toggle";

export function Topbar() {
  const setCommandOpen = useFoodyStore((s) => s.setCommandOpen);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-5 backdrop-blur-xl">
      <div className="flex shrink-0 items-center gap-2 font-semibold">
        <span className="gradient-bg h-4 w-4 rounded" />
        FoodyHall
      </div>
      <button
        onClick={() => setCommandOpen(true)}
        className="flex max-w-sm flex-1 items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
      >
        <span>Search or run a command…</span>
        <kbd className="rounded border border-border px-1.5 py-0.5 text-xs">⌘K</kbd>
      </button>
      <div className="ml-auto flex items-center gap-2.5">
        <ThemeToggle />
        <div className="gradient-bg h-8 w-8 rounded-full" />
      </div>
    </header>
  );
}
