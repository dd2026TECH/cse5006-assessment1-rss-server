// Sample content standing in for RSS feed items (Assessment 1 is frontend
// only). The shape follows the blog structure from the Module 4 labs
// (id, title, description→summary, author, date, imageUrl).
// Everything reads through getPosts()/getPostBySlug() — in Assessment 2
// these functions will be reimplemented against the real RSS backend
// without any component changes.
//
// This feed is written entirely by the student: five "Build Journal" posts
// reflecting on what was actually new and difficult while building this app,
// and five "Research Notes" posts where a real source was read and then tied
// back to a decision made in this codebase.

import { siteConfig } from "./siteConfig";

export type PostCategory = "Announcements" | "Learning" | "Theming" | "Research";

/** A citation's exact substring in `body` paired with the real URL it should link to. */
export type Citation = { text: string; href: string };

export type Post = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  body: string[];
  author: string;
  date: string; // ISO 8601
  imageUrl: string;
  imageAlt: string; // every image gets a real text alternative (WCAG)
  source: string; // name of the (future) RSS feed this item came from
  category: PostCategory;
  citations?: Citation[];
};

const posts: Post[] = [
  {
    id: 1,
    slug: "new-concepts-i-met-building-my-first-app",
    title: "New concepts I met building my first app",
    summary:
      "I started Assessment 1 not knowing what RSS, a hamburger menu, a cookie, or a breadcrumb trail actually were in code terms. Here is what each one turned out to mean.",
    body: [
      "This is the first app I have built, so a lot of the words in the brief were new to me before I started, not just new to this project. Writing them down in plain terms is how I actually understood them.",
      "RSS (Really Simple Syndication) is a standard format a website publishes so other tools can read its content programmatically instead of scraping the page — that is the whole idea behind the RSS Server this app is the frontend for. A hamburger menu is the three-line icon that expands into full navigation on small screens; a cookie is a small piece of data the browser sends back to the server with every request, which turned out to matter a lot once I got to theming. A breadcrumb trail is the small Home / Feeds / Post Title strip at the top of a page that shows where you are and lets you step back up one level at a time.",
      "None of these were difficult once I saw them working, but I could not have named any of them accurately before this assessment. I am writing this post first, before the others, because everything else I built depends on understanding these basic pieces first.",
    ],
    author: siteConfig.studentName,
    date: "2026-06-24",
    imageUrl: "/images/posts/rss-server.svg",
    imageAlt:
      "An RSS feed icon sending content to a screen that represents the LMS.",
    source: "Build Journal",
    category: "Learning",
  },
  {
    id: 2,
    slug: "react-component-composition-and-reuse",
    title: "Research notes: React component composition and reuse",
    summary:
      "Before building my components I read up on how React expects components to be composed and reused. The core idea: small, single-purpose components combined together, not large ones with dozens of props.",
    body: [
      "React's own documentation frames this through 'Thinking in React': break the interface into a component hierarchy where each component does one job, then compose them rather than writing one large component that tries to handle every case (React, n.d., react.dev/learn/thinking-in-react). The same document is direct about the alternative to reaching for a prop for every variant — favour composition, and let a component accept children or a small set of variant props instead of branching internally for every case.",
      "The other point that stood out, also from the official docs, was about where data lives: components should not manage their own data if they do not have to — fetch it once, then pass it down as props, so the same component can be reused wherever that data shape shows up.",
      "What this means for my build: it is the reason PostCard in this app takes a layout prop instead of me writing a separate CardPostCard and ListPostCard. One component, one job, reused in two views. Reading the reasoning behind the pattern before I wrote the component is what stopped me from duplicating it.",
    ],
    author: siteConfig.studentName,
    date: "2026-06-26",
    imageUrl: "/images/posts/community-tools.svg",
    imageAlt:
      "Dots of different sizes joined into a network, representing components composed together.",
    source: "Research Notes",
    category: "Research",
    citations: [
      { text: "react.dev/learn/thinking-in-react", href: "https://react.dev/learn/thinking-in-react" },
    ],
  },
  {
    id: 3,
    slug: "applying-component-reusability-for-the-first-time",
    title: "Applying component reusability for the first time",
    summary:
      "I learned the idea of reusable components in my IT Fundamentals course, but this is the first project where I actually built one. PostCard and siteConfig are where it shows up.",
    body: [
      "IT Fundamentals is where I first learned the idea that you should write a piece of logic once and reuse it, not copy it. This project is where I actually had to do it in real code rather than talk about it in theory. Two places in this app show the idea directly. PostCard is one component that renders a post two different ways — as a grid card or as a list row — controlled by a single layout prop, instead of two separate near-identical components. siteConfig.ts is the other: my name, student number, and the assessment title are written once and imported by the header, footer, and About page, so changing one file updates all three places at once instead of three separate edits that could drift apart.",
      "One thing I found myself wondering while building this: is React similar to how PHP mixes server code with HTML? I think that is a fair comparison, but only half of it. Where they are alike: a Next.js Server Component runs on the server and outputs finished HTML before the browser sees it, which is the same basic idea as a PHP file mixing <?php ?> logic into an HTML page — both produce server-rendered HTML as the response. Where they are not alike: PHP is a templating and scripting language, it does not have a component model. React components are reusable units with their own props and, when needed, their own state, and they can also become Client Components that keep running and reacting in the browser after the page loads — updating the screen without a full page reload. Plain PHP + HTML + CSS does not have that second half at all; any change after the page loads needs a new request or separate JavaScript bolted on. So the server-rendering half of the comparison holds up; the component-and-interactivity half is where React (and Next.js Client Components) is doing something PHP was never built to do.",
      "Realising that distinction is what made the App Router's split between Server and Client Components click for me — I go into that properly in the next research post.",
    ],
    author: siteConfig.studentName,
    date: "2026-06-28",
    imageUrl: "/images/posts/rss-education.svg",
    imageAlt:
      "Three content sources connected by lines to a central hub, representing shared logic reused in several places.",
    source: "Build Journal",
    category: "Learning",
  },
  {
    id: 4,
    slug: "nextjs-server-and-client-components",
    title: "Research notes: Next.js Server and Client Components",
    summary:
      "The App Router makes every component a Server Component by default. I read the official docs to understand when a component actually needs to become a Client Component, and why fewer is better.",
    body: [
      "Next.js's own documentation is direct about the default: in the App Router, Server Components are the default, and a file only becomes a Client Component when it is explicitly marked with the \"use client\" directive at the top (Next.js, n.d., nextjs.org/docs/app/getting-started/server-and-client-components). Client Components are needed specifically when a component uses React state or lifecycle hooks (useState, useEffect and similar), event handlers, or browser-only APIs — anything that has to keep running after the page has loaded. Google's own web.dev takes the wider view on why this split exists at all: rendering HTML on the server (or at build time) gets content in front of the user faster and more reliably than shipping JavaScript that has to run first, which is the whole reason server rendering is worth defaulting to (Google, n.d., web.dev/articles/rendering-on-the-web).",
      "The best-practice guidance I found alongside the docs was consistent: minimise Client Components rather than defensively marking large parts of the tree as client-side, and push the 'use client' boundary down to the smallest component that actually needs it rather than the page or layout above it. Marking too much as client-side quietly grows the JavaScript bundle the browser has to download, without any benefit.",
      "This is exactly the rule I followed without having a name for it: in this app, only the theme toggle, the hamburger menu, and the search/feeds view are Client Components — everything else, including the page shells and PostCard's server-rendered structure, stays a Server Component by default. Reading the reasoning after the fact confirmed the instinct was the documented best practice, not luck.",
    ],
    author: siteConfig.studentName,
    date: "2026-06-30",
    imageUrl: "/images/posts/nextjs-boundary.svg",
    imageAlt:
      "A server rack on one side connected by an arrow to a browser window on the other, representing the server/client boundary.",
    source: "Research Notes",
    category: "Research",
    citations: [
      {
        text: "nextjs.org/docs/app/getting-started/server-and-client-components",
        href: "https://nextjs.org/docs/app/getting-started/server-and-client-components",
      },
      { text: "web.dev/articles/rendering-on-the-web", href: "https://web.dev/articles/rendering-on-the-web" },
    ],
  },
  {
    id: 5,
    slug: "learning-git-feature-branches-on-this-project",
    title: "Learning git feature branches on this project",
    summary:
      "I had used GitHub before, but always as one branch. This assessment is where I learned to split work into separate streams per component and merge them back deliberately.",
    body: [
      "I already knew how to use GitHub before this course — commit, push, done. What I had not done before is separate my work into streams: a branch per feature, developed and tested on its own, then merged back rather than everything landing directly on main.",
      "In this repository that looked like feature/layout-shell for the header, footer, nav and hamburger menu; feature/theme-system for the light/dark theming; feature/feeds-pages for the sample content and dynamic routes; feature/interactivity for search and the layout toggle; and feature/a11y-polish for the accessibility pass, plus a couple of smaller fix/ and chore/ branches as things came up. Each one got merged into main with the --no-ff flag, which keeps the merge as its own commit instead of silently folding the branch's history away — that is what makes git log --graph --oneline actually show the shape of the branches instead of one flat line.",
      "The part that changed how I think about building software: a branch is not just a backup, it is a boundary around one decision at a time. I could build the theme system without worrying about half-finished feed code being in the same working tree, and if something in a branch went wrong, main was never broken while I fixed it.",
    ],
    author: siteConfig.studentName,
    date: "2026-07-02",
    imageUrl: "/images/posts/git-branches.svg",
    imageAlt:
      "A simple diagram of a main line with a branch splitting off and merging back in, representing a git feature branch.",
    source: "Build Journal",
    category: "Learning",
  },
  {
    id: 6,
    slug: "wcag-2-2-and-designing-for-accessibility",
    title: "Research notes: WCAG 2.2 and designing for accessibility",
    summary:
      "I read the actual W3C WCAG 2.2 guidelines rather than guessing at 'good practice' — specifically the keyboard focus and contrast requirements — before finishing the accessibility pass on this app.",
    body: [
      "WCAG 2.2 is the current W3C recommendation (published October 2023) for web accessibility, and it adds requirements on top of WCAG 2.1 rather than replacing it (W3C, 2023, w3.org/TR/WCAG22/). Google's web.dev restates the same ground in more practical terms: accessibility means the content is available and its functionality operable 'by literally anyone', organised around four principles — perceivable, operable, understandable, and robust (Google, n.d., web.dev/articles/accessibility). Two requirements from the actual standard stood out as directly relevant to what I was building. First, keyboard operability: all functionality has to be reachable and usable through a keyboard alone, and whatever currently has keyboard focus has to be at least partially visible on screen — not hidden behind another element or scrolled out of view. Second, focus appearance: WCAG 2.2 specifically requires a visible focus indicator with a minimum size and a contrast ratio of at least 3:1 between the focused and unfocused states, which is a more concrete rule than 'add an outline'.",
      "Reading the actual success criteria, rather than a summary of them, changed a couple of things in how I checked my own work. I stopped just clicking through the app with a mouse and did a full keyboard-only pass instead — Tab, Enter, and Escape only, watching where the focus ring landed at every step. I also went back and checked that the hamburger button, being a real <button> with aria-expanded and aria-controls, was announcing its open/closed state correctly rather than just looking right.",
      "This is the research that most directly shaped a real decision in my build: the skip-to-content link as the very first focusable element, the visible focus-ring styling in globals.css, and the prefers-reduced-motion rule that disables the menu and theme transition animations all came from checking this app against WCAG 2.2 directly rather than trusting that it 'looked accessible'.",
    ],
    author: siteConfig.studentName,
    date: "2026-07-05",
    imageUrl: "/images/posts/accessible-content.svg",
    imageAlt:
      "Large readable letters beside light-on-dark and dark-on-light contrast samples.",
    source: "Research Notes",
    category: "Research",
    citations: [
      { text: "w3.org/TR/WCAG22/", href: "https://www.w3.org/TR/WCAG22/" },
      { text: "web.dev/articles/accessibility", href: "https://web.dev/articles/accessibility" },
    ],
  },
  {
    id: 7,
    slug: "solving-the-theme-flash-cookies-and-localstorage",
    title: "Solving the theme flash: cookies and localStorage",
    summary:
      "My dark mode worked the first time I built it, except every reload flashed white before turning dark. Understanding why the server needed to know the theme too — not just the browser — is what fixed it.",
    body: [
      "The first version of my theme toggle only used localStorage: click the button, save 'dark' to the browser's storage, done. It worked while the tab was open, but every hard reload flashed the light theme for a moment before flipping to dark. I did not understand at first why saving the preference had not already fixed that.",
      "The answer came from the Next.js Server/Client Components research above: Next.js renders the page on the server first and sends finished HTML to the browser, and localStorage only exists in the browser — the server has no way to read it while it is building that first HTML response. So the server always renders the default theme, and only after the page arrives and JavaScript runs does the browser correct it to dark, which is the flash. The fix was to also write the choice into a cookie, because a cookie is sent to the server with every request. Now layout.tsx reads that cookie on the server with await cookies() and stamps data-theme=\"dark\" straight onto the <html> tag before any HTML is sent — the first byte the browser receives already carries the right theme.",
      "Every colour in the app is a CSS custom property, so that one data-theme attribute swapping is what repaints the whole page at once, in both directions. This is the single piece of the build I understood most slowly and am now most confident explaining, because I had to actually trace why saving the preference was not enough on its own.",
    ],
    author: siteConfig.studentName,
    date: "2026-07-08",
    imageUrl: "/images/posts/dark-mode.svg",
    imageAlt:
      "A circle split into a light half with sun rays and a dark half with stars, representing light and dark themes.",
    source: "Build Journal",
    category: "Theming",
  },
  {
    id: 8,
    slug: "the-f-pattern-and-how-people-scan-feeds",
    title: "Research notes: the F-pattern and how people scan feeds",
    summary:
      "Nielsen Norman Group's original eye-tracking research shows people scan web content in an F-shaped pattern rather than reading it. I used that to check the Feeds page layout, not just the interactions.",
    body: [
      "Nielsen Norman Group's original 2006 eye-tracking study recorded how users actually looked at web pages and found the dominant pattern traced roughly the shape of the letter F: two horizontal stripes across the top and a bit further down, then a vertical stripe scanning down the left edge (Nielsen Norman Group, 2006, nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/). The reason given is straightforward: people do not read web pages, they scan them, picking up the first few words of a line or heading and deciding whether to keep going.",
      "The practical implication is to put the meaningful words first — in a heading, in a list item, in a card title — because attention drops off sharply as the eye moves right and down the page.",
      "Checking the Feeds page against this after building it, not before, was useful: each PostCard already leads with the title, then date and source, then a short summary, which matches the pattern. What I added because of this research was the search box announcing its result count through an aria-live region and the expand/collapse control on each summary — both let someone scanning the list decide to go deeper without leaving the page, rather than committing to a full click-through on every item that catches their eye.",
    ],
    author: siteConfig.studentName,
    date: "2026-07-11",
    imageUrl: "/images/posts/feed-scanning.svg",
    imageAlt:
      "A wireframe list of posts with a vertical bar tracing an F-shaped scanning pattern.",
    source: "Research Notes",
    category: "Research",
    citations: [
      {
        text: "nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/",
        href: "https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/",
      },
    ],
  },
  {
    id: 9,
    slug: "frontend-first-backend-later-staged-architecture",
    title: "Research notes: frontend-first, backend-later staged architecture",
    summary:
      "Building the whole interface now with sample data, before any backend exists, is not just what the brief asked for — it is a recognised way to stage a build. I looked into why that order works.",
    body: [
      "This assessment's structure — build the full frontend against sample data first, add the real backend in Assessment 2 — is not an unusual constraint invented for a university brief. Google's own Site Reliability Engineering book describes the same instinct at a much larger scale: their Launch Coordination Engineering team has teams launch new products gradually rather than all at once, using a checklist covering architecture, capacity, and failure modes, plus gradual rollouts and feature flags, specifically to keep risk manageable when 'Google sometimes performs up to 70 launches per week' (Google, n.d., Chapter 27: Reliable Product Launches at Scale, sre.google/sre-book/reliable-product-launches/). The scale is completely different, but the reasoning is the same one behind this assessment's structure: prove the smaller, safer piece works before the bigger, riskier piece is switched on.",
      "The trade-off is real, not free: sample data can hide problems a real backend will expose later — pagination, empty states, slow responses, malformed feed items — none of which show up when the data is ten hand-written objects in a TypeScript file.",
      "This is why getPosts() exists as a single function in this app rather than components importing the sample array directly. It is the seam described in this research: everything downstream of that one function — search, the layout toggle, the dynamic [slug] route — was built and tested against sample data, and in Assessment 2 that one function is what gets rewritten against the real RSS backend. No component above it should need to change.",
    ],
    author: siteConfig.studentName,
    date: "2026-07-13",
    imageUrl: "/images/posts/roadmap.svg",
    imageAlt:
      "Four numbered milestones in a row connected by an arrow, representing a staged four-assessment project.",
    source: "Research Notes",
    category: "Research",
    citations: [
      {
        text: "sre.google/sre-book/reliable-product-launches/",
        href: "https://sre.google/sre-book/reliable-product-launches/",
      },
    ],
  },
  {
    id: 10,
    slug: "trade-offs-and-where-this-goes-next",
    title: "Trade-offs and where this goes next",
    summary:
      "Assessment 1 is one stage of four. Reflecting on what I chose to build now, what I deliberately left out, and what has to stay stable for the rest of the project to work.",
    body: [
      "Every decision in this build had to be made knowing three more assessments build on top of it, not just this one. The frontend-first research above is the reason I was comfortable with sample data standing in for real content — the cost is that some backend realities (loading states, errors, pagination) are not tested yet, but the benefit is that navigation, theming, and layout are all proven and stable before the harder backend work starts.",
      "I also chose plain CSS Modules and custom properties over a UI framework like Bootstrap or Tailwind. That was slower to build and means more CSS to maintain, but it demonstrates the actual underlying skills — transforms, media queries, theming with variables — rather than hiding them behind a library, and it means there is no framework dependency to work around when Assessment 2 changes what data flows through these same components.",
      "Looking ahead: Assessment 2 replaces getPosts() with a real RSS-backed function and nothing above that seam should need to change; Assessment 3 will add reporting and data on top of an interface that already has a working search and layout system to extend rather than rebuild; Assessment 4's cloud deployment and performance work benefits from a build that is already component-based and already passes its own automated Playwright suite. None of that was guaranteed by accident — it is the direct result of treating Assessment 1 as the foundation for three more stages, not as a standalone piece of coursework.",
    ],
    author: siteConfig.studentName,
    date: "2026-07-15",
    imageUrl: "/images/posts/signpost.svg",
    imageAlt:
      "A signpost with four numbered markers pointing forward, representing decisions made now shaping the next three assessments.",
    source: "Build Journal",
    category: "Announcements",
  },
];

/** All posts, newest first. */
export function getPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}
