import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.siteName} · ${siteConfig.assessmentTitle}`,
    template: `%s · ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Reading the theme cookie here lets the server render the correct theme
  // on first paint — no flash of the wrong theme on reload.
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const initialTheme =
    themeCookie === "light" || themeCookie === "dark" ? themeCookie : null;

  return (
    <html
      lang="en"
      data-theme={initialTheme ?? undefined}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <ThemeProvider initialTheme={initialTheme}>
          <a className="skip-link" href="#main">
            Skip to main content
          </a>
          <Header />
          <main id="main" className="container main-content">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
