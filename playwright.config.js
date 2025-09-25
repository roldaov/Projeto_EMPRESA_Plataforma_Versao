const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './Tests',
  /* Run tests in files in parallel */

  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */

  forbidOnly: !!process.env.CI,
  /* Retry on CI only */

  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers: 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  //reporter: [['junit', { outputFile: 'results.xml' }]],
  reporter: [
    ['list'],
    ['junit', { outputFile: 'results.xml' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]    
  ],  
  
  use: {    
    baseURL: 'https://demoqa.com/',    
    headless: true,
    viewport: { width: 1366, height: 768 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 120000,
    ignoreHTTPSErrors: true,
    timeout: 120000,
    globalTimeout: 120000,
   },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1366, height: 768 },
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'], 
        viewport: { width: 1366, height: 768 },
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },

  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  
});
