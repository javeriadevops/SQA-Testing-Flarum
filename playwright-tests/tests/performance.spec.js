
const { test, expect } = require('@playwright/test');

test('TC-13: Homepage loads within 5 seconds', async ({ page }) => {

  // Start timer
  const startTime = Date.now();

  // Open Flarum homepage
  await page.goto('http://127.0.0.1:8000/');

  // Wait for homepage to be visible
  await expect(page.getByText('SQA Testing Forum').first()).toBeVisible();

  // Calculate loading time
  const loadTime = Date.now() - startTime;

  console.log(`Homepage Load Time: ${loadTime} ms`);

  // Verify loading time is under 5 seconds
  expect(loadTime).toBeLessThan(5000);

});
