import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";
import styles from "./PostCard.module.css";

const categoryStyles: Record<Post["category"], string> = {
  Announcements: styles.announcements,
  Guides: styles.guides,
  Research: styles.research,
  Community: styles.community,
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className={styles.card}>
      <p className={`${styles.banner} ${categoryStyles[post.category]}`}>
        {post.category}
      </p>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link href={`/feeds/${post.slug}`} className={styles.titleLink}>
            {post.title}
          </Link>
        </h3>
        <p className={styles.meta}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          {post.source}
        </p>
        <p className={styles.summary}>{post.summary}</p>
        <Link href={`/feeds/${post.slug}`} className={styles.readMore}>
          Read more
          <span className="sr-only">: {post.title}</span>
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </article>
  );
}
