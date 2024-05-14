// @ts-check
const { test, expect } = require('@playwright/test'); // Import necessary functions from Playwright Test
const path = require('path'); // Import the 'path' module from Node.js

// Define the path to the screenshots folder relative to the current script's location
const screenshotsFolder = path.join(__dirname, '..', 'screenshots');

// Test: Ensure the page has a title containing the word 'Playwright'
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/'); // Navigate to the Playwright website

  // Expect the title of the page to contain the word 'Playwright'
  await expect(page).toHaveTitle(/Playwright/);

  // Capture a screenshot of the page and save it to the 'has_title.png' file in the screenshots folder
  await page.screenshot({ path: path.join(screenshotsFolder, 'has_title.png') });
});

// Test: Click the 'Get started' link and ensure the Installation heading is visible
test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/'); // Navigate to the Playwright website

  // Click the 'Get started' link on the page
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expect the page to have a heading with the name 'Installation' visible
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  // Capture a screenshot of the page and save it to the 'get_started_link.png' file in the screenshots folder
  await page.screenshot({ path: path.join(screenshotsFolder, 'get_started_link.png') });
});
