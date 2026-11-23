
const { test, expect } = require('@playwright/test');

test('TC-14: Homepage supports mobile screen size', async ({ page }) => {

  // Set mobile screen size
  await page.setViewportSize({
    width: 375,
    height: 667
  });

  // Open Flarum homepage
  await page.goto('http://127.0.0.1:8000/');

  // Verify homepage loads
  await expect(page.locator('body')).toBeVisible();

  // Check horizontal overflow
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth >
           document.documentElement.clientWidth;
  });

  // Mobile page should not overflow horizontally
  expect(hasOverflow).toBe(false);

  console.log('Mobile viewport: 375 x 667');
  console.log('Horizontal overflow:', hasOverflow);

});
