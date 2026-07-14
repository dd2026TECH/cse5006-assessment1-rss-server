import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feeds",
  description: "Browse blog-style sample posts standing in for RSS content.",
};

export default function FeedsPage() {
  return (
    <section>
      <h1>Feeds</h1>
      <p>Sample posts will appear here.</p>
    </section>
  );
}
