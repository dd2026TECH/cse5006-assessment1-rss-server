# RSS Server Frontend — CSE5006 Assessment 1

A usability-focused frontend for an **RSS Server feeding into an LMS**.
Assessment 1 is **frontend only**: blog-style sample content stands in for
RSS feed items until the backend arrives in Assessment 2.

Bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
(Next.js App Router, TypeScript, CSS Modules — no UI framework).

**New to the codebase?** Read [CODE_TOUR.md](CODE_TOUR.md) — a guided walkthrough of how the
app is put together, tracing real user actions through the code.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm run lint` (ESLint),
`npm test` (Playwright smoke suite — boots its own dev server on port 3457).

**Before submission:** set your name and student number in
[`src/lib/siteConfig.ts`](src/lib/siteConfig.ts) — the header, footer and
About page all read from it. Drop the walkthrough video at
`public/videos/how-to.mp4`.

## Pages

| Route | Purpose |
|---|---|
| `/` | Landing page: project intro, page links, RSS→LMS workflow overview |
| `/about` | Project explanation, current scope, how-to video, author details |
| `/feeds` | Sample posts: search, card/list layout toggle, expandable summaries |
| `/feeds/[slug]` | Dynamic post pages with breadcrumbs |
| `/settings` | Theme (light/dark/system) and feed layout preferences |

## Features

- **Themes** — light/dark via CSS custom properties. The choice persists in
  localStorage **and** a cookie, so the server renders the correct theme on
  first paint (no flash). First visit follows `prefers-color-scheme`.
- **Responsive navigation** — desktop nav bar collapses into an animated
  hamburger menu (CSS transforms) with `aria-expanded`, Escape-to-close and
  close-on-navigation.
- **Accessibility** — semantic landmarks, skip link, keyboard operability,
  visible focus styles, WCAG AA contrast in both themes,
  `prefers-reduced-motion` support.
- **Interactive feeds** — live search with an announced result count,
  persisted card/list layout, expand/collapse summaries, breadcrumbs.

## Structure

```
src/
├── app/          # App Router routes (each page + its CSS module)
├── components/   # Reusable UI (Header, Footer, NavBar, HamburgerMenu,
│                 # ThemeProvider, PostCard, FeedsView, Breadcrumbs, …)
└── lib/          # siteConfig, sample posts behind getPosts(),
                  # useLocalStorage hook, preference keys
```

Posts are read exclusively through `getPosts()` / `getPostBySlug()` in
[`src/lib/posts.ts`](src/lib/posts.ts) — in Assessment 2 these functions are
reimplemented against the real RSS backend with no component changes.

## Testing

Playwright smoke tests in [`tests/smoke.spec.ts`](tests/smoke.spec.ts) cover the real browser
interactions: hamburger menu (open/navigate/Escape with focus restore), theme toggle + cookie
persistence across reload, feeds search with announced result count, layout toggle persistence,
summary expand/collapse, dynamic post pages, breadcrumbs, and 404s. Run with `npm test`.

## Git workflow

Feature branches merged into `main` with `--no-ff`:
`feature/layout-shell` → `feature/theme-system` → `feature/feeds-pages` →
`feature/interactivity` → `feature/a11y-polish`.

## Roadmap

- **Assessment 2** — server component + live RSS ingestion
- **Later** — LMS delivery, authentication, deployment
