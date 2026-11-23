
const { test, expect } = require('@playwright/test');
require('dotenv').config();

const baseURL = 'http://127.0.0.1:8000';

test('TC-19: Authenticated user can like a post', async ({ page }) => {

  // Step 1: Open Flarum
  await page.goto(baseURL);

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

  // Step 3: Open an existing discussion
  await page.getByRole('heading', {
    name: /E2E Discussion/i
  }).first().click();

  await expect(
    page.locator('.Post').first()
  ).toBeVisible();

  // Step 4: Create a new reply
  const replyText = `Like Test Reply ${Date.now()}`;

  await page.getByRole('button', {
    name: 'Reply',
    exact: true
  }).first().click();

  await page.locator('.Composer textarea').fill(replyText);

  await page.getByRole('button', {
    name: 'Post Reply'
  }).click();

  // Step 5: Find the newly created reply
  const post = page.locator('.Post').filter({
    hasText: replyText
  }).first();

  await expect(post).toBeVisible({ timeout: 15000 });

  // Step 6: Hover over the post
  await post.hover();

  // Step 7: Like the post
  const likeButton = post.getByRole('button', {
    name: 'Like',
    exact: true
  });

  await expect(likeButton).toBeVisible({
    timeout: 10000
  });

  await likeButton.click();

  // Step 8: Verify Like changed to Unlike
  await expect(
    post.getByRole('button', {
      name: 'Unlike',
      exact: true
    })
  ).toBeVisible({ timeout: 15000 });

  // Step 9: Verify like confirmation
  await expect(
    post.locator('.Post-likedBy')
  ).toContainText('You');

});
