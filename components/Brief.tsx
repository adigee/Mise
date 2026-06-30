"use client";

import type { Recommendation } from "@/lib/types";
import type { ItemState } from "@/app/page";
import { ConfidenceDots } from "./ConfidenceDots";
import { StatCards } from "./StatCards";
import { ItemRow } from "./ItemRow";

// The brief: the glanceable pre-shift screen. The hero call owns the top, the
// two waste cards make yesterday concrete, the cuts to act on sit above the
// quiet "Hold steady" list. Each row opens the adaptive detail overlay.
export function Brief({
  rec,
  itemStates,
  onApply,
  onIgnore,
  onSelect,
}: {
  rec: Recommendation;
  itemStates: Record<string, ItemState>;
  onApply: (id: string) => void;
  onIgnore: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  const cuts = rec.items.filter((it) => it.direction === "cut");
  const holds = rec.items.filter((it) => it.direction === "hold");

  return (
    <main className="min-w-0 flex-1 px-10 py-12">
      {/* Header: the day, and the covers forecast up top right. */}
      <header className="flex items-end justify-between gap-4">
        <div>
          <div className="font-serif text-[22px] leading-none">
            {rec.weekday}
          </div>
          <div className="pt-1 text-sm text-fg-muted">
            {rec.date} · {rec.service}
          </div>
        </div>
        <div className="flex flex-col items-end text-right">
          <div className="tnum text-4xl leading-none">{rec.covers.total}</div>
          <div className="pt-1 text-xs text-fg-muted">{rec.covers.detail}</div>
        </div>
      </header>

      <Divider />

      {/* Hero zone: the one thing the chef must read. */}
      <section className="py-2">
        <p className="kicker">Today&apos;s call</p>
        <h1 className="mt-3 max-w-[600px] font-serif text-[48px] leading-[1.05] tracking-tight">
          {rec.hero}
        </h1>
        <p className="mt-4 max-w-[540px] text-[15px] leading-relaxed text-fg-muted">
          {rec.subline}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <ConfidenceDots />
          <span className="text-xs text-fg-muted">{rec.confidenceNote}</span>
        </div>
      </section>

      <StatCards cards={rec.statCards} />

      {/* Adjustments: the cuts to act on. */}
      <section className="py-2">
        <p className="kicker">Adjustments</p>
        <div className="mt-3 flex flex-col">
          {cuts.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              state={itemStates[item.id]}
              onApply={() => onApply(item.id)}
              onIgnore={() => onIgnore(item.id)}
              onSelect={() => onSelect(item.id)}
            />
          ))}
        </div>
      </section>

      <Divider />

      {/* Hold steady: the quiet majority, one tap from their why. */}
      <section className="py-2">
        <p className="kicker">Hold steady</p>
        <div className="mt-3 flex flex-col">
          {holds.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              state={itemStates[item.id]}
              onApply={() => onApply(item.id)}
              onIgnore={() => onIgnore(item.id)}
              onSelect={() => onSelect(item.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function Divider() {
  return <hr className="my-6 border-0 border-t border-line" />;
}
