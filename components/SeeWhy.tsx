"use client";

import type { Recommendation, LineItem } from "@/lib/types";
import type { ItemState } from "@/app/page";
import { formatAdjustment } from "@/lib/adjust";
import { ActionButtons } from "./ActionButtons";
import { TrendBars } from "./TrendBars";

// Screen 2: See why. The full confluence and reasoning, reached on tap. The
// three input groups sit visually above the call they produce (BRIEF.md
// Sections 2 to 4). Numbers in mono.
export function SeeWhy({
  rec,
  itemStates,
  focusItemId,
  onApply,
  onIgnore,
  onAdjust,
  onBack,
}: {
  rec: Recommendation;
  itemStates: Record<string, ItemState>;
  focusItemId: string | null;
  onApply: (id: string) => void;
  onIgnore: (id: string) => void;
  onAdjust: (id: string, delta: number) => void;
  onBack: () => void;
}) {
  const { forward, historical, waste } = rec.confluence;

  return (
    <div className="flex flex-col">
      <header className="flex items-baseline justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-fg-muted hover:text-fg"
        >
          ← Back to brief
        </button>
        <span className="kicker">See why</span>
      </header>

      <h2 className="mt-6 font-serif text-[28px] leading-tight">
        {rec.hero}
      </h2>

      {/* The three labeled input groups, feeding the call top to bottom. */}
      <section className="mt-8 flex flex-col gap-px">
        <InputGroup label="Forward signal" caption="What today looks like">
          <div className="flex flex-wrap items-end gap-x-10 gap-y-3">
            <Figure
              value={`${forward.coversBooked}`}
              unit={`booked · typical ${forward.coversTypical}`}
              note="covers today"
            />
            <Figure
              value={`${Math.round(
                (1 - forward.coversBooked / forward.coversTypical) * 100,
              )}%`}
              unit="below a normal Tuesday"
              note="forward gap"
            />
            <Figure value={forward.context} note="conditions" plain />
          </div>
        </InputGroup>

        <InputGroup
          label="Historical pattern"
          caption="What this kind of day usually does"
        >
          <p className="mb-4 text-sm text-fg-muted">{historical.summary}</p>
          <TrendBars
            data={historical.trend.map((t) => ({
              label: t.label,
              value: t.covers,
            }))}
            highlightLast
            formatValue={(v) => `${v}`}
          />
        </InputGroup>

        <InputGroup
          label="Waste history"
          caption="What we over-prepped and binned"
        >
          <p className="mb-4 text-sm text-fg-muted">{waste.summary}</p>
          <TrendBars
            data={waste.trend.map((t) => ({
              label: t.label,
              value: t.wasteKg,
            }))}
            highlightLast
            formatValue={(v) => `${v}kg`}
          />
        </InputGroup>
      </section>

      {/* The call this confluence produces. */}
      <div className="mt-8 border-t-2 border-accent pt-6">
        <p className="kicker">The call</p>
        <p className="mt-3 text-[15px] leading-relaxed">{rec.reasoning}</p>
      </div>

      {/* The actions, repeated, with Adjust to override the magnitude. */}
      <section className="mt-8">
        <p className="kicker">Prep adjustments</p>
        <div className="mt-3 flex flex-col">
          {rec.items.map((item) => (
            <AdjustableRow
              key={item.id}
              item={item}
              state={itemStates[item.id]}
              focused={item.id === focusItemId}
              onApply={() => onApply(item.id)}
              onIgnore={() => onIgnore(item.id)}
              onAdjust={(delta) => onAdjust(item.id, delta)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function AdjustableRow({
  item,
  state,
  focused,
  onApply,
  onIgnore,
  onAdjust,
}: {
  item: LineItem;
  state: ItemState;
  focused: boolean;
  onApply: () => void;
  onIgnore: () => void;
  onAdjust: (delta: number) => void;
}) {
  const { magnitude, effect } = formatAdjustment(item, state.value);
  const isHold = item.direction === "hold";
  const step = item.unit === "%" ? 5 : 2;
  const adjusted =
    item.defaultValue != null && state.value !== item.defaultValue;

  return (
    <div
      className={
        "border-t border-line py-4 " +
        (focused ? "-mx-4 bg-raised px-4" : "")
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
            {effect ? <span className="text-fg-muted"> · {effect}</span> : null}
          </span>
          {adjusted ? (
            <span className="text-xs text-fg-muted">(adjusted)</span>
          ) : null}
        </div>
        {!isHold ? (
          <ActionButtons
            status={state.status}
            onApply={onApply}
            onIgnore={onIgnore}
          />
        ) : (
          <span className="text-xs text-fg-muted">No action needed</span>
        )}
      </div>

      <p className="mt-2 text-[13px] text-fg-muted">
        {item.why}
        {item.recoveryNote ? ` · ${item.recoveryNote}` : ""}
      </p>

      {/* Adjust stepper: the chef overrides the magnitude. Holds have none. */}
      {!isHold && item.defaultValue != null ? (
        <div className="mt-3 flex items-center gap-3">
          <span className="kicker">Adjust</span>
          <div className="flex items-center border border-line">
            <Stepper label="−" onClick={() => onAdjust(-step)} />
            <span className="tnum min-w-14 px-3 text-center text-sm">
              {state.value}
              {item.unit === "%" ? "%" : ""}
            </span>
            <Stepper label="+" onClick={() => onAdjust(step)} />
          </div>
          {item.unit !== "%" ? (
            <span className="text-xs text-fg-muted">{item.unit}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Stepper({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-9 w-9 text-lg text-fg-muted transition-colors hover:bg-accent hover:text-base"
      aria-label={label === "+" ? "Increase" : "Decrease"}
    >
      {label}
    </button>
  );
}

function InputGroup({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line py-6">
      <div className="flex items-baseline justify-between">
        <p className="kicker">{label}</p>
        <p className="text-xs text-fg-muted">{caption}</p>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Figure({
  value,
  unit,
  note,
  plain = false,
}: {
  value: string;
  unit?: string;
  note: string;
  plain?: boolean;
}) {
  return (
    <div>
      <div
        className={
          (plain ? "font-serif text-xl" : "tnum text-2xl") + " leading-none"
        }
      >
        {value}
        {unit ? (
          <span className="ml-2 text-xs font-normal text-fg-muted">{unit}</span>
        ) : null}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-fg-muted">
        {note}
      </div>
    </div>
  );
}
