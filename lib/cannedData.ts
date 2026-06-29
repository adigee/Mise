import type { Recommendation } from "./types";

// The verbatim Tuesday scenario from BRIEF.md Section 2. This is the single
// source the UI renders. The live /api/recommend route returns the same shape,
// with canned data as the fallback so a failed call never breaks the demo.
//
// House style: no em dashes anywhere in copy (commas, periods, parentheses).
export const cannedRecommendation: Recommendation = {
  weekday: "Tuesday",
  date: "29 June",
  service: "Breakfast and lunch",

  hero: "Prep light today.",
  whyLine: "68 booked vs 84 typical, 4 soft Tuesdays running.",
  reasoning:
    "Booked covers are 19% below a normal Tuesday, and the last four Tuesdays all ran soft, between 12 and 18% below the weekly average. The soup base has been over-prepped on every one of those Tuesdays, averaging 5.8 kg binned, and bread rolls run about 22% binned across the whole week. Both are cheap to bin and quick to top up mid-service, so trimming them today carries little downside even if it gets busy. Salad greens are tracking to normal usage, so they hold. Cut soup base by 15% and drop the bread par by about 18 rolls. Hold everything else.",
  confidence: "high",
  confidenceNote: "High confidence, 4 of 4 Tuesdays match.",

  items: [
    {
      id: "soup-base",
      ingredient: "Soup base",
      direction: "cut",
      magnitude: "Cut 15%",
      effect: "≈5 kg less",
      why: "Over-prepped 4 of last 4 Tuesdays, avg 5.8 kg binned.",
      recoveryNote: "Batches in about 20 min if a rush hits.",
      defaultValue: 15,
      unit: "%",
    },
    {
      id: "bread-rolls",
      ingredient: "Bread rolls",
      direction: "cut",
      magnitude: "Drop par by 18",
      effect: "18 fewer rolls",
      why: "Running 22% binned all week.",
      recoveryNote: "Par bakes on demand, no real downside to running tight.",
      defaultValue: 18,
      unit: "rolls",
    },
    {
      id: "salad-greens",
      ingredient: "Salad greens",
      direction: "hold",
      magnitude: "Hold",
      why: "Usage steady, no change.",
    },
  ],

  confluence: {
    forward: {
      coversBooked: 68,
      coversTypical: 84,
      weekday: "Tuesday",
      service: "Breakfast and lunch",
      context: "Light, rainy",
    },
    historical: {
      summary:
        "The last 4 Tuesdays ran 12 to 18% below the weekly average. A consistent soft day.",
      trend: [
        { label: "4 Tue ago", covers: 71 },
        { label: "3 Tue ago", covers: 69 },
        { label: "2 Tue ago", covers: 74 },
        { label: "Last Tue", covers: 70 },
        { label: "Today", covers: 68 },
      ],
    },
    waste: {
      summary:
        "Soup base over-prepped 4 Tuesdays running, averaging 5.8 kg binned. Last Tuesday the chef applied the cut and it held at 0.9 kg. Bread rolls run about 22% binned across the week.",
      trend: [
        { label: "5 Tue ago", wasteKg: 6.1 },
        { label: "4 Tue ago", wasteKg: 5.4 },
        { label: "3 Tue ago", wasteKg: 6.3 },
        { label: "2 Tue ago", wasteKg: 5.4 },
        { label: "Last Tue", wasteKg: 0.9 },
      ],
    },
  },

  // The feedback loop: last Tuesday the chef applied the cut and it was right.
  yesterday: {
    weekday: "Tuesday",
    appliedAction: "cut 15%",
    wasteKg: 0.9,
    typicalWasteKg: 5.8,
    shortfalls: 0,
  },
};
