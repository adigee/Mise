"use client";

import type { Recommendation, LineItem } from "@/lib/types";
import type { ItemState } from "@/app/page";
import { formatAdjustment } from "@/lib/adjust";
import { ActionButtons } from "./ActionButtons";

// Screen 1: The Brief. Calm and glanceable. The hero call owns the top third,
// one compressed why line is the trust anchor, the full confluence lives one
// tap away on screen 2 (BRIEF.md Section 3).
export function Brief({
  rec,
  itemStates,
  onApply,
  onIgnore,
  onSeeWhy,
}: {
  rec: Recommendation;
  itemStates: Record<string, ItemState>;
  onApply: (id: string) => void;
  onIgnore: (id: string) => void;
  onSeeWhy: (itemId?: string | null) => void;
}) {
  const { forward } = rec.confluence;

  return (
    <div className="flex flex-col">
      {/* Header: wordmark + the single forward signal (covers) up top. */}
      <header className="flex items-baseline justify-between">
        <span className="kicker">Mise</span>
        <span className="kicker">Pre-shift brief</span>
      </header>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <div className="font-serif text-[22px] leading-none">
            {rec.weekday}
          </div>
          <div className="mt-1 text-sm text-fg-muted">
            {rec.date} · {rec.service}
          </div>
        </div>
        <div className="text-right">
          <div className="tnum text-4xl leading-none">
            {forward.coversBooked}
          </div>
          <div className="mt-1 text-xs text-fg-muted">
            covers booked · typical{" "}
            <span className="tnum">{forward.coversTypical}</span>
          </div>
        </div>
      </div>

      <Divider />

      {/* Hero zone: the one thing the chef must read. */}
      <section className="py-2">
        <p className="kicker">Today&apos;s call</p>
        <h1 className="mt-3 font-serif text-[42px] leading-[1.05] tracking-tight sm:text-[48px]">
          {rec.hero}
        </h1>
        <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-fg-muted">
          {rec.whyLine}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <ConfidenceDot />
          <span className="text-xs text-fg-muted">{rec.confidenceNote}</span>
          <button
            type="button"
            onClick={() => onSeeWhy(null)}
            className="ml-auto text-sm text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
          >
            See why
          </button>
        </div>
      </section>

      <Divider />

      {/* Prep adjustments: the 2-3 line items. */}
      <section className="py-2">
        <p className="kicker">Prep adjustments</p>
        <div className="mt-3 flex flex-col">
          {rec.items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              state={itemStates[item.id]}
              onApply={() => onApply(item.id)}
              onIgnore={() => onIgnore(item.id)}
              onSeeWhy={() => onSeeWhy(item.id)}
            />
          ))}
        </div>
      </section>

      <Divider />

      {/* The feedback loop: proof the brief has been right before. Quiet. */}
      <section className="py-3">
        <p className="kicker">Last time</p>
        <p className="mt-2 text-sm text-fg-muted">
          Last {rec.yesterday.weekday}, you {rec.yesterday.appliedAction} and
          waste dropped to{" "}
          <span className="tnum text-fg">{rec.yesterday.wasteKg} kg</span> from a
          typical{" "}
          <span className="tnum">{rec.yesterday.typicalWasteKg} kg</span>,{" "}
          {rec.yesterday.shortfalls === 0
            ? "no shortfalls."
            : `${rec.yesterday.shortfalls} shortfall(s).`}
        </p>
      </section>
    </div>
  );
}

function ItemRow({
  item,
  state,
  onApply,
  onIgnore,
  onSeeWhy,
}: {
  item: LineItem;
  state: ItemState;
  onApply: () => void;
  onIgnore: () => void;
  onSeeWhy: () => void;
}) {
  const { magnitude, effect } = formatAdjustment(item, state.value);
  const isHold = item.direction === "hold";
  const dimmed = state.status === "ignored";

  return (
    <div
      className={
        "border-t border-line py-4 transition-opacity " +
        (dimmed ? "opacity-45" : "opacity-100")
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-[15px] font-medium">{item.ingredient}</span>
          <span
            className={
              "tnum text-[15px] " +
              (isHold
                ? "text-hold"
                : item.direction === "increase"
                  ? "text-up"
                  : "text-accent")
            }
          >
            {magnitude}
            {effect ? (
              <span className="text-fg-muted"> · {effect}</span>
            ) : null}
          </span>
        </div>
        {isHold ? (
          <span className="text-xs text-fg-muted">No action needed</span>
        ) : (
          <ActionButtons
            status={state.status}
            onApply={onApply}
            onIgnore={onIgnore}
          />
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[13px] text-fg-muted">{item.why}</span>
        {item.recoveryNote ? (
          <span className="text-[13px] text-fg-muted">
            · {item.recoveryNote}
          </span>
        ) : null}
        <button
          type="button"
          onClick={onSeeWhy}
          className="text-[13px] text-fg-muted underline decoration-line underline-offset-4 hover:text-fg hover:decoration-accent"
        >
          See why
        </button>
      </div>
    </div>
  );
}

function Divider() {
  return <hr className="my-6 border-0 border-t border-line" />;
}

function ConfidenceDot() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
    </span>
  );
}
