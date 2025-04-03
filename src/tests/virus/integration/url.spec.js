import { test, expect } from '@playwright/test';

test.describe('URL Scanner Page', () => {
  test('should load the URL scanner page', async ({ page }) => {
    await page.goto('/scan/url');
    
    // Check that the page title is visible
    await expect(page.locator('h1')).toContainText('URL Scanner');
    
    // Check that the input field is visible
    await expect(page.locator('input[type="search"]')).toBeVisible();
    
    // Check that the scan button is disabled initially (no URL entered)
    const scanButton = page.locator('button:has-text("Scan")');
    await expect(scanButton).toBeDisabled();
  });

  test('should validate URLs correctly', async ({ page }) => {
    await page.goto('/scan/url');
    
    const urlInput = page.locator('input[type="search"]');
    const scanButton = page.locator('button:has-text("Scan")');
    
    // Test invalid URL
    await urlInput.fill('not a valid url');
    await expect(scanButton).toBeDisabled();
    
    // Test valid URL
    await urlInput.fill('https://example.com');
    await expect(scanButton).toBeEnabled();
    
    // Test another valid URL format
    await urlInput.fill('example.com');
    await expect(scanButton).toBeEnabled();
  });

  test('should scan URL and redirect to results page', async ({ page }) => {
    // Set a longer timeout for this test as it makes a real API call
    test.setTimeout(60000);
    
    await page.goto('/scan/url');
    
    // Enter a URL
    const urlInput = page.locator('input[type="search"]');
    await urlInput.fill('https://example.com');
    
    // Click the scan button
    const scanButton = page.locator('button:has-text("Scan")');
    await scanButton.click();
    
    // Wait for the loading state
    await expect(page.locator('text=Scanning...')).toBeVisible();
    
    // Wait for redirection to the results page
    // This might take some time as it's making a real API call
    await page.waitForURL('**/scan/url/**', { timeout: 30000 });
    
    // Verify we're on a results page
    expect(page.url()).toMatch(/\/scan\/url\/[a-zA-Z0-9-_]+/);
  });
});