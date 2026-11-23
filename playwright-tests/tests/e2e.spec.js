const { test, expect } = require('@playwright/test');
require('dotenv').config();

test('TC-16: Complete user journey', async ({ page }) => {

  const baseURL = 'http://127.0.0.1:8000';

  const title = `E2E Discussion ${Date.now()}`;
  const replyText = `E2E Reply ${Date.now()}`;

  // Step 1: Open forum
  await page.goto(baseURL);

  await expect(
    page.getByRole('heading', {
      name: 'Welcome to SQA Testing Forum'
    })
  ).toBeVisible();

  // Step 2: Login
  await page.getByRole('button', {
    name: 'Log In'
  }).click();

  await page.locator('input[name="identification"]')
    .fill(process.env.FLARUM_USERNAME);

  await page.locator('input[name="password"]')
    .fill(process.env.FLARUM_PASSWORD);

  await page.getByRole('button', {
    name: 'Log In'
  }).last().click();

  await expect(
    page.getByRole('button', {
      name: 'Toggle session options dropdown menu'
    })
  ).toBeVisible();

  // Step 3: Create discussion
  await page.getByRole('button', {
    name: 'Start a Discussion'
  }).click();

  await page.getByRole('textbox', {
    name: 'Discussion Title'
  }).fill(title);

  await page.getByRole('textbox', {
    name: 'Write a Post...'
  }).fill(
    'This discussion was created during the end-to-end test.'
  );

  // Step 4: Select General tag
  await page.getByRole('button', {
    name: 'Choose Tags'
  }).click();

  const tagDialog = page.locator('.TagSelectionModal');

  await expect(tagDialog).toBeVisible();

  await tagDialog.getByText('General', {
    exact: true
  }).click();

  await tagDialog.getByRole('button', {
    name: /OK|Apply|Choose Tags|Submit|Confirm/i
  }).click();

  await expect(tagDialog).toBeHidden();

  // Step 5: Publish discussion
  await page.getByRole('button', {
    name: 'Post Discussion'
  }).click();

  await expect(page).toHaveURL(/\/d\/\d+/, {
    timeout: 15000
  });

  await expect(
    page.getByRole('heading', {
      name: title,
      exact: true
    }).first()
  ).toBeVisible({ timeout: 15000 });

   // Step 6: Reply to discussion
  await page.getByRole('button', {
    name: 'Reply',
    exact: true
  }).first().click();

  const replyEditor = page.locator('.Composer textarea');

  await expect(replyEditor).toBeVisible({ timeout: 10000 });

  await replyEditor.fill(replyText);

  await page.getByRole('button', {
    name: 'Post Reply'
  }).click();

  // Step 7: Verify reply
  await expect(
    page.getByText(replyText, { exact: true })
  ).toBeVisible({ timeout: 15000 });

});