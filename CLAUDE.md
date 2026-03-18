# scReen

browser-native display size comparison tool. compare screens to scale.

## stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- Geist font (sans for UI, mono for data)
- Vitest for unit tests

## design system

- dark zinc base: `zinc-950` bg, `zinc-900` surfaces, `zinc-800` borders
- accent: cyan-400 (`#22d3ee`) for interactive elements, highlights, focus states
- all UI copy is lowercase. no title case, no sentence case in labels/buttons
- no em dashes anywhere. use commas, periods, or "to" instead
- geist mono for all numeric/spec data (PPI, resolution, dimensions)
- geist sans for everything else
- badge row at top: `open source` `no uploads` `browser-native`
- footer: "built by rabih. browser-native, no uploads, no tracking."

## project structure

```
app/
  layout.tsx
  page.tsx
  about/
    page.tsx
  globals.css
lib/
  types.ts
  math.ts
  presets.ts
components/
  overlay.tsx
  spec-table.tsx
  preset-browser.tsx
  custom-form.tsx
  display-chips.tsx
```

## conventions

- one component per file
- named exports for components, default export for pages
- keep state management simple: useState + useCallback, no external state libs
- all preset data lives in `lib/presets.ts` as a typed const array
- math utilities in `lib/math.ts` with full Vitest coverage
- types in `lib/types.ts`

## learning mode

when making technical decisions, explain in plain language why a particular approach was chosen. this is a learning project and understanding the "why" matters as much as the code.

## session workflow

each phase is one session. at the end of every session, produce a handoff summary:

1. what was completed
2. what decisions were made and why
3. what's next (the upcoming phase)
4. any open questions or loose ends

## phases

1. scaffolding + data layer (types, math, presets, tests)
2. visual overlay MVP (to-scale rectangles, auto-scaling)
3. interaction + hover states (isolate, annotate, sync)
4. spec table + PPI display (sortable, color-coded, synced)
5. preset browser + custom entry (categories, search, form)
6. URL state + sharing (encode/decode, copy link)
7. accessibility + keyboard nav (ARIA, focus, reduced motion)
8. about page + deployment polish (SEO, favicon, README)
