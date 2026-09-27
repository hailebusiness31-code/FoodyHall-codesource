import { restaurants } from "@/lib/mock-data";

export function HeatmapCard() {
  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-sm font-semibold">Live surplus &amp; shortage map — Da Nang</h3>
      <p className="mb-4 text-xs text-muted-foreground">
        Restaurant-level stock signals across the city.
      </p>
      <div className="relative h-56 overflow-hidden rounded-xl bg-muted/40">
        {restaurants.map((r) => (
          <div key={r.name} className="group absolute" style={{ left: `${r.x}%`, top: `${r.y}%` }}>
            <span
              className={`block animate-pulseGlow rounded-full ${
                r.type === "surplus"
                  ? "bg-destructive shadow-[0_0_16px_4px_rgba(248,113,113,0.5)]"
                  : "bg-success shadow-[0_0_14px_3px_rgba(52,211,153,0.5)]"
              }`}
              style={{ width: 10 + r.pct / 6, height: 10 + r.pct / 6 }}
            />
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {r.name} — {r.pct}% {r.type}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-destructive" /> High surplus (waste risk)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-success" /> Shortage (needs restock)
        </span>
      </div>
    </div>
  );
}
