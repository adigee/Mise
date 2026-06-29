# Mise

A speculative product concept for a forward-looking food-waste tool. Built as a
working prototype to demonstrate product thinking, behavioral design, and an
AI-first build workflow.

> The best moment to reduce waste is before it happens.

Mise is a **pre-shift prep brief**: a 15-second read, before prep starts, that
tells a head chef what to prep today and why. It moves the insight from a
retrospective dashboard to the moment of action, and earns trust by showing its
inputs (the visible confluence of forward signal, historical pattern, and waste
history). See [`BRIEF.md`](./BRIEF.md) for the full product brief.

## Two screens

1. **The Brief** (`components/Brief.tsx`) — calm and glanceable. The hero call,
   one compressed why line, a confidence cue, the prep adjustments with one-tap
   Apply / Ignore / See why, and a quiet "last time" line showing the previous
   call was right.
2. **See why** (`components/SeeWhy.tsx`) — the full confluence (three labeled
   input groups + trend bars), the plain-language reasoning, and an Adjust
   stepper so the chef can override any magnitude.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (tokens and type system only, no component kit)
- Three-voice type: Instrument Serif (voice), Inter Tight (interface), Geist
  Mono (data), via `next/font/google`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Best viewed at tablet width; mobile-aware as a
fallback. The demo runs fully on canned data (`lib/cannedData.ts`), so no
configuration or API key is required.

## Data and the API

The UI renders a single `Recommendation` shape (`lib/types.ts`). An
`app/api/recommend` route returns the same shape; today it echoes the canned
recommendation. The live Claude version is wired as a drop-in upside (see the
`TODO` in `app/api/recommend/route.ts`) with the canned data kept as a fallback,
so a failed or unconfigured call never breaks the demo.

To enable the live endpoint later, copy `.env.example` to `.env.local` and set
`ANTHROPIC_API_KEY`.

## Deploy (Vercel)

This is a stock Next.js App Router app and deploys to Vercel with zero config.

```bash
npm i -g vercel   # if not installed
vercel            # link and deploy a preview
vercel --prod     # promote to production
```

If you enable the live recommendation, add `ANTHROPIC_API_KEY` in the Vercel
project's Environment Variables. Without it, the deploy still works on canned
data.
