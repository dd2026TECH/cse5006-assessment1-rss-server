// Sample content standing in for RSS feed items (Assessment 1 is frontend
// only). The shape follows the blog structure from the Module 4 labs
// (id, title, description→summary, author, date, imageUrl).
// Everything reads through getPosts()/getPostBySlug() — in Assessment 2
// these functions will be reimplemented against the real RSS backend
// without any component changes.

import { siteConfig } from "./siteConfig";

export type PostCategory =
  | "Announcements"
  | "Guides"
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
    slug: "designing-accessible-course-content",
    title: "Designing accessible course content",
    summary:
      "Practical WCAG-informed habits for course authors: semantic structure, real headings, sufficient contrast, and text alternatives that actually describe things.",
    body: [
      "Accessibility work is most effective when it starts at the authoring stage rather than being retrofitted. Semantic structure is the foundation: real headings in a logical order, lists marked up as lists, and links whose text says where they go.",
      "Colour contrast is the next quick win. Body text should reach at least a 4.5:1 ratio against its background, and information should never be carried by colour alone — pair it with text or icons.",
      "Finally, every image needs a text alternative written for the person who cannot see it. Describe what the image communicates, not what it looks like. A chart's alt text should state the finding, not 'a bar chart'.",
    ],
    author: "A. Reyes",
    date: "2026-07-08",
    imageUrl: "/images/posts/accessible-content.svg",
    imageAlt:
      "Large readable letters beside light-on-dark and dark-on-light contrast samples.",
    source: "EdTech Weekly",
    category: "Guides",
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
    slug: "getting-started-with-dark-mode",
    title: "Getting started with dark mode in web apps",
    summary:
      "Dark mode done properly is a design system exercise, not a colour swap. Custom properties, prefers-color-scheme, and persistence are the three pieces that matter.",
    body: [
      "The teams that ship maintainable dark modes all do the same thing: they stop hard-coding colours. Every surface, border and text colour becomes a custom property, and the theme is just a different set of values for the same names.",
      "Respecting the operating system preference via prefers-color-scheme is the polite default for first-time visitors. But the moment a user picks a theme explicitly, that choice should win — and it should survive a reload.",
      "Persistence is where server-rendered apps earn their polish. Storing the choice where the server can read it means the very first byte of HTML already carries the right theme, and the dreaded flash of the wrong mode never happens.",
    ],
    author: "S. Okafor",
    date: "2026-07-02",
    imageUrl: "/images/posts/dark-mode.svg",
    imageAlt:
      "A circle split into a light half with sun rays and a dark half with stars, representing light and dark themes.",
    source: "Frontend Notes",
    category: "Guides",
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
    slug: "structuring-feeds-for-quick-scanning",
    title: "Structuring feeds for quick scanning",
    summary:
      "Users scan lists in an F-pattern and decide in seconds. Front-load titles, keep summaries under three lines, and make dates and sources instantly visible.",
    body: [
      "Eye-tracking research is consistent: users scan content lists rather than reading them, following an F-shaped pattern down the left edge. The first two or three words of each title carry most of the decision weight.",
      "For feed interfaces this suggests concrete rules. Front-load titles with the meaningful words. Keep summaries to two or three lines so several items fit on screen. Show the date and source at a glance, because recency and origin drive the read-or-skip decision.",
      "Interaction design matters too: an expandable summary lets users triage without leaving the list, and a clear read-more affordance signals that depth is one click away. The list is the product — treat it that way.",
    ],
    author: "M. Tran",
    date: "2026-06-24",
    imageUrl: "/images/posts/feed-scanning.svg",
    imageAlt:
      "A wireframe list of posts with a vertical bar tracing an F-shaped scanning pattern.",
    source: "UX in Education",
    category: "Research",
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
