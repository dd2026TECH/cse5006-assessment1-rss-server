import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import styles from "./feeds.module.css";

export const metadata: Metadata = {
  title: "Feeds",
  description: "Browse blog-style sample posts standing in for RSS content.",
};

export default function FeedsPage() {
  const posts = getPosts();

  return (
    <section>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Feeds" }]}
      />
      <h1>Feeds</h1>
      <p className={styles.lede}>
        Blog-style sample content standing in for RSS feed items until the
        backend arrives in Assessment 2. Newest first.
      </p>
      <ul className={styles.grid}>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
