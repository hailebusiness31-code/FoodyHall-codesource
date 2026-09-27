"use client";

import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { useFoodyStore } from "@/lib/store";

export function SupplyMonitorCard() {
  const supplyLevel = useFoodyStore((s) => s.supplyLevel);
  const nudgeSupply = useFoodyStore((s) => s.nudgeSupply);

  useEffect(() => {
    const id = setInterval(nudgeSupply, 4000);
    return () => clearInterval(id);
  }, [nudgeSupply]);

  const status = supplyLevel < 20 ? "critical" : supplyLevel < 50 ? "watch" : "healthy";
  const colorClass = {
    critical: "bg-destructive animate-pulseGlow",
    watch: "bg-warning",
    healthy: "bg-success",
  }[status];
  const label = {
    critical: "Critical — restock now",
    watch: "Watch — running low",
    healthy: `Healthy — ${supplyLevel}% in stock`,
  }[status];

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5">
      <div className="gradient-bg absolute inset-x-0 top-0 h-0.5" />
      <h4 className="text-sm font-semibold">Dynamic supply monitor</h4>
      <p className="mb-4 text-xs text-muted-foreground">
        Live stock-to-orders ratio, updating on its own.
      </p>
      <Progress value={supplyLevel} indicatorClassName={colorClass} className="mb-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums">{supplyLevel}%</span>
      </div>
    </div>
  );
}
