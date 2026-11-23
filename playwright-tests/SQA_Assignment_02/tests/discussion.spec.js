const { test, expect } = require('@playwright/test');
require('dotenv').config();

const baseURL = 'http://127.0.0.1:8000';

async function login(page) {
  await page.goto(baseURL);

  await page.getByRole('button', { name: 'Log In' }).click();

  await page.locator('input[name="identification"]')
    .fill(process.env.FLARUM_USERNAME);

  await page.locator('input[name="password"]')
    .fill(process.env.FLARUM_PASSWORD);

  await page.getByRole('button', { name: 'Log In' }).last().click();

  await expect(
    page.getByRole('button', {
      name: 'Toggle session options dropdown menu'
    })
  ).toBeVisible();
}

async function selectGeneralTag(page) {
  await page.getByRole('button', { name: 'Choose Tags' }).click();

  const dialog = page.locator('.TagSelectionModal');

  await expect(dialog).toBeVisible();

  await dialog.getByText('General', { exact: true }).click();

  // Confirm selected tag
  const submitButton = dialog.getByRole('button', {
    name: /OK|Apply|Choose Tags|Submit|Confirm/i
  });

  await submitButton.click();

  await expect(dialog).toBeHidden();
}

// TC-08
test('TC-08: New discussion button opens composer', async ({ page }) => {
  await login(page);

  await page.getByRole('button', {
    name: 'Start a Discussion'
  }).click();

  await expect(
    page.getByRole('textbox', { name: 'Discussion Title' })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Write a Post...' })
  ).toBeVisible();
});

// TC-09
test('TC-09: User creates a discussion successfully', async ({ page }) => {
  await login(page);

  const title = `SQA Test Discussion ${Date.now()}`;

  await page.getByRole('button', {
    name: 'Start a Discussion'
  }).click();

  await page.getByRole('textbox', {
    name: 'Discussion Title'
  }).fill(title);

  await page.getByRole('textbox', {
    name: 'Write a Post...'
  }).fill(
    'This discussion was created automatically using Playwright for SQA testing.'
  );

  await selectGeneralTag(page);

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
});

// TC-10
test('TC-10: Empty discussion title is rejected', async ({ page }) => {
  await login(page);

  await page.getByRole('button', {
    name: 'Start a Discussion'
  }).click();

  await page.getByRole('textbox', {
    name: 'Write a Post...'
  }).fill('Testing discussion without a title.');

  await page.getByRole('button', {
    name: 'Post Discussion'
  }).click();

  // Composer should remain open because title is required
  await expect(
    page.getByRole('textbox', {
      name: 'Discussion Title'
    })
  ).toBeVisible();

  await expect(page).toHaveURL(baseURL + '/');
});