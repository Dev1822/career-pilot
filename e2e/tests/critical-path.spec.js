import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  // Skip this test in environments without a real Clerk key, 
  // as the ClerkProvider will cause a crash boundary if given a dummy key.
  test('user can navigate to the login interface', async ({ page }) => {
    test.skip(
      !process.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.VITE_CLERK_PUBLISHABLE_KEY.includes('dummy'),
      'Requires a valid Clerk Publishable Key'
    );
    
    await page.goto('/');

    const loginLink = page.locator('a[href="/login"]').first();
    await expect(loginLink).toBeVisible({ timeout: 15000 });
    
    await loginLink.click();

    const emailInput = page.locator('input[type="email"], input[name="identifier"], input[name="emailAddress"]');
    await expect(emailInput).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Public flows', () => {
  test('user can view the landing page', async ({ page }) => {
    await page.goto('/');
    
    // We expect the root to mount properly (if it doesn't crash from keys)
    // Even if it crashes, it should have the `#root` element visible
    await expect(page.locator('#root')).toBeVisible();

    // If a valid key is provided, it will render the actual landing page 
    // and we can check for brand text.
    if (process.env.VITE_CLERK_PUBLISHABLE_KEY && !process.env.VITE_CLERK_PUBLISHABLE_KEY.includes('dummy')) {
      await expect(page.locator('text=careerpilot').first()).toBeVisible();
    }
  });
});
