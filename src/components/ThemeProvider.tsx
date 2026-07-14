"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// Preference is written to BOTH localStorage and a cookie: localStorage
// survives cookie clearing, while the cookie lets the server render the
// correct theme on first paint (no flash of the wrong theme).
function applyToDom(preference: ThemePreference) {
  const root = document.documentElement;
  if (preference === "system") {
    delete root.dataset.theme;
    localStorage.removeItem("theme");
    document.cookie = "theme=; path=/; max-age=0; samesite=lax";
  } else {
    root.dataset.theme = preference;
    localStorage.setItem("theme", preference);
    document.cookie = `theme=${preference}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
  }
}

export function ThemeProvider({
  initialTheme,
  children,
}: {
  /** Explicit theme read from the cookie during server render, if any. */
  initialTheme: "light" | "dark" | null;
  children: React.ReactNode;
}) {
  const [preference, setPreferenceState] = useState<ThemePreference>(
    initialTheme ?? "system",
  );
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);

  // Track the OS-level preference so "system" resolves correctly and
  // live-updates if the OS theme changes while the app is open.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemTheme(mq.matches ? "dark" : "light");
    update();
    setMounted(true);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // If the cookie was cleared but localStorage survived, restore from it.
  useEffect(() => {
    if (initialTheme) return;
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      applyToDom(stored);
      setPreferenceState(stored);
    }
  }, [initialTheme]);

  const setPreference = useCallback((next: ThemePreference) => {
    applyToDom(next);
    setPreferenceState(next);
  }, []);

  const resolvedTheme = preference === "system" ? systemTheme : preference;

  return (
    <ThemeContext.Provider
      value={{ preference, resolvedTheme, setPreference, mounted }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return context;
}
