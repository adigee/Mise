# BRIEF.md: "Mise", The Pre-Shift Prep Brief

A speculative product concept for a forward-looking food-waste tool. Built as a
working prototype to demonstrate product thinking, behavioral design, and an
AI-first build workflow. Reusable as a portfolio artifact across food-waste and
kitchen-intelligence companies.

(Working name: "Mise", from mise en place. Swap freely.)

---

## 0. Read this first: the thesis the build must serve

Every food-waste tool on the market today captures waste touchlessly: a camera
over the bin, no buttons, no staff effort. Capture is a solved, commoditized
problem. The unsolved half is **action**. Reducing waste requires a chef to
actually change what they prep, and today that still depends on someone opening
a retrospective dashboard, interpreting it, remembering it, and translating it
into a prep decision during the most time-starved minutes of their day.

So the capture is touchless. The change is not.

**Mise closes that gap by moving the insight from retrospective to predictive,
and from the dashboard to the moment of action.** It is not an end-of-day report
of what was wasted. It is a pre-shift brief, read in about 15 seconds before
prep starts, that tells the chef what to prep today and why, built from a
confluence of signals.

The recommendation earns trust by showing its inputs. A bare "cut soup 15%" is a
black box a chef will ignore. "70 covers booked, last 4 Tuesdays ran light,
carrots and bread trending down, so cut soup prep 15%" is a colleague showing
their work. **The visible confluence of inputs IS the trust mechanism. This is
the core design idea. Do not bury it.**

The build must make three things unmistakable:
1. This is forward-looking (today and tomorrow), not a rear-view report.
2. The recommendation is visibly derived from named inputs.
3. The chef is always in command (accept, adjust, dismiss). A prediction the
   user can't override is a prediction they'll abandon the first time it's wrong.

---

## 1. The user and the moment

Primary user: the **head chef / kitchen manager** at a single site. (Note: the
person who BUYS this is the multi-site F&B director, who cares about portfolio
rollup and ESG reporting. But the person whose behavior makes the ROI real is
the head chef. We design for the chef, on purpose. That choice is part of the
point.)

The moment: 6:45am, before prep. Hot kitchen, no time, reading on a phone or a
wall-mounted tablet. The brief has roughly 15 seconds of attention to deliver one
confident, defensible call, with evidence one tap away if doubted.

---

## 2. The data confluence model

The recommendation is the output of three classes of input. The UI must visibly
group and label them so the reasoning reads top to bottom.

**A. Forward signal (what today looks like)**
- Covers booked today vs. a typical same-weekday
- Day of week, service period
- Optional context: weather, local event, occupancy (hotel)

**B. Historical pattern (what this kind of day usually does)**
- This weekday's typical cover flux over the last N weeks
- Recent usage trend on specific ingredients

**C. Waste history (Orbisk-style data: what we over-prepped and binned)**
- Ingredient-level over-production on comparable days
- Consistency of the pattern (e.g. "4 of the last 4 Tuesdays")

**Output: the prep call**, one hero recommendation plus 2-3 supporting line
items, each with a clear direction (cut / hold / increase), a magnitude, and a
one-tap response.

### Realistic mock data (use this verbatim so the demo is concrete)

Scenario: hotel restaurant, Tuesday breakfast + lunch service.

