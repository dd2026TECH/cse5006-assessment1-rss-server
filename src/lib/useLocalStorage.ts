"use client";

import { useCallback, useEffect, useState } from "react";

// Hydration-safe localStorage-backed state: the first render (server and
// client) always uses initialValue, then the stored value is applied after
// mount so server and client markup never disagree.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch {
      // Corrupted stored value — keep the initial value.
    }
  }, [key]);

  const setAndPersist = useCallback(
    (next: T) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Storage unavailable (private mode, quota) — state still works.
      }
    },
    [key],
  );

  return [value, setAndPersist] as const;
}
