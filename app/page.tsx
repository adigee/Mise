"use client";

import { useState } from "react";
import { cannedRecommendation } from "@/lib/cannedData";
import type { ItemStatus } from "@/lib/types";
import { clampValue } from "@/lib/adjust";
import { DeviceFrame } from "@/components/DeviceFrame";
import { SideNav } from "@/components/SideNav";
import { Brief } from "@/components/Brief";
import { DetailPanel } from "@/components/DetailPanel";

// Runtime state for each line item: the chef's decision and any adjusted
// magnitude. The chef is always in command.
export interface ItemState {
  status: ItemStatus;
  value: number | null;
}

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
  // The ingredient whose detail overlay is open, or null for the brief.
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
        [id]: { ...s[id], value: clampValue(current + delta) },
      };
    });

  const openDetail = (id: string) => setSelectedId(id);
  const closeDetail = () => setSelectedId(null);

  const selected = selectedId
    ? (rec.items.find((it) => it.id === selectedId) ?? null)
    : null;

  return (
    <DeviceFrame
      overlay={
        selected ? (
          <DetailPanel
            item={selected}
            state={itemStates[selected.id]}
            onApply={() => apply(selected.id)}
            onIgnore={() => ignore(selected.id)}
            onAdjust={(delta) => adjust(selected.id, delta)}
            onClose={closeDetail}
          />
        ) : null
      }
    >
      <div className="flex min-h-full gap-6 px-10 py-12">
        <SideNav />
        <Brief
          rec={rec}
          itemStates={itemStates}
          onApply={apply}
          onIgnore={ignore}
          onSelect={openDetail}
        />
      </div>
    </DeviceFrame>
  );
}
