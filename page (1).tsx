import { KpiRow } from "@/components/dashboard/kpi-row";
import { AnalyticsBoard } from "@/components/dashboard/analytics-board";
import { DemandPredictionCard } from "@/components/dashboard/demand-prediction-card";
import { SupplyMonitorCard } from "@/components/dashboard/supply-monitor-card";
import { SurplusRescueCard } from "@/components/dashboard/surplus-rescue-card";
import { HeatmapCard } from "@/components/dashboard/heatmap-card";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section id="overview">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Overview
        </h2>
        <KpiRow />
      </section>

      <section id="forecast">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Econometrics analytics board
        </h2>
        <AnalyticsBoard />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          The three pillars
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          <DemandPredictionCard />
          <div id="supply">
            <SupplyMonitorCard />
          </div>
          <div id="rescue">
            <SurplusRescueCard />
          </div>
        </div>
      </section>

      <section id="heat">
        <HeatmapCard />
      </section>
    </div>
  );
}
