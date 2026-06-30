import type { Recommendation } from "./types";

// The verbatim Tuesday dinner-service scenario from the orbisk Figma frames.
// This is the single source the UI renders. The live /api/recommend route
// returns the same shape, with canned data as the fallback so a failed call
// never breaks the demo.
//
// The Focaccia detail (paragraph + trend) is taken exactly from the Figma
// overlay. The other items reuse the same overlay template with copy derived
// from their list line and consistent four-Tuesday waste trends.
//
// House style: no em dashes anywhere in copy (commas, periods, parentheses).
export const cannedRecommendation: Recommendation = {
  weekday: "Tuesday",
  date: "30 June",
  service: "Dinner service",
  covers: {
    total: "73 🍽️",
    detail: "68 covers booked + 5 walk-ins",
  },

  hero: "Reduce prep on focaccia and Brussels sprouts",
  subline: "Hold on lamb and prawn",
  confidenceNote: "High confidence, based on past 4 Tuesdays",

  statCards: [
    {
      amount: "19",
      ingredient: "focaccia rolls",
      caption: "wasted yesterday",
      avg: "(avg 7 rolls)",
    },
    {
      amount: "6 kgs",
      ingredient: "brussels sprouts",
      caption: "wasted yesterday",
      avg: "(avg 1kg)",
    },
  ],

  items: [
    {
      id: "focaccia",
      ingredient: "Focaccia with whipped lardo",
      direction: "cut",
      magnitude: "Reduce bake by 10 rolls",
      effect: "10 fewer rolls",
      magnitudePrefix: "Reduce bake by",
      unit: "rolls",
      why: "22% binned all week. Batches bake in 20 mins if rush hits",
      detailLabel: "Focaccia",
      detailParagraph:
        "10 to 19 focaccia rolls were binned per day over the past 4 Tuesdays. Last week the chef applied the recommended cut and only 1 roll was binned.",
      wasteTrend: [
        { label: "4 Tue ago", value: 13 },
        { label: "3 Tue ago", value: 9 },
        { label: "2 Tue ago", value: 10 },
        { label: "Last tuesday", value: 1 },
      ],
      defaultValue: 10,
      confidenceNote: "High confidence, based on past 4 Tuesdays",
    },
    {
      id: "brussels",
      ingredient: "Fried Brussels sprouts with mint",
      direction: "cut",
      magnitude: "Reduce prep by 5kgs",
      effect: "5 kgs saved",
      magnitudePrefix: "Reduce prep by",
      unit: "kgs",
      why: "A total of 13.3kgs binned over the past 3 days.",
      detailLabel: "Brussels sprouts",
      detailParagraph:
        "4 to 6 kgs of Brussels sprouts were binned per day over the past 4 Tuesdays, 13.3 kgs in the last 3 days alone. Trimming the prep still holds plenty back for a rush.",
      wasteTrend: [
        { label: "4 Tue ago", value: 6 },
        { label: "3 Tue ago", value: 4 },
        { label: "2 Tue ago", value: 5 },
        { label: "Last tuesday", value: 5 },
      ],
      defaultValue: 5,
      confidenceNote: "High confidence, based on past 4 Tuesdays",
    },
    {
      id: "prawn",
      ingredient: "Prawn with champagne and peach",
      direction: "hold",
      magnitude: "Hold",
      why: "Usage steady, minimal waste",
      detailLabel: "Prawn",
      detailParagraph:
        "Prawn usage has tracked steady over the past 4 Tuesdays with minimal waste. No change recommended.",
      wasteTrend: [
        { label: "4 Tue ago", value: 1 },
        { label: "3 Tue ago", value: 0.5 },
        { label: "2 Tue ago", value: 1 },
        { label: "Last tuesday", value: 0.5 },
      ],
      confidenceNote: "Steady across the past 4 Tuesdays",
    },
    {
      id: "agnolotti",
      ingredient: "Agnolotti and lettuces",
      direction: "hold",
      magnitude: "Hold",
      why: "No lettuce binned in the past 2 days!",
      detailLabel: "Agnolotti",
      detailParagraph:
        "Agnolotti and lettuces have held steady, with no lettuce binned in the past 2 days. No change recommended.",
      wasteTrend: [
        { label: "4 Tue ago", value: 1 },
        { label: "3 Tue ago", value: 1 },
        { label: "2 Tue ago", value: 0.5 },
        { label: "Last tuesday", value: 0 },
      ],
      confidenceNote: "Steady across the past 4 Tuesdays",
    },
    {
      id: "lamb",
      ingredient: "Lamb tonnato",
      direction: "hold",
      magnitude: "Hold",
      why: "Usage steady, minimal waste",
      detailLabel: "Lamb",
      detailParagraph:
        "Lamb usage has tracked steady over the past 4 Tuesdays with minimal waste. No change recommended.",
      wasteTrend: [
        { label: "4 Tue ago", value: 1 },
        { label: "3 Tue ago", value: 0.5 },
        { label: "2 Tue ago", value: 1 },
        { label: "Last tuesday", value: 0.5 },
      ],
      confidenceNote: "Steady across the past 4 Tuesdays",
    },
    {
      id: "ribs",
      ingredient: "Coca-Cola short ribs",
      direction: "hold",
      magnitude: "Hold",
      why: "No ribs binned",
      detailLabel: "Short ribs",
      detailParagraph:
        "No short ribs have been binned over the past 4 Tuesdays. No change recommended.",
      wasteTrend: [
        { label: "4 Tue ago", value: 0.5 },
        { label: "3 Tue ago", value: 0 },
        { label: "2 Tue ago", value: 0 },
        { label: "Last tuesday", value: 0 },
      ],
      confidenceNote: "Steady across the past 4 Tuesdays",
    },
    {
      id: "dessert",
      ingredient:
        "Bear mints, Donnie's raspberries, and bananas foster sundae with caramel sauce",
      direction: "hold",
      magnitude: "Hold",
      why: "Usage steady, no change.",
      detailLabel: "Dessert",
      detailParagraph:
        "The dessert course has tracked steady over the past 4 Tuesdays with no meaningful waste. No change recommended.",
      wasteTrend: [
        { label: "4 Tue ago", value: 1 },
        { label: "3 Tue ago", value: 0.5 },
        { label: "2 Tue ago", value: 1 },
        { label: "Last tuesday", value: 0.5 },
      ],
      confidenceNote: "Steady across the past 4 Tuesdays",
    },
  ],
};
