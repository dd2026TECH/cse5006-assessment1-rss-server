"use client";

import { useTheme, type ThemePreference } from "./ThemeProvider";
import styles from "./ThemeSettings.module.css";

const options: Array<{
  value: ThemePreference;
  label: string;
  description: string;
}> = [
  {
    value: "light",
    label: "Light",
    description: "Bright surfaces, best in well-lit spaces.",
  },
  {
    value: "dark",
    label: "Dark",
    description: "Low-glare surfaces, easier on the eyes at night.",
  },
  {
    value: "system",
    label: "System default",
    description: "Follow your device's appearance setting.",
  },
];

export default function ThemeSettings() {
  const { preference, setPreference, resolvedTheme, mounted } = useTheme();

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Theme</legend>
      <div className={styles.options}>
        {options.map(({ value, label, description }) => (
          <label
            key={value}
            className={`${styles.option} ${
              preference === value ? styles.selected : ""
            }`}
          >
            <input
              type="radio"
              name="theme"
              value={value}
              checked={preference === value}
              onChange={() => setPreference(value)}
              className={styles.radio}
            />
            <span className={styles.optionLabel}>{label}</span>
            <span className={styles.optionDescription}>{description}</span>
          </label>
        ))}
      </div>
      <p className={styles.note}>
        Your choice is saved in this browser (localStorage and a cookie), so
        it persists across visits.
        {mounted && preference === "system"
          ? ` Currently following your device: ${resolvedTheme}.`
          : ""}
      </p>
    </fieldset>
  );
}
