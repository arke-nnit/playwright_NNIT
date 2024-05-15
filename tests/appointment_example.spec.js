// @ts-check
const { test, expect } = require('@playwright/test'); // Import necessary functions from Playwright Test
const path = require('path'); // Import the 'path' module from Node.js

// Define the path to the screenshots folder relative to the current script's location
const screenshotsFolder = path.join(__dirname, '..', 'screenshots');

// Define a test to make an appointment
test('make appointment', async ({ page }) => {
  // Navigate to the URL of the web application
  await page.goto('https://katalon-demo-cura.herokuapp.com/');

  // Click on the "Make Appointment" button
  await page.click('#btn-make-appointment');

  // Fill the Username input field with the value "John Doe"
  await page.fill('#txt-username', 'John Doe');
  
  // Fill the Password input field with the value "ThisIsNotAPassword"
  await page.fill('#txt-password', 'ThisIsNotAPassword');

  // Click on the "Login" button
  await page.click('#btn-login');

  // Assert that the "Make Appointment" header is visible on the page
  expect(await page.isVisible('h2:has-text("Make Appointment")')).toBeTruthy();

  // Take a screenshot after logging in and save it to the 'loggedin.png' file in the screenshots folder
  await page.screenshot({ path: path.join(screenshotsFolder, 'loggedin.png') });
});
