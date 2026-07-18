import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "What the RSS Server project is, its current frontend-only scope, and where it is heading.",
};

export default function AboutPage() {
  return (
    <article className={styles.about}>
      <h1>About this project</h1>

      <section aria-labelledby="what-heading" className={styles.section}>
        <h2 id="what-heading">What it is</h2>
        <p>
          This application is the frontend for an <strong>RSS Server</strong>:
          a system that collects content from RSS feeds, organises it into
          readable posts, and delivers it to learners through a Learning
          Management System (LMS). The interface focuses on making feed
          content easy to navigate, scan, and read on any device.
        </p>
      </section>

      <section aria-labelledby="scope-heading" className={styles.section}>
        <h2 id="scope-heading">Current scope</h2>
        <p className={styles.callout}>
          <strong>Assessment 1 is frontend only.</strong> No RSS content is
          fetched and no backend processing happens yet — the posts on the
          Feeds page are blog-style sample content standing in for real feed
          data.
        </p>
        <p>
          In Assessment 2, the server component is introduced and the
          application gains the ability to accept and process live RSS
          content. The Feeds page already reads its data through a single
          access function, so swapping in the real backend will not require
          interface changes. Later assessments connect the pipeline through to
          the LMS.
        </p>
      </section>

      <section aria-labelledby="build-heading" className={styles.section}>
        <h2 id="build-heading">How it was built</h2>
        <p>
          The interface is a Next.js App Router application built from small,
          reusable components — header, footer, navigation, post cards —
          backed by a typed data layer. Each capability (layout, theming, the
          feeds pages, interactivity, accessibility, automated tests) was
          developed on its own git branch, tested, and merged into a clean{" "}
          <code>main</code>, so the commit history traces the build
          step by step.
        </p>
        <p>
          <a
            href="https://github.com/dd2026TECH/cse5006-assessment1-rss-server"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the source and full commit history on GitHub
          </a>
          .
        </p>
      </section>

      <section aria-labelledby="video-heading" className={styles.section}>
        <h2 id="video-heading">How to use this website</h2>
        <p>
          The short video below walks through the site: navigating between
          pages, switching themes, and browsing the feeds.
        </p>
        <video
          className={styles.video}
          controls
          preload="metadata"
          aria-label="Video walkthrough of how to use this website"
        >
          <source src="/videos/how-to.mp4" type="video/mp4" />
          Your browser does not support embedded video. The walkthrough video
          is available at /videos/how-to.mp4.
        </video>
      </section>

      <section aria-labelledby="author-heading" className={styles.section}>
        <h2 id="author-heading">Author</h2>
        <dl className={styles.authorCard}>
          <div>
            <dt>Name</dt>
            <dd>{siteConfig.studentName}</dd>
          </div>
          <div>
            <dt>Student number</dt>
            <dd>{siteConfig.studentId}</dd>
          </div>
          <div>
            <dt>Assessment</dt>
            <dd>{siteConfig.assessmentTitle}</dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
