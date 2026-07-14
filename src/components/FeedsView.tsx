"use client";

import { useState } from "react";
import type { Post } from "@/lib/posts";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { FEED_LAYOUT_KEY, type FeedLayout } from "@/lib/preferences";
import PostCard from "./PostCard";
import styles from "./FeedsView.module.css";

export default function FeedsView({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useLocalStorage<FeedLayout>(
    FEED_LAYOUT_KEY,
    "card",
  );

  const trimmed = query.trim().toLowerCase();
  const filtered = trimmed
    ? posts.filter((post) =>
        [post.title, post.summary, post.source, post.category, post.author]
          .join(" ")
          .toLowerCase()
          .includes(trimmed),
      )
    : posts;

  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <label htmlFor="feed-search" className="sr-only">
            Search posts
          </label>
          <input
            id="feed-search"
            type="search"
            placeholder="Search posts…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className={styles.search}
          />
        </div>
        <div
          className={styles.layoutToggle}
          role="group"
          aria-label="Feed layout"
        >
          <button
            type="button"
            className={styles.toggleButton}
            aria-pressed={layout === "card"}
            onClick={() => setLayout("card")}
          >
            Cards
          </button>
          <button
            type="button"
            className={styles.toggleButton}
            aria-pressed={layout === "list"}
            onClick={() => setLayout("list")}
          >
            List
          </button>
        </div>
      </div>

      <p className={styles.count} role="status">
        {filtered.length === posts.length
          ? `${posts.length} posts`
          : `${filtered.length} of ${posts.length} posts match`}
      </p>

      {filtered.length === 0 ? (
        <p className={styles.empty}>
          No posts match &ldquo;{query}&rdquo;. Try a different search term.
        </p>
      ) : (
        <ul className={layout === "card" ? styles.grid : styles.stack}>
          {filtered.map((post) => (
            <li key={post.id}>
              <PostCard post={post} layout={layout} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
