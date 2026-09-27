"use client";

import { Slider } from "@/components/slider";
import { useFoodyStore } from "@/lib/store";

const dishes = [
  { name: "Bánh Mì Thịt Nướng", base: 45000 },
  { name: "Cơm Tấm Sườn", base: 60000 },
];

function formatTime(t: number) {
  const h = Math.floor(t);
  const m = Math.round((t - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function SurplusRescueCard() {
  const rescueTime = useFoodyStore((s) => s.rescueTime);
  const setRescueTime = useFoodyStore((s) => s.setRescueTime);

  const discount = Math.min(70, ((rescueTime - 18) / 4) * 70);
  const remaining = 22 - rescueTime;
  const rh = Math.floor(remaining);
  const rm = Math.round((remaining - rh) * 60);
  const hot = remaining < 1;

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5">
      <div className="gradient-bg absolute inset-x-0 top-0 h-0.5" />
      <h4 className="text-sm font-semibold">Surplus rescue</h4>
      <p className="mb-4 text-xs text-muted-foreground">
        Prices ease down automatically toward closing.
      </p>

      <div className="mb-4 space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Time of day</span>
          <span>{formatTime(rescueTime)}</span>
        </div>
        <Slider
          value={[rescueTime]}
          min={18}
          max={22}
          step={0.25}
          onValueChange={([v]) => setRescueTime(v)}
        />
      </div>

      <div className="divide-y divide-border">
        {dishes.map((d) => {
          const now = Math.round((d.base * (1 - discount / 100)) / 1000) * 1000;
          return (
            <div key={d.name} className="flex items-center justify-between py-2 text-sm">
              <span>{d.name}</span>
              <span>
                {discount > 0.5 && (
                  <span className="mr-2 text-xs text-muted-foreground line-through">
                    {d.base.toLocaleString()}₫
                  </span>
                )}
                <span className="font-semibold text-success">{now.toLocaleString()}₫</span>
              </span>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
          hot ? "border-destructive text-destructive" : "border-border text-muted-foreground"
        }`}
      >
        Kitchen closes in {rh}h {rm}m — {Math.round(discount)}% off now
      </div>
    </div>
  );
}
