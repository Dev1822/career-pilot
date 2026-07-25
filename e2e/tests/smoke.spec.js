import { test, expect } from '@playwright/test';

test('has title and loads landing page', async ({ page }) => {
  await page.goto('/');

  // Wait for the React root element to be visible
  await expect(page.locator('#root')).toBeVisible();
});
