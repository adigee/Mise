// A small bar chart for the last few comparable days. Proof, not decoration.
// Hand-rolled divs, no chart library. The last bar can be highlighted in ember
// to mark the day the chef's cut took effect. Bars scale to `barAreaHeight`px
// so the chart reads at a fixed height regardless of the values.
export function TrendBars({
  data,
  highlightLast = false,
  formatValue,
  barAreaHeight = 96,
}: {
  data: { label: string; value: number }[];
  highlightLast?: boolean;
  formatValue: (v: number) => string;
  barAreaHeight?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 0.0001);

  return (
    <div className="flex w-full items-end gap-3">
      {data.map((d, i) => {
        const isLast = highlightLast && i === data.length - 1;
        const heightPx = Math.max((d.value / max) * barAreaHeight, 0);
        return (
          <div
            key={d.label}
            className="flex min-w-0 flex-1 flex-col items-center gap-2"
          >
            <span
              className={
                "tnum text-[11px] " + (isLast ? "text-accent" : "text-fg-muted")
              }
            >
              {formatValue(d.value)}
            </span>
            <div
              className="flex w-full items-end justify-center"
              style={{ height: `${barAreaHeight}px` }}
            >
              <div
                className={"w-full " + (isLast ? "bg-accent" : "bg-fg-muted/35")}
                style={{ height: `${heightPx}px` }}
              />
            </div>
            <span className="text-center text-[10px] leading-tight text-fg-muted">
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
