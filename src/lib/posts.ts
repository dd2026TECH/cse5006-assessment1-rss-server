// Sample content standing in for RSS feed items (Assessment 1 is frontend
// only). The shape follows the blog structure from the Module 4 labs
// (id, title, description→summary, author, date, imageUrl).
// Everything reads through getPosts()/getPostBySlug() — in Assessment 2
// these functions will be reimplemented against the real RSS backend
// without any component changes.

import { siteConfig } from "./siteConfig";

export type PostCategory =
  | "Announcements"
  | "Theming"
  | "Interactivity"
  | "Accessibility"
  | "Research"
  | "Community";

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
};

const posts: Post[] = [
  {
    id: 1,
    slug: "welcome-to-the-rss-server-project",
    title: "Welcome to the RSS Server project",
    summary:
      "An introduction to this project: a server that collects RSS content and delivers it to learners through an LMS, starting with the interface you are using right now.",
    body: [
      "This project builds an RSS Server that feeds curated content into a Learning Management System. The goal is simple: learners should not have to chase content scattered across the web — the content should come to them, organised and readable, inside the environment where they already study.",
      "Assessment 1 delivers the frontend you are looking at: navigation, themes, responsive layout, and this Feeds view. The posts shown here are sample content that stands in for live RSS items while the backend does not exist yet.",
      "In the next stage, the server component arrives and this page will begin displaying real syndicated content. Because the interface already reads posts through a single data function, that switch will happen without redesigning any screens.",
    ],
    author: siteConfig.studentName,
    date: "2026-07-10",
    imageUrl: "/images/posts/rss-server.svg",
    imageAlt:
      "An RSS feed icon sending content to a screen that represents the LMS.",
    source: "Project Blog",
    category: "Announcements",
  },
  {
    id: 2,
    slug: "accessibility-as-engineering-not-garnish",
    title: "Accessibility as engineering, not garnish",
    summary:
      "How I built accessibility into this interface from the start instead of bolting it on: semantic landmarks, a skip link, a real button with aria-expanded, keyboard operability, and WCAG AA contrast in both themes.",
    body: [
      "When I started Assessment 1 I decided accessibility would be part of each feature rather than a final polish pass — that turned out to be the easier path, not the harder one. The page is built from semantic landmarks (header, nav, main, footer) so assistive technology can jump straight to a region, and the first thing the keyboard reaches is a skip-to-content link.",
      "The hamburger menu was where it clicked for me. It is a real button, not a styled div, with aria-expanded and aria-controls so screen readers announce whether it is open, and it closes on Escape and on navigation. I tested the whole site with the mouse unplugged: every control is reachable and operable by keyboard, with a visible focus ring on each one.",
      "I checked colour contrast in both light and dark themes and kept body text above the 4.5:1 WCAG AA ratio, and I added a prefers-reduced-motion rule so the animations disable for anyone who asks the system for less motion. The same discipline will carry into Assessment 2 — when real RSS content arrives, it inherits an interface that is already accessible.",
    ],
    author: siteConfig.studentName,
    date: "2026-07-09",
    imageUrl: "/images/posts/accessible-content.svg",
    imageAlt:
      "Large readable letters beside light-on-dark and dark-on-light contrast samples.",
    source: "Build Journal",
    category: "Accessibility",
  },
  {
    id: 3,
    slug: "why-rss-still-matters-for-education",
    title: "Why RSS still matters for education",
    summary:
      "Algorithmic feeds decide for you; RSS lets institutions decide deliberately. A look at why syndication remains the most dependable pipe for course-relevant content.",
    body: [
      "RSS predates the social web, yet it solves a problem social platforms have made worse: getting the content you chose, in the order it was published, without an engagement algorithm in between.",
      "For education this reliability is the whole point. A course coordinator can curate exactly which sources reach students — journal alerts, institutional news, industry blogs — and trust that nothing is being reordered or hidden.",
      "Combined with an LMS, syndication becomes a distribution system: one place where curated external content appears alongside course material, with the same look, the same accessibility standards, and no extra accounts required.",
    ],
    author: "L. Novak",
    date: "2026-07-05",
    imageUrl: "/images/posts/rss-education.svg",
    imageAlt:
      "Three content sources connected by lines to a central RSS hub.",
    source: "Open Learning Digest",
    category: "Research",
  },
  {
    id: 4,
    slug: "building-a-dark-mode-that-never-flashes",
    title: "Building a dark mode that never flashes",
    summary:
      "How I built the light and dark themes for this app: every colour is a CSS variable switched by one data-theme attribute, and the choice is saved in a cookie so the server renders the right theme with no flash on reload.",
    body: [
      "My first decision was to stop putting colours inside components. Every surface, border and text colour in this app is a CSS custom property, and a theme is just a different set of values for those same names. Stamping data-theme=\"dark\" onto the root element swaps the whole palette at once — no component knows or cares which theme is active.",
      "The hard part was the flash. Because Next.js renders on the server first, a purely client-side theme shows a flash of the wrong colour on every reload while the JavaScript catches up. I fixed it by saving the choice in a cookie as well as localStorage: the server reads the cookie during render, so the very first HTML it sends already carries the right theme. On a first visit, with no choice made yet, the app follows the operating-system preference via prefers-color-scheme.",
      "This is the piece of the build I am most proud of, because it is invisible when it works. It also sets up Assessment 2 nicely — the theming is data-driven and component-agnostic, so real RSS content will drop into an interface that already themes itself correctly.",
    ],
    author: siteConfig.studentName,
    date: "2026-07-03",
    imageUrl: "/images/posts/dark-mode.svg",
    imageAlt:
      "A circle split into a light half with sun rays and a dark half with stars, representing light and dark themes.",
    source: "Build Journal",
    category: "Theming",
  },
  {
    id: 5,
    slug: "community-spotlight-student-built-lms-tools",
    title: "Community spotlight: student-built LMS tools",
    summary:
      "Three student projects that extend their university LMS — a deadline aggregator, a reading-list exporter, and a peer-study matcher — and what they share.",
    body: [
      "Some of the most useful LMS features were never shipped by a vendor. This month we look at three student-built tools that grew out of the same frustration: information that existed but was hard to reach.",
      "A deadline aggregator pulls due dates from every enrolled course into one calendar feed. A reading-list exporter turns weekly modules into a clean citation file. A peer-study matcher connects students revising the same topic in the same week.",
      "The common thread is syndication: each tool works by consuming structured feeds rather than scraping pages. When systems publish their data properly, small focused tools can flourish around them.",
    ],
    author: "Campus Dev Hub Editors",
    date: "2026-06-28",
    imageUrl: "/images/posts/community-tools.svg",
    imageAlt:
      "Dots of different sizes joined into a network, representing a community of student developers.",
    source: "Campus Dev Hub",
    category: "Community",
  },
  {
    id: 6,
    slug: "designing-this-feeds-view-for-fast-scanning",
    title: "Designing this Feeds view for fast scanning",
    summary:
      "How I built the Feeds page you are reading: a live search that filters as you type and announces the result count, a card and list layout toggle that remembers your choice, and summaries you can expand in place — all reading through a single data function.",
    body: [
      "The Feeds page is the heart of the app, so I built it for scanning rather than reading. Each card front-loads the title, then the date, source and author, then a short summary — because recency and origin are what drive the decision to read or skip. Users scan lists in an F-shaped pattern, so the meaningful words go first.",
      "Then I layered on the interactions. A search box filters the posts as you type and announces how many match through an aria-live region, so screen-reader users hear the count change. A card-versus-list toggle lets you pick the density you prefer, and that choice is saved to localStorage so it survives a reload. Each summary can be expanded and collapsed in place, letting you triage many items without leaving the list.",
      "The detail behind all of this is that the page never touches the sample data directly — it calls getPosts() from one module. That is deliberate: in Assessment 2 I reimplement that single function against the real RSS backend, and this whole view keeps working without a component change. The interactivity I built here is exactly what an RSS reader needs.",
    ],
    author: siteConfig.studentName,
    date: "2026-07-06",
    imageUrl: "/images/posts/feed-scanning.svg",
    imageAlt:
      "A wireframe list of posts with a vertical bar tracing an F-shaped scanning pattern.",
    source: "Build Journal",
    category: "Interactivity",
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
