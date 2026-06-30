"use client";

import { useEffect } from "react";
import type { LineItem } from "@/lib/types";
import type { ItemState } from "@/app/page";
import { formatAdjustment } from "@/lib/adjust";
import { ConfidenceDots } from "./ConfidenceDots";
import { TrendBars } from "./TrendBars";
import { ActionButtons } from "./ActionButtons";

// The adaptive detail overlay. It slides in over the brief and rebuilds itself
// around the selected ingredient: its recommended call, its waste history, and
// (for cuts) the Adjust stepper + Apply / Ignore. Holds are informational only.
export function DetailPanel({
  item,
  state,
  onApply,
  onIgnore,
  onAdjust,
  onClose,
}: {
  item: LineItem;
  state: ItemState;
  onApply: () => void;
  onIgnore: () => void;
  onAdjust: (delta: number) => void;
  onClose: () => void;
}) {
  const isCut = item.direction === "cut";
  const { magnitude } = formatAdjustment(item, state.value);

  // Esc closes the overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div
        className="absolute inset-0 z-10 bg-black/50 motion-safe:animate-[scrimin_180ms_ease-out]"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 z-20 flex h-full w-[680px] max-w-full flex-col overflow-auto border-l border-line bg-base px-10 py-12 motion-safe:animate-[panelin_220ms_ease-out]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-6 top-6 text-xl leading-none text-fg-muted transition-colors hover:text-fg"
        >
          ✕
        </button>

        {/* Header: the ingredient and the call it produces. */}
        <div className="py-2">
          <p className="kicker">{item.ingredient}</p>
          <h2 className="mt-3 max-w-[600px] font-serif text-[48px] leading-[1.05] tracking-tight">
            {magnitude}
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <ConfidenceDots />
            <span className="text-xs text-fg-muted">{item.confidenceNote}</span>
          </div>
        </div>

        {/* Waste history: the evidence behind the call. */}
        <div className="mt-6 border-t border-line pb-4 pt-6">
          <div className="flex items-baseline justify-between">
            <span className="text-[15px] font-medium text-fg">
              {item.detailLabel}
            </span>
            <span className="kicker">Waste history</span>
          </div>
          <p className="mb-4 mt-4 max-w-[600px] text-sm leading-[1.43] text-fg-muted">
            {item.detailParagraph}
          </p>
          <TrendBars
            data={item.wasteTrend}
            highlightLast
            formatValue={(v) => `${v}`}
            barAreaHeight={130}
          />
        </div>

        {/* Footer: cuts get Adjust + actions; holds just close. */}
        {isCut ? (
          <div className="flex items-end gap-2.5 pb-10 pt-3">
            <div className="flex flex-1 items-center gap-3">
              <span className="kicker">Adjust</span>
              <div className="flex items-center border border-line">
                <Stepper label="−" onClick={() => onAdjust(-1)} />
                <span className="tnum min-w-[56px] px-3 text-center text-sm">
                  {state.value}
                </span>
                <Stepper label="+" onClick={() => onAdjust(1)} />
              </div>
            </div>
            <ActionButtons
              status={state.status}
              onApply={onApply}
              onIgnore={onIgnore}
            />
          </div>
        ) : (
          <div className="pb-10 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-fg-muted underline decoration-line underline-offset-4 hover:text-fg hover:decoration-accent"
            >
              Close
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function Stepper({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center text-lg text-fg-muted transition-colors hover:bg-accent hover:text-base"
      aria-label={label === "+" ? "Increase" : "Decrease"}
    >
      {label}
    </button>
  );
}
