import { NextResponse } from "next/server";
import { cannedRecommendation } from "@/lib/cannedData";

// POST /api/recommend
//
// Returns the prep call for a day's confluence (covers, weekday, historical
// flux, ingredient usage, waste history) in the shape the UI renders.
//
// For now this is canned: it echoes the verbatim Tuesday scenario so the demo
// is always complete (BRIEF.md Section 5, "canned first").
//
// TODO: live Claude call (upside, not a dependency). Drop-in replacement for
// the body below, keeping cannedRecommendation as the fallback so a failed or
// unconfigured call never breaks the demo:
//
//   import Anthropic from "@anthropic-ai/sdk";
//   const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
//   const msg = await client.messages.create({
//     model: "claude-sonnet-4-6", // confirm exact id via the claude-api skill
//     max_tokens: 1024,
//     // Use a tool / structured-output schema for reliable JSON.
//     system:
//       "You are a pre-shift culinary forecasting assistant. Given today's " +
//       "booked covers, this weekday's historical pattern, recent ingredient " +
//       "usage, and waste history, recommend prep adjustments. Show your " +
//       "reasoning in one short paragraph. Stay advisory; the chef decides. " +
//       "Only recommend cutting items that are cheap to waste or quick to " +
//       "remake, and for each cut give a one-line recovery note; never cut a " +
//       "high-stakes item where running out means 86ing a dish. Return JSON: " +
//       "{ hero, reasoning, confidence, items: [{ingredient, direction, " +
//       "magnitude, why, recoveryNote}] }.",
//     messages: [{ role: "user", content: JSON.stringify(confluence) }],
//   });
//   ...parse, validate, and fall back to cannedRecommendation on any failure.

export async function POST() {
  return NextResponse.json(cannedRecommendation);
}

// Convenience for opening the endpoint in a browser during development.
export async function GET() {
  return NextResponse.json(cannedRecommendation);
}