- Today: **Tuesday**, **68 covers booked** (typical Tuesday: 84). Light, rainy.
- Last 4 Tuesdays: ran 12 to 18% below the weekly average. Consistent soft day.
- Soup base: over-prepped **4 of the last 4 Tuesdays**, avg **5.8 kg binned**.
- Bread rolls: ~**22% binned** consistently across the week.
- Salad greens: usage steady, no adjustment needed (use this as a "hold" item, to
  prove the tool isn't just telling you to cut everything).

Hero recommendation:
> **Prep light today.** Booked covers are 19% below a normal Tuesday, and the
> last four Tuesdays all ran soft. Cut soup base by 15% and drop the bread par by
> ~18 rolls. Hold everything else.

Supporting line items (each with [Apply] [Ignore] [See why]):
- Soup base: **cut 15%** (≈5 kg less), over-prepped 4 of last 4 Tuesdays
- Bread rolls: **drop par by 18**, running 22% binned all week
- Salad greens: **hold**, usage steady, no change

---

## 3. Screens

**Two screens only.** Tablet-first (wall-mounted or counter tablet in the
kitchen), mobile-aware. Progressive disclosure is the rule: screen 1 stays calm
and glanceable, the full reasoning lives one tap away on screen 2. A chef under
service pressure, who is not a tech-centric user, should never face a busy
screen.

### Screen 1: The Brief (glanceable, calm)
- Header: day, date, service, the single covers figure (forward signal up top).
- **Hero zone: the recommendation.** The one thing the chef must read. It owns
  the top third of the screen.
- **One compressed "why" line** on the hero, just enough proof to make a
  prediction credible at a glance (e.g. "68 booked vs 84 typical · 4 soft
  Tuesdays running"). This is the trust anchor. The FULL confluence is NOT on
  this screen; it lives behind See why. One line here, everything else disclosed
  on tap.
- **Prep adjustments:** the 2-3 line items, each a row with direction + magnitude
  + a one-tap [Apply] [Ignore] [See why].
- A subtle confidence cue on the hero call (e.g. "High confidence, 4 of 4
  Tuesdays match"). Honest hedging builds trust.

### Screen 2: See why (the full confluence + reasoning)
Reached by tapping See why on the hero or any line item.
- The three input groups (Forward signal / Historical pattern / Waste history)
  as labeled evidence, visibly feeding the call. Numbers in mono.
- A simple trend visualization (the last 4 to 5 comparable days as small bars).
  Proof, not decoration.
- A short, plain-language explanation of the reasoning. No corporate language.
- The recommended action repeated clearly, with the same [Apply] [Ignore].
- [Adjust] reveals a simple stepper to override the magnitude (e.g. nudge the
  soup cut from 15% to 10%). The chef stays in command. Applying locks it in
  with a quiet confirmation.

---

## 4. Design system (be opinionated; do NOT ship Shadcn defaults)

Substrate: **Tailwind primitives**, no component kit. Distinctiveness comes from
the tokens, the type system, and the layout rules below, not from a library.

Aesthetic target: a confident, high-contrast **operational brief**. This is
functional, utilitarian kitchen software for a high-pressure environment, NOT
decorative or fashion-forward design. The high contrast and the editorial type
are in service of fast, glanceable legibility for a chef mid-service, not visual
flourish. If a styling choice does not aid readability or trust under pressure,
cut it. Think the morning brief a serious operation runs on, not a friendly SaaS
dashboard, and not a design showpiece. Deliberately NOT the food-waste category
look (rounded, white, green, approachable). No green anywhere. No rounded-pill
friendliness. No ornamentation for its own sake.

### Color tokens (warm near-black + single ember accent)
```
--bg-base:    #14110E   /* warm near-black canvas */
--bg-raised:  #1C1916   /* hairline-separated zones, not cards */
--fg:         #F5F1EA   /* warm off-white */
--fg-muted:   #9B9389   /* labels, secondary data */
--line:       rgba(245,241,234,0.08)  /* hairline dividers */
--accent:     #FF5A1F   /* ember, the single signal color, used sparingly */
--accent-dim: #B8451A   /* pressed / secondary accent */
--cut:        #FF5A1F   /* "cut" direction uses ember */
--hold:       #9B9389   /* "hold" is neutral, intentionally quiet */
--up:         #E8C547   /* rare "increase", warm amber, not green */
```
Use the ember accent with discipline: the hero call, the active state, the "cut"
magnitude. Everything else is warm neutral. Restraint is what reads as senior.

### Type system (THREE voices, this is the signature)
Load via Google Fonts. All three render reliably for AI agents.
- **Instrument Serif**, editorial voice, used SPARINGLY. The hero
  recommendation only, maybe section headlines. It is the one expressive
  element, which is exactly why it must stay rare. Everywhere else is
  functional. Do not let the serif spread into the interface or it tips into
  decorative.
- **Inter Tight**, the interface. Labels, buttons, body, navigation. This is
  the workhorse and most of the screen is this.
- **Geist Mono** (or JetBrains Mono), every hard number. Covers, kg, %, dates.
  The "instrument readout" feel. This is what makes data feel precise and
  trustworthy.

Rule: serif = voice, sans = interface, mono = data. Never mix the jobs.

### Type scale (mobile-first)
```
Hero recommendation:  Instrument Serif, ~40-48px, tight leading
Section headline:     Instrument Serif, ~22px
Body / reasoning:     Inter Tight, 15-16px
Labels / kickers:     Inter Tight, 12px, uppercase, letter-spaced, --fg-muted
Data figures:         Geist Mono, sized to context, tabular-nums
```

### Layout rules
- Single column, generous margins, **tablet-first** (read on a wall-mounted or
  counter tablet in the kitchen), mobile-aware as a fallback.
- **Hairline dividers, not cards.** The whole screen is one continuous brief, not
  a grid of boxes. Cards would fragment the "one confluence → one call" reading.
- Strong vertical rhythm. Let the hero recommendation breathe with real space
  above and below.
- Layout enforces the thesis: inputs sit visually above the call they produce.
- Motion: minimal. One purposeful transition on Accept/Adjust. No template
  flourish, no spring-bouncy everything.

---

## 5. Build approach (canned first, live API as upside)

Build the full experience with the mock data above FIRST. That guarantees a
finished, demoable artifact regardless of time.

THEN, only if time allows, swap the single recommendation generation for a live
endpoint so changing the inputs changes the recommendation:

- `api/recommend` (serverless): receives the day's confluence (covers, weekday,
  historical flux, ingredient usage trends, waste history) and returns the prep
  call + line items + reasoning.
- Prompt shape: "You are a pre-shift culinary forecasting assistant. Given
  today's booked covers, this weekday's historical pattern, recent ingredient
  usage, and waste history, recommend prep adjustments. Show your reasoning in
  one short paragraph. Stay advisory; the chef decides. Return JSON:
  { hero, reasoning, confidence, items: [{ingredient, direction, magnitude,
  why}] }."
- Front end renders the JSON into the screens above. Keep canned data as the
  fallback so a failed call never breaks the demo.

The live version is the strongest possible signal for an AI-forward team: a
working AI advisor that reasons over data, not a mockup of one. But it is upside,
never a dependency.

---

## 6. Acceptance criteria

- [ ] In 15 seconds, a stranger understands: it's a morning brief, it's
      forward-looking, and it's telling the chef to prep light today.
- [ ] Screen 1 is calm and glanceable, with one compressed "why" line as the
      trust anchor. The full confluence is disclosed on screen 2 via See why.
- [ ] The recommendation visibly grows out of named inputs on screen 2. The
      trust mechanism is legible without explanation.
- [ ] Every prep item can be applied, ignored, or adjusted. The chef is never
      locked into a prediction.
- [ ] At least one "hold" item exists, so it doesn't read as "cut everything."
- [ ] A confidence/hedge cue is present on the hero call.
- [ ] Two screens only. Tablet-first.
- [ ] It looks like functional, utilitarian kitchen software, not a design
      showpiece and not a Shadcn default. Warm near-black, ember, three-voice
      type with the serif used sparingly, hairline dividers.
- [ ] No em dashes in any copy. Commas, periods, parentheses only.

---

## 7. Honest dependency (keep this defensible in an interview)

The confluence assumes a booking/PMS feed for "covers booked today," which a
food-waste company may not yet integrate. This is a feature of the pitch, not a
flaw: it shows exactly where the product roadmap goes next (a Series A explicitly
funding "enhanced customer integrations"). The brief should be honest that the
booking feed is the key new dependency. The waste history and weekday patterns
are already in such a company's possession.

---

## 8. Why this concept, in one line (for the pitch note)

It reframes a food-waste company from a measurement business (commodity:
everyone has a dashboard) into a kitchen-intelligence business (forecasting:
defensible, sits on the data they already own). The capture is touchless. This
makes the action touchless too.

The one-line version, for the pitch: **the best moment to reduce waste is before
it happens.**
