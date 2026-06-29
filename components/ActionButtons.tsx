"use client";

import type { ItemStatus } from "@/lib/types";

// One-tap Apply / Ignore. The chef is always in command: tapping the active
// state again clears it back to pending. Ember marks the committed Apply.
export function ActionButtons({
  status,
  onApply,
  onIgnore,
}: {
  status: ItemStatus;
  onApply: () => void;
  onIgnore: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onApply}
        aria-pressed={status === "applied"}
        className={
          "px-3 py-1.5 text-sm font-medium transition-colors border " +
          (status === "applied"
            ? "border-accent bg-accent text-base"
            : "border-line text-fg hover:border-fg-muted")
        }
      >
        {status === "applied" ? "Applied" : "Apply"}
      </button>
      <button
        type="button"
        onClick={onIgnore}
        aria-pressed={status === "ignored"}
        className={
          "px-3 py-1.5 text-sm font-medium transition-colors border " +
          (status === "ignored"
            ? "border-fg-muted text-fg-muted"
            : "border-transparent text-fg-muted hover:text-fg")
        }
      >
        {status === "ignored" ? "Ignored" : "Ignore"}
      </button>
    </div>
  );
}
