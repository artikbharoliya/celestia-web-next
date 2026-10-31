const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/ui",
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure" },
  projects: [
    {
      name: "desktop",
      use: { browserName: "chromium", viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "tablet",
      use: {
        browserName: "chromium",
        viewport: { width: 834, height: 1112 },
        hasTouch: true,
      },
    },
    {
      name: "mobile",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 120000,
    env: {
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "browser-test-site-key",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
});
