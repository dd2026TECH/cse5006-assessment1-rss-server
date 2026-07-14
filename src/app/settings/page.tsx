import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Theme and layout preferences.",
};

export default function SettingsPage() {
  return (
    <section>
      <h1>Settings</h1>
      <p>Theme and layout preferences will appear here.</p>
    </section>
  );
}
