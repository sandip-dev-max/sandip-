import { LiveClock } from "@/components/portfolio/LiveClock";

export function PortfolioFooter() {
  return (
    <footer className="flex shrink-0 items-center justify-between border-t border-brutal-border px-5 py-4 font-mono text-[10px] uppercase tracking-widest text-brutal-fg/55 sm:px-8 sm:py-5 lg:px-10">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <span>Design &amp; code by Yudeat</span>
        <button
          type="button"
          className="flex items-center gap-2 transition-colors hover:text-brutal-fg"
        >
          Shoot
          <span className="h-1.5 w-1.5 rounded-full bg-brutal-fg" aria-hidden />
        </button>
      </div>
      <span className="text-brutal-fg/45">
        <LiveClock />
      </span>
    </footer>
  );
}
