import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3457",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Production build + server: avoids Next's one-dev-server-per-project
    // lock and tests the app as it actually ships.
    command: "npm run build && npm run start -- --port 3457",
    url: "http://localhost:3457",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
