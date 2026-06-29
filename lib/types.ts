// Data model for the Mise pre-shift brief (see BRIEF.md Sections 2 and 5).
// The canned data and the (future) live /api/recommend response share this
// shape, so the UI never knows which one it is rendering.

export type Direction = "cut" | "hold" | "increase";

export type Confidence = "high" | "medium" | "low";

export type ItemStatus = "pending" | "applied" | "ignored";

// One supporting prep adjustment. A cut on a low-stakes, recoverable item
// carries a recoveryNote; a hold has neither magnitude nor recovery note.
export interface LineItem {
  id: string;
  ingredient: string;
  direction: Direction;
  // Human-readable magnitude, e.g. "cut 15%", "drop par by 18", "hold".
  magnitude: string;
  // Approximate concrete effect, e.g. "≈5 kg less". Optional for holds.
  effect?: string;
  // The evidence in one line, e.g. "over-prepped 4 of last 4 Tuesdays".
  why: string;
  // Why this cut is safe to make: cheap to bin or quick to remake. The
  // asymmetry, made concrete. Only present on cuts.
  recoveryNote?: string;
  // Default magnitude as a number (percent for cuts, units for par drops),
  // used by the Adjust stepper on screen 2. Holds omit this.
  defaultValue?: number;
  // Unit the stepper nudges in: "%" or "rolls" etc.
  unit?: string;
}

// The visible confluence of inputs (BRIEF.md Section 2). Grouped and labeled so
// the reasoning reads top to bottom on screen 2.
export interface ForwardSignal {
  coversBooked: number;
  coversTypical: number;
  weekday: string;
  service: string;
  context: string; // e.g. "Light, rainy"
}

export interface HistoricalPattern {
  // Short label, e.g. "Last 4 Tuesdays ran 12 to 18% below the weekly average".
  summary: string;
  // The last N comparable days as covers, for the small trend bars.
  trend: { label: string; covers: number }[];
}

export interface WasteHistory {
  // Short label, e.g. "Soup base over-prepped 4 of the last 4 Tuesdays".
  summary: string;
  // Per-ingredient over-production on comparable days, for the trend bars.
  trend: { label: string; wasteKg: number }[];
}

export interface Confluence {
  forward: ForwardSignal;
  historical: HistoricalPattern;
  waste: WasteHistory;
}

// The outcome of the last comparable day's call. The feedback loop: proof the
// brief has been right before. Shown as one quiet line on screen 1.
export interface YesterdayResult {
  weekday: string;
  appliedAction: string; // e.g. "cut 15%"
  wasteKg: number;
  typicalWasteKg: number;
  shortfalls: number; // dishes 86'd because we ran short; 0 is the good case
}

export interface Recommendation {
  // The hero call, one confident sentence. Rendered in the serif voice.
  hero: string;
  // The compressed "why" line: the trust anchor on screen 1.
  whyLine: string;
  // The full plain-language reasoning paragraph, shown on screen 2.
  reasoning: string;
  confidence: Confidence;
  // The honest hedge cue, e.g. "4 of 4 Tuesdays match".
  confidenceNote: string;
  items: LineItem[];
  confluence: Confluence;
  yesterday: YesterdayResult;
  // Header context for screen 1.
  date: string;
  weekday: string;
  service: string;
}
