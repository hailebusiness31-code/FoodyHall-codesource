const kpis = [
  { label: "Active vendors", value: "312", delta: "+4.2%", up: true },
  { label: "Forecast accuracy", value: "91.4%", delta: "+1.1%", up: true },
  { label: "CO₂ saved (mo.)", value: "2.6t", delta: "+12%", up: true },
  { label: "Revenue recovered", value: "₫48.2M", delta: "-2%", up: false },
];

export function KpiRow() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {kpis.map((k) => (
        <div key={k.label} className="glass rounded-2xl p-4">
          <div className="text-xl font-semibold tabular-nums">{k.value}</div>
          <div className="text-xs text-muted-foreground">{k.label}</div>
          <div className={`mt-1.5 text-xs ${k.up ? "text-success" : "text-destructive"}`}>
            {k.up ? "▲" : "▼"} {k.delta}
          </div>
        </div>
      ))}
    </div>
  );
}
