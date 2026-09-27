"use client";

import { useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { useFoodyStore } from "@/lib/store";

const baseline = [40, 46, 42, 50, 55, 48, 60];

export function DemandPredictionCard() {
  const weather = useFoodyStore((s) => s.weather);
  const eventImpact = useFoodyStore((s) => s.eventImpact);
  const setWeather = useFoodyStore((s) => s.setWeather);
  const setEventImpact = useFoodyStore((s) => s.setEventImpact);

  const points = useMemo(() => {
    return baseline
      .map((v, i) => {
        const adjusted = v * (1 + (weather / 100) * 0.4 + (eventImpact / 100) * 0.6);
        const x = (i * 260) / (baseline.length - 1);
        const y = 80 - Math.min(74, adjusted * 0.9);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [weather, eventImpact]);

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5">
      <div className="gradient-bg absolute inset-x-0 top-0 h-0.5" />
      <h4 className="text-sm font-semibold">Demand prediction</h4>
      <p className="mb-4 text-xs text-muted-foreground">
        Adjust conditions to see tomorrow&apos;s forecast shift.
      </p>

      <div className="mb-4 space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Weather severity</span>
          <span>{weather}%</span>
        </div>
        <Slider value={[weather]} max={100} step={1} onValueChange={([v]) => setWeather(v)} />
      </div>

      <div className="mb-2 space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Local event impact</span>
          <span>{eventImpact}%</span>
        </div>
        <Slider
          value={[eventImpact]}
          max={100}
          step={1}
          onValueChange={([v]) => setEventImpact(v)}
        />
      </div>

      <svg viewBox="0 0 260 80" className="mt-3 h-20 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="demandGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--secondary))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke="url(#demandGradient)" strokeWidth="2.5" points={points} />
      </svg>
    </div>
  );
}
