const { test, expect } = require('@playwright/test');
test('TC-17: Search existing discussion', async ({ page }) => {

  await page.goto('http://127.0.0.1:8000/');

  // Click search button in header
  await page
    .getByRole('banner')
    .getByRole('button', { name: 'Search Forum' })
    .click();

  // Type keyword into the focused search field
  await page.keyboard.type('SQA Test Discussion');

  // Press Enter to search
  await page.keyboard.press('Enter');

  // Verify matching discussion appears in results
  await expect(
    page.getByRole('heading', {
      name: /SQA Test Discussion/i
    }).first()
  ).toBeVisible();

});


test('TC-18: Search nonexistent discussion', async ({ page }) => {

  await page.goto('http://127.0.0.1:8000/');

  // Open search from header
  await page
    .getByRole('banner')
    .getByRole('button', { name: 'Search Forum' })
    .click();

  // Search a unique nonexistent keyword
  const keyword = `NoDiscussionFound${Date.now()}`;

  await page.keyboard.type(keyword);
  await page.keyboard.press('Enter');

  // Verify no matching discussions are displayed
  await expect(
    page.getByRole('heading', { level: 2 })
      .filter({ hasText: keyword })
  ).toHaveCount(0);

});

