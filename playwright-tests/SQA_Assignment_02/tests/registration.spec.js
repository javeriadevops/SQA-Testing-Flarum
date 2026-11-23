
const { test, expect } = require('@playwright/test');

test('TC-05: Registration form opens successfully', async ({ page }) => {

  // Open Flarum homepage
  await page.goto('http://127.0.0.1:8000/');

  // Click Sign Up
  await page.getByRole('button', { name: 'Sign Up' }).click();

  // Check registration form
  const signupDialog = page.locator('.SignUpModal');

  await expect(signupDialog).toBeVisible();

  // Check required fields
  await expect(
    signupDialog.locator('input[name="username"]')
  ).toBeVisible();

  await expect(
    signupDialog.locator('input[name="email"]')
  ).toBeVisible();

  await expect(
    signupDialog.locator('input[name="password"]')
  ).toBeVisible();

});


test('TC-06: Registration rejects invalid email', async ({ page }) => {

  await page.goto('http://127.0.0.1:8000/');

  // Open registration form
  await page.getByRole('button', { name: 'Sign Up' }).click();

  const signupDialog = page.locator('.SignUpModal');

  // Enter registration details
  await signupDialog.locator('input[name="username"]')
    .fill('testuser123');

  await signupDialog.locator('input[name="email"]')
    .fill('invalidemail');

  await signupDialog.locator('input[name="password"]')
    .fill('TestPassword123!');

  // Check email validation
  const emailField = signupDialog.locator('input[name="email"]');

  const isValid = await emailField.evaluate(
    (input) => input.checkValidity()
  );

  expect(isValid).toBe(false);

});


test('TC-07: User registers with valid details', async ({ page }) => {

  await page.goto('http://127.0.0.1:8000/');

  // Open registration form
  await page.getByRole('button', { name: 'Sign Up' }).click();

  const signupDialog = page.locator('.SignUpModal');

  // Generate unique username and email
  const uniqueId = Date.now();
  const username = `testuser${uniqueId}`;
  const email = `test${uniqueId}@example.com`;

  // Fill registration form
  await signupDialog.locator('input[name="username"]')
    .fill(username);

  await signupDialog.locator('input[name="email"]')
    .fill(email);

  await signupDialog.locator('input[name="password"]')
    .fill('TestPassword123!');

  // Submit registration
  await signupDialog.locator('button[type="submit"]').click();

  // Registration dialog should close
  await expect(signupDialog).toBeHidden();

  // Check new user is logged in
  await expect(page.getByText(username).first()).toBeVisible();

});
