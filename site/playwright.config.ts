import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: { baseURL: "http://127.0.0.1:4173", trace: "off" },
  webServer: {
    command: "npx --yes serve out -l 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 60000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
