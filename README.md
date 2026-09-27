# FoodyHall

A food supply chain optimization SaaS prototype — Next.js 14 (App Router) +
TypeScript + Tailwind CSS + shadcn-style UI + Tremor charts + Framer Motion +
Zustand.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Click **Get started** on the landing page, pick
any sign-in tab, and it drops you into the dashboard (session persists in
localStorage, so refreshing keeps you signed in — clear site data to reset).

## What's functional

- **Live traction counter** on the landing hero, ticking up every ~4s
- **Mock auth modal** — Google / Phone / Email tabs, fake network delay, real
  redirect into `/dashboard`
- **Global command palette** — `⌘K` / `Ctrl+K`, fuzzy search, runs real
  actions (nudges the forecast sliders, drains stock, jumps the rescue
  clock, toggles theme, scrolls to any section)
- **Collapsible + drag-resizable sidebar**, active section tracked via
  `IntersectionObserver` as you scroll
- **Dark/light theme toggle** via `next-themes`, no flash on load
- **Econometrics analytics board** — Tremor `LineChart` (7D/30D/90D demand
  forecast) and `BarChart` (ROI & CO₂ reduced)
- **Demand Prediction** — two sliders re-render an SVG forecast line live
- **Dynamic Supply Monitor** — stock-vs-orders bar that drifts on its own
  every 4s and flashes red under 20%
- **Surplus Rescue** — an 18:00–22:00 time slider that discounts two sample
  dishes in real ₫ pricing as closing approaches
- **Live heatmap** — six seeded Da Nang restaurants, glowing red/orange for
  surplus and green for shortage, with hover tooltips

## Notes / simplifications

- All "live" data is simulated client-side (`setInterval` + mock datasets in
  `lib/mock-data.ts`) — there's no backend.
- The dashboard is one page with anchor-scroll sections rather than separate
  routes per nav item, matching the "single immersive prototype" brief.
- Auth is fully mocked — no real Google/OAuth/SMS integration.

## Structure

```
app/
  page.tsx              landing page
  dashboard/
    layout.tsx           sidebar + topbar + command palette shell
    page.tsx              overview: KPIs, analytics, bento grid, heatmap
components/
  ui/                    button, dialog, tabs, slider, progress, command
  landing/               hero, live counter, auth modal
  dashboard/             sidebar, topbar, command palette, all 3 pillar cards, heatmap
lib/
  store.ts               zustand store (auth, sidebar, sliders, command state)
  mock-data.ts           seeded restaurants + forecast/ROI datasets
  utils.ts               cn() class helper
```
