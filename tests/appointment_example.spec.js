// Import modules
import { test, expect } from '@playwright/test'; // Import necessary functions from Playwright Test
import path from 'path'; // Import the 'path' module from Node.js
const { allure } = require('allure-playwright'); // Import the allure module
import { LOGIN } from '../lib/functions.js';
import { CONST_LOGIN_USERNAME, CONST_LOGIN_PASSWORD, CONST_ID_BUTTON_MAKE, CONST_ID_HEADER_MAKEAPPOINTMENT,
  CONST_ID_DROPDOWN_FACILITY, CONST_ID_CHECKBOX_HOSPITALREADMISSION, CONST_ID_RADIOBUTTON_MEDICARE, CONST_ID_DATE_VISITDATE,
  CONST_ID_FIELD_COMMENT, CONST_ID_BUTTON_BOOKAPPOINTMENT } from '../lib/constants.js';

// Define the path to the screenshots folder relative to the current script's location
const screenshotsFolder = path.join(__dirname, '..', 'screenshots');

// Define a test to make an appointment
test.describe(`Demo - Herokuapp`, () => {
  test.beforeEach(async ({ page }, testInfo) => {
      try {
          console.log(`START -> ${testInfo.title}`);
          // Navigate to the web application
          await page.goto('https://katalon-demo-cura.herokuapp.com/');
      } catch (error) {
          console.error(error);
          throw error;
      }
  });

  test.afterEach(async ({ page }, testInfo) => {
      try {
          // Closes the browser
          //await browser.close();
          console.log(`DONE -> ${testInfo.title}`);
          console.log(`Test results -> ${testInfo.status}`);
      } catch (error) {
          console.error(error);
          throw error;
      }
  });

  test('Make appointment', async ({ page }) => {
    await test.step('Navigate to the web page', async () => {
      // Navigate to the web application
      await page.goto('https://katalon-demo-cura.herokuapp.com/');
    });

    await test.step('Step 1: Enter credentials and login', async () => {
      // Click on the "Make Appointment" button
      await page.click(CONST_ID_BUTTON_MAKE);

      // Type the username and password with the values "John Doe" and "ThisIsNotAPassword" and then click the "Login" button
      await LOGIN(page);

      // Validate that the "Make Appointment" header is visible on the page
      expect(await page.isVisible(CONST_ID_HEADER_MAKEAPPOINTMENT)).toBeTruthy();

      // Take a screenshot after logging in
      const loginScreenshot = await page.screenshot();
      await allure.attachment('Logged In', loginScreenshot, 'image/png');
    });

    await test.step('Step 2: Fill out the relevant fields and book appointment', async () => {
      // Select the "Hongkong CURA Healthcare Center" option from the dropdown
      await page.selectOption(CONST_ID_DROPDOWN_FACILITY, { label: 'Hongkong CURA Healthcare Center' });

      // Check the checkbox Apply for hospotal readmission
      await page.check(CONST_ID_CHECKBOX_HOSPITALREADMISSION);

      // Click the radio button Medicaid
      await page.click(CONST_ID_RADIOBUTTON_MEDICARE);

      // Fill out the date field with today's date
      const formattedDate = new Date().toLocaleDateString('en-GB'); // Get today's date and format it as dd/mm/yyyy
      await page.fill(CONST_ID_DATE_VISITDATE, formattedDate);
      await page.press(CONST_ID_DATE_VISITDATE, 'Enter');

      // Fill out the comment section with the message 'This is a test'
      await page.fill(CONST_ID_FIELD_COMMENT, 'This is a test');

      // Click on the "Book Appointment" button
      await page.click(CONST_ID_BUTTON_BOOKAPPOINTMENT);

      // Take a screenshot to confirm appointment
      const appointmentConfirmationScreenshot = await page.screenshot();
      await allure.attachment('Appointment Confirmation', appointmentConfirmationScreenshot, 'image/png');
    });
  });
});