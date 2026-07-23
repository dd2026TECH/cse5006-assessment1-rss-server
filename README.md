# LMS on Cloud — Web Application Build (CSE5006 Assessment 1)

A Learning Management System delivered on the cloud, built as a web
application across four assessed parts and documented from a student's
perspective so other students can see how it was built. This repo is
**Assessment 1**, the frontend: blog-style sample content stands in for real
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

**Repository:** [github.com/dd2026TECH/cse5006-assessment1-rss-server](https://github.com/dd2026TECH/cse5006-assessment1-rss-server)

**Before submission:** drop the walkthrough video at `public/videos/how-to.mp4`
— the About page embeds it and currently shows an empty player until the file
is added.

## Pages

| Route | Purpose |
|---|---|
| `/` | Landing page: project intro, links to the four assessment pages + other pages, RSS→LMS workflow overview |
| `/about` | Project explanation, the four assessed parts, current scope, how-to video, author details |
| `/assessment-1` | What Assessment 1 delivered (this build) + the how-to video |
| `/assessment-2` | Placeholder: backend, API & database (fills in once built) |
| `/assessment-3` | Placeholder: data-driven app & reporting (fills in once built) |
| `/assessment-4` | Placeholder: live demonstration (fills in once built) |
| `/feeds` | Sample posts: search, card/list layout toggle, expandable summaries |
| `/feeds/[slug]` | Dynamic post pages with breadcrumbs |
| `/settings` | Theme (light/dark/system) and feed layout preferences |

## Features

- **Themes** — light/dark via CSS custom properties. The choice persists in
  a cookie **and** localStorage; a small inline script in `<head>` applies it
  before the browser paints, so there is no flash of the wrong theme *and*
  every page still ships as static HTML. First visit follows
  `prefers-color-scheme`.
- **Responsive navigation** — desktop nav bar collapses into an animated
  hamburger menu (CSS transforms) with `aria-expanded`, Escape-to-close and
  close-on-navigation.
- **Accessibility** — semantic landmarks, skip link, keyboard operability,
  visible focus styles, WCAG AA contrast in both themes,
  `prefers-reduced-motion` support.
- **Interactive feeds** — live search with an announced result count,
  persisted card/list layout, expand/collapse summaries, breadcrumbs, and
  post artwork with author bylines.

## Structure

```
src/
├── app/          # App Router routes (each page + its CSS module)
├── components/   # Reusable UI (Header, Footer, NavBar, HamburgerMenu,
│                 # ThemeProvider, PostCard, FeedsView, Breadcrumbs, …)
└── lib/          # siteConfig, assessments (the four parts), sample posts
                  # behind getPosts(), useLocalStorage hook, preference keys
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

Feature branches merged into `main` with `--no-ff`, each one lint-checked and
run through the Playwright suite before merging:

`feature/layout-shell` → `feature/theme-system` → `feature/feeds-pages` →
`feature/interactivity` → `feature/a11y-polish` → `feature/playwright-tests` →
`docs/code-tour` → `chore/student-identity` → `feature/post-images` →
`fix/nav-order-consistency`.

## Roadmap

- **Assessment 2** — server component + live RSS ingestion
- **Later** — LMS delivery, authentication, deployment
