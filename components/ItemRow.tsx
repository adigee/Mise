"use client";

import type { LineItem } from "@/lib/types";
import type { ItemState } from "@/app/page";
import { formatAdjustment } from "@/lib/adjust";
import { ActionButtons } from "./ActionButtons";

// One menu line in the brief. A "cut" shows its ember magnitude and Apply /
// Ignore; a "hold" shows "· Hold" and "No action needed". Both expose the
// evidence line and a "See why" that opens the adaptive detail overlay.
export function ItemRow({
  item,
  state,
  onApply,
  onIgnore,
  onSelect,
}: {
  item: LineItem;
  state: ItemState;
  onApply: () => void;
  onIgnore: () => void;
  onSelect: () => void;
}) {
  const isHold = item.direction === "hold";
  const { magnitude, effect } = formatAdjustment(item, state.value);
  const dimmed = state.status === "ignored";

  return (
    <div
      className={
        "border-t border-line py-4 transition-opacity " +
        (dimmed ? "opacity-45" : "opacity-100")
      }
    >
      <div className="flex items-baseline justify-between gap-x-4">
        <div className="flex min-w-0 items-baseline gap-3 text-[15px]">
          <span className="max-w-[420px] truncate font-medium text-fg">
            {item.ingredient}
          </span>
          {isHold ? (
            <span className="tnum shrink-0 text-fg-muted">· Hold</span>
          ) : (
            <span className="tnum shrink-0">
              <span className="text-accent">{magnitude}</span>
              {effect ? (
                <span className="text-fg-muted"> · {effect}</span>
              ) : null}
            </span>
          )}
        </div>
        {isHold ? (
          <span className="shrink-0 text-xs text-fg-muted">No action needed</span>
        ) : (
          <ActionButtons
            status={state.status}
            onApply={onApply}
            onIgnore={onIgnore}
          />
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-[13px] text-fg-muted">
        <span>{item.why}</span>
        <button
          type="button"
          onClick={onSelect}
          className="underline decoration-line underline-offset-4 hover:text-fg hover:decoration-accent"
        >
          See why
        </button>
      </div>
    </div>
  );
}
