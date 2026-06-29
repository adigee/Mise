"use client";

import { useState } from "react";
import { cannedRecommendation } from "@/lib/cannedData";
import type { ItemStatus } from "@/lib/types";
import { clampValue } from "@/lib/adjust";
import { Brief } from "@/components/Brief";
import { SeeWhy } from "@/components/SeeWhy";

// Runtime state for each line item: the chef's decision and any adjusted
// magnitude. The chef is always in command (BRIEF.md Section 0).
export interface ItemState {
  status: ItemStatus;
  value: number | null;
}

type View = "brief" | "why";

export default function Page() {
  const rec = cannedRecommendation;

  const [itemStates, setItemStates] = useState<Record<string, ItemState>>(() =>
    Object.fromEntries(
      rec.items.map((it) => [
        it.id,
        { status: "pending" as ItemStatus, value: it.defaultValue ?? null },
      ]),
    ),
  );
  const [view, setView] = useState<View>("brief");
  const [focusItemId, setFocusItemId] = useState<string | null>(null);

  // Tapping the active state again clears it back to pending.
  const setStatus = (id: string, status: ItemStatus) =>
    setItemStates((s) => ({
      ...s,
      [id]: {
        ...s[id],
        status: s[id].status === status ? "pending" : status,
      },
    }));

  const apply = (id: string) => setStatus(id, "applied");
  const ignore = (id: string) => setStatus(id, "ignored");

  const adjust = (id: string, delta: number) =>
    setItemStates((s) => {
      const item = rec.items.find((it) => it.id === id);
      const current = s[id].value ?? item?.defaultValue ?? 0;
      return {
        ...s,
        [id]: { ...s[id], value: clampValue(item?.unit, current + delta) },
      };
    });

  const openWhy = (itemId: string | null = null) => {
    setFocusItemId(itemId);
    setView("why");
  };
  const backToBrief = () => setView("brief");

  return (
    <main className="min-h-screen">
      {/* One purposeful transition between the two screens (Section 4). */}
      <div
        key={view}
        className="mx-auto w-full max-w-[680px] px-6 py-8 sm:px-10 sm:py-12 motion-safe:animate-[fadein_220ms_ease-out]"
      >
        {view === "brief" ? (
          <Brief
            rec={rec}
            itemStates={itemStates}
            onApply={apply}
            onIgnore={ignore}
            onSeeWhy={openWhy}
          />
        ) : (
          <SeeWhy
            rec={rec}
            itemStates={itemStates}
            focusItemId={focusItemId}
            onApply={apply}
            onIgnore={ignore}
            onAdjust={adjust}
            onBack={backToBrief}
          />
        )}
      </div>
    </main>
  );
}
