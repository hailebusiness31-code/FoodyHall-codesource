"use client";

import { useState } from "react";
import { LineChart, BarChart } from "@tremor/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { forecastRanges, roiData } from "@/lib/mock-data";

type RangeKey = keyof typeof forecastRanges;

export function AnalyticsBoard() {
  const [range, setRange] = useState<RangeKey>("7D");

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Demand forecast</h3>
            <p className="text-xs text-muted-foreground">
              Historical vs predicted order volume
            </p>
          </div>
          <Tabs value={range} onValueChange={(v) => setRange(v as RangeKey)}>
            <TabsList>
              <TabsTrigger value="7D">7D</TabsTrigger>
              <TabsTrigger value="30D">30D</TabsTrigger>
              <TabsTrigger value="90D">90D</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <LineChart
          className="h-56"
          data={[...forecastRanges[range]]}
          index="label"
          categories={["Historical", "Predicted"]}
          colors={["blue", "violet"]}
          showLegend
          yAxisWidth={32}
        />
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold">ROI &amp; CO₂ emissions reduced</h3>
        <p className="mb-4 text-xs text-muted-foreground">
          Monthly impact across the network
        </p>
        <BarChart
          className="h-56"
          data={roiData}
          index="month"
          categories={["ROI", "CO2 Reduced"]}
          colors={["blue", "emerald"]}
          showLegend
          yAxisWidth={32}
        />
      </div>
    </div>
  );
}
