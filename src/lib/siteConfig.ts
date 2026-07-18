// Single source of truth for identity and navigation.
// Header, Footer, About and metadata all read from here.

export const siteConfig = {
  siteName: "RSS Server",
  assessmentTitle: "CSE5006 Assessment 1 — Frontend Design & Usability",
  studentName: "Xueting Denise Chin",
  studentId: "22663637",
  description:
    "A usability-focused frontend for an RSS Server feeding into an LMS. Assessment 1 covers the user interface only; backend feed processing arrives in Assessment 2.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/feeds", label: "Feeds" },
    { href: "/about", label: "About" },
    { href: "/settings", label: "Settings" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
