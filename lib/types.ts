// Data model for the Mise pre-shift brief (iPad redesign).
// The canned data and the (future) live /api/recommend response share this
// shape, so the UI never knows which one it is rendering.
//
// House style: no em dashes anywhere in copy (commas, periods, parentheses).

export type Direction = "cut" | "hold";

export type ItemStatus = "pending" | "applied" | "ignored";

// One point in an ingredient's per-day waste history (the small bar chart in
// the detail overlay). Four comparable days (Tuesdays).
export interface WastePoint {
  label: string; // e.g. "4 Tue ago", "Last tuesday"
  value: number; // amount binned that day, in the item's unit
}

// One waste stat-card on the brief (e.g. "19 / focaccia rolls / wasted
// yesterday / (avg 7 rolls)").
export interface StatCard {
  amount: string; // "19", "6 kgs"
  ingredient: string; // "focaccia rolls"
  caption: string; // "wasted yesterday"
  avg: string; // "(avg 7 rolls)"
}

// One menu line item. A "cut" carries a magnitude the chef can Apply / Adjust;
// a "hold" is informational only (no action). Both open the adaptive detail
// overlay on "See why".
export interface LineItem {
  id: string;
  ingredient: string; // "Focaccia with whipped lardo"
  direction: Direction;
  // Human-readable magnitude shown in the list and overlay hero, e.g.
  // "Reduce bake by 10 rolls" or "Hold".
  magnitude: string;
  // Approximate concrete effect, e.g. "10 fewer rolls". Holds omit this.
  effect?: string;
  // Leading verb phrase used to rebuild the magnitude when adjusted, e.g.
  // "Reduce bake by". Cuts only.
  magnitudePrefix?: string;
  // Unit the stepper nudges in: "rolls" or "kgs". Cuts only.
  unit?: string;
  // The evidence in one line, shown under the row.
  why: string;
  // Short label for the detail overlay (chart row + heading), e.g. "Focaccia".
  detailLabel: string;
  // The waste-history narrative shown in the overlay.
  detailParagraph: string;
  // Per-day waste for the overlay's small bar chart.
  wasteTrend: WastePoint[];
  // Default magnitude as a number, used by the Adjust stepper. Holds omit this.
  defaultValue?: number;
  // The honest hedge cue, e.g. "High confidence, based on past 4 Tuesdays".
  confidenceNote: string;
}

export interface Recommendation {
  // Header context.
  weekday: string;
  date: string;
  service: string;
  // The covers readout, top right of the header.
  covers: {
    total: string; // "73 🍽️"
    detail: string; // "68 covers booked + 5 walk-ins"
  };
  // The hero call, one confident sentence. Rendered in the serif voice.
  hero: string;
  // The quiet second line under the hero, e.g. "Hold on lamb and prawn".
  subline: string;
  // The honest hedge cue shown under the call.
  confidenceNote: string;
  // The two waste stat-cards.
  statCards: StatCard[];
  // The menu line items (cuts first, then holds).
  items: LineItem[];
}
