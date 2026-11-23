
const { test, expect } = require('@playwright/test');
require('dotenv').config();

const baseURL = 'http://127.0.0.1:8000';

// Lines 6–23: Login helper
async function login(page) {
  await page.goto(baseURL);

  await page.getByRole('button', { name: 'Log In' }).click();

  await page.locator('input[name="identification"]')
    .fill(process.env.FLARUM_USERNAME);

  await page.locator('input[name="password"]')
    .fill(process.env.FLARUM_PASSWORD);

  await page.getByRole('button', { name: 'Log In' }).last().click();

  await expect(page.getByRole('button', {
    name: 'Toggle session options dropdown menu'
  })).toBeVisible();
}

// Lines 25–34: Open existing discussion
async function openDiscussion(page) {
  await page.getByRole('heading', {
    name: /E2E Discussion/i
  }).first().click();

  await expect(
    page.locator('.Post').first()
  ).toBeVisible();
}

// TC-11: User can reply to a discussion
test('TC-11: User can reply to a discussion', async ({ page }) => {
  await login(page);
  await openDiscussion(page);

  const replyText = `SQA Reply ${Date.now()}`;

  await page.getByRole('button', {
    name: 'Reply',
    exact: true
  }).first().click();

  await page.locator('.Composer textarea').fill(replyText);

  await page.getByRole('button', {
    name: 'Post Reply'
  }).click();

  await expect(
    page.getByText(replyText, { exact: true })
  ).toBeVisible({ timeout: 15000 });
});

// TC-12: User can edit their own reply
test('TC-12: User can edit their own reply', async ({ page }) => {
  await login(page);
  await openDiscussion(page);

  const originalReply = `Original SQA reply ${Date.now()}`;
  const editedReply = `Edited SQA reply ${Date.now()}`;

  // Step 1: Create reply
  await page.getByRole('button', {
    name: 'Reply',
    exact: true
  }).first().click();

  await page.locator('.Composer textarea').fill(originalReply);

  await page.getByRole('button', {
    name: 'Post Reply'
  }).click();

  // Step 2: Verify original reply
  const post = page.locator('.Post').filter({
    hasText: originalReply
  }).first();

  await expect(post).toBeVisible({ timeout: 15000 });

  // Step 3: Open post controls dropdown
  await post.hover();

  await post.getByRole('button', {
    name: 'Toggle post controls dropdown menu'
  }).click();

  // Step 4: Click Edit
  await post.getByRole('button', {
    name: 'Edit',
    exact: true
  }).click();

  // Step 5: Edit reply
  await expect(
    page.locator('.Composer textarea')
  ).toBeVisible();

  await page.locator('.Composer textarea').fill(editedReply);

  // Step 6: Save edited reply
  await page.getByRole('button', {
    name: /Save Changes|Save/i
  }).click();

  // Step 7: Verify edited reply
  await expect(
    page.getByText(editedReply, { exact: true })
  ).toBeVisible({ timeout: 15000 });

  await expect(
    post.getByText(originalReply, { exact: true })
  ).toHaveCount(0);
});
