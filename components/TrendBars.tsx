// A small bar chart for the last few comparable days. Proof, not decoration
// (BRIEF.md Section 3). Hand-rolled divs, no chart library. The last bar can be
// highlighted in ember to mark "today" or a result worth pointing at.
export function TrendBars({
  data,
  highlightLast = false,
  formatValue,
}: {
  data: { label: string; value: number }[];
  highlightLast?: boolean;
  formatValue: (v: number) => string;
}) {
  const max = Math.max(...data.map((d) => d.value), 0.0001);

  return (
    <div className="flex items-end gap-3 h-24">
      {data.map((d, i) => {
        const isLast = highlightLast && i === data.length - 1;
        const heightPct = Math.max((d.value / max) * 100, 4);
        return (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <span
              className={
                "tnum text-[11px] " + (isLast ? "text-accent" : "text-fg-muted")
              }
            >
              {formatValue(d.value)}
            </span>
            <div className="flex w-full items-end justify-center h-full">
              <div
                className={"w-full " + (isLast ? "bg-accent" : "bg-fg-muted/35")}
                style={{ height: `${heightPct}%` }}
              />
            </div>
            <span className="text-[10px] text-fg-muted text-center leading-tight">
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
