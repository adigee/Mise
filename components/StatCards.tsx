import type { StatCard } from "@/lib/types";

// The two waste stat-cards under the call: yesterday's binned amount per
// flagged ingredient. The one raised (card) surface in an otherwise
// hairline-driven layout.
export function StatCards({ cards }: { cards: StatCard[] }) {
  return (
    <div className="flex w-full gap-8 py-6">
      {cards.map((card) => (
        <div
          key={card.ingredient}
          className="flex min-w-0 max-w-[250px] flex-1 flex-col justify-end gap-4 rounded-[12px] bg-card p-4"
        >
          <div className="font-mono text-[18px] leading-snug text-fg">
            <div>{card.amount}</div>
            <div>{card.ingredient}</div>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-fg">{card.caption}</span>
            <span className="text-fg-muted">{card.avg}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
