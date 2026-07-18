import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./page.module.css";

const pageLinks = [
  {
    href: "/about",
    title: "About",
    text: "What this project is, where it is heading, and a video showing how to use the site.",
  },
  {
    href: "/feeds",
    title: "Feeds",
    text: "Browse blog-style sample posts standing in for RSS content — search, scan and read.",
  },
  {
    href: "/settings",
    title: "Settings",
    text: "Switch between light and dark themes and set your preferred feed layout.",
  },
];

const workflow = [
  {
    step: 1,
    title: "Source",
    text: "The RSS Server collects content from external RSS feeds (backend arrives in Assessment 2).",
  },
  {
    step: 2,
    title: "Organise",
    text: "Feed items are normalised into posts with titles, dates and summaries, ready for scanning.",
  },
  {
    step: 3,
    title: "Deliver",
    text: "Organised content is surfaced to learners inside the LMS through this interface.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1>{siteConfig.siteName} frontend</h1>
        <p className={styles.lede}>{siteConfig.description}</p>
        <div className={styles.actions}>
          <Link href="/feeds" className={styles.primaryCta}>
            Browse feeds
          </Link>
          <Link href="/about" className={styles.secondaryCta}>
            About the project
          </Link>
        </div>
      </section>

      <section aria-labelledby="explore-heading" className={styles.section}>
        <h2 id="explore-heading">Explore</h2>
        <ul className={styles.cardGrid}>
          {pageLinks.map(({ href, title, text }) => (
            <li key={href}>
              <Link href={href} className={styles.card}>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className={styles.cardCue} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="workflow-heading" className={styles.section}>
        <h2 id="workflow-heading">How the RSS Server will work</h2>
        <p className={styles.sectionLede}>
          Assessment 1 builds the interface; the pipeline below shows how
          content will flow from RSS feeds into the LMS as later assessments
          add the backend.
        </p>
        <ol className={styles.workflow}>
          {workflow.map(({ step, title, text }) => (
            <li key={step} className={styles.workflowStep}>
              <span className={styles.stepBadge} aria-hidden="true">
                {step}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
