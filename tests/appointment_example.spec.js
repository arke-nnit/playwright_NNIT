// @ts-check
const { test, expect } = require('@playwright/test'); // Import necessary functions from Playwright Test
const path = require('path'); // Import the 'path' module from Node.js

// Define the path to the screenshots folder relative to the current script's location
const screenshotsFolder = path.join(__dirname, '..', 'screenshots');

// Define a test to make an appointment
test('Make appointment', async ({ page }) => {
  await test.step('Navigate to the web page', async () => {
    // Navigate to the web application
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
  });

  await test.step('Enter credentials and login', async () => {
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

    // Take a screenshot after logging in
    await page.screenshot({ path: path.join(screenshotsFolder, 'loggedIn.png') });
  });

  await test.step('Fill out the relevant fields and book appointment', async () => {
    // Select the "Hongkong CURA Healthcare Center" option from the dropdown
    await page.selectOption('#combo_facility', { label: 'Hongkong CURA Healthcare Center' });

    // Check the checkbox Apply for hospotal readmission
    await page.check('#chk_hospotal_readmission');

    // Click the radio button Medicaid
    await page.click('#radio_program_medicaid');

    // Fill out the date field with today's date
    const formattedDate = new Date().toLocaleDateString('en-GB'); // Get today's date and format it as dd/mm/yyyy
    await page.fill('#txt_visit_date', formattedDate);
    await page.press('#txt_visit_date', 'Enter');

    // Fill out the comment section with the message 'This is a test'
    await page.fill('#txt_comment', 'This is a test');

    // Click on the "Book Appointment" button
    await page.click('#btn-book-appointment');

    // Take a screenshot to confirm appointment
    await page.screenshot({ path: path.join(screenshotsFolder, 'appointmentConfirmation.png') });
  });
});
