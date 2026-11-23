
const { test, expect } = require('@playwright/test');

test('TC-15: Guest cannot access admin dashboard', async ({ page }) => {

  // Visit admin URL without logging in
  const response = await page.goto('http://127.0.0.1:8000/admin');

  await page.waitForLoadState('domcontentloaded');

  // Guest must not see the actual admin interface
  const adminDashboard = page.locator('.AdminPage');

  await expect(adminDashboard).toHaveCount(0);

  // Check whether access was denied
  const status = response.status();

  console.log('HTTP Status:', status);
  console.log('Current URL:', page.url());

  // Verify server denied access OR page redirected
  // OR a visible access-denied message appears
  const redirected = !page.url().includes('/admin');

  const accessDenied = await page.getByText(
    /403|forbidden|access denied|permission|not authorized|not found/i
  ).count() > 0;

  expect(
    status === 401 ||
    status === 403 ||
    redirected ||
    accessDenied
  ).toBe(true);

});
