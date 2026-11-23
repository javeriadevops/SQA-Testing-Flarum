
const { test, expect } = require('@playwright/test');

test('TC-01: Flarum homepage loads successfully', async ({ page }) => {

  await page.goto('http://127.0.0.1:8000/');

  // Check page title
  await expect(page).toHaveTitle(/SQA Testing Forum/);

  // Check forum homepage heading/link
  await expect(
    page.getByText('SQA Testing Forum').first()
  ).toBeVisible();

});
