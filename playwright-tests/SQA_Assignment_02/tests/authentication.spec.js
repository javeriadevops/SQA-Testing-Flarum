require('dotenv').config();
const { test, expect } = require('@playwright/test');

test('TC-02: Login dialog opens successfully', async ({ page }) => {

  // Open Flarum homepage
  await page.goto('http://127.0.0.1:8000/');

  // Click Log In
  await page.getByRole('button', { name: 'Log In' }).click();

  // Check login dialog
  const loginDialog = page.locator('.LogInModal');

  await expect(loginDialog).toBeVisible();

  // Check username and password fields
  await expect(
    loginDialog.locator('input[name="identification"]')
  ).toBeVisible();

  await expect(
    loginDialog.locator('input[name="password"]')
  ).toBeVisible();

});


test('TC-03: Invalid login credentials are rejected', async ({ page }) => {

  await page.goto('http://127.0.0.1:8000/');

  // Open login dialog
  await page.getByRole('button', { name: 'Log In' }).click();

  const loginDialog = page.locator('.LogInModal');

  // Enter incorrect credentials
  await loginDialog.locator('input[name="identification"]')
    .fill('wronguser123');

  await loginDialog.locator('input[name="password"]')
    .fill('WrongPassword123!');

  // Submit login form
  await loginDialog.locator('button[type="submit"]').click();

  // Login dialog should remain open
  await expect(loginDialog).toBeVisible();

  // Error message should appear
  await expect(loginDialog.locator('.Alert--error')).toBeVisible();

});


test('TC-04: Valid login succeeds', async ({ page }) => {

  await page.goto('http://127.0.0.1:8000/');

  // Open login dialog
  await page.getByRole('button', { name: 'Log In' }).click();

  const loginDialog = page.locator('.LogInModal');

  // Enter valid credentials from .env
  await loginDialog.locator('input[name="identification"]')
    .fill(process.env.FLARUM_USERNAME);

  await loginDialog.locator('input[name="password"]')
    .fill(process.env.FLARUM_PASSWORD);

  // Submit login
  await loginDialog.locator('button[type="submit"]').click();

  // Login dialog should close
  await expect(loginDialog).toBeHidden();

  // Logged-in username should appear
  await expect(
    page.getByText(process.env.FLARUM_USERNAME).first()
  ).toBeVisible();

});
