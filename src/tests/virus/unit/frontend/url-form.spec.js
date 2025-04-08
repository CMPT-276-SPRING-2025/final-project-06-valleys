import { test, expect } from "@playwright/test";

test.describe("ScanURLForm Component", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the URL scan page
    await page.goto("/scan/url");
  });

  test("renders the URL scan form correctly", async ({ page }) => {
    // Check that the form is rendered
    await expect(page.locator('[data-testid="url-scan-form"]')).toBeVisible();

    // Check that the title is correct
    await expect(
      page.locator('[data-testid="url-scan-form"] h2')
    ).toContainText("Enter a URL to scan");

    // Check that the URL input is visible
    await expect(page.locator('[data-testid="url-input"]')).toBeVisible();

    // Check that the scan button is disabled initially
    await expect(
      page.locator('[data-testid="scan-url-button"]')
    ).toBeDisabled();
  });

  test("validates URL format", async ({ page }) => {
    const urlInput = page.locator('[data-testid="url-input"]');
    const scanButton = page.locator('[data-testid="scan-url-button"]');

    // Test invalid URL
    await urlInput.fill("not a valid url");
    await expect(scanButton).toBeDisabled();

    // Test valid URL with protocol
    await urlInput.fill("https://example.com");
    await expect(scanButton).toBeEnabled();

    // Test valid URL without protocol
    await urlInput.fill("example.com");
    await expect(scanButton).toBeEnabled();
  });

  test("handles URL input changes", async ({ page }) => {
    const urlInput = page.locator('[data-testid="url-input"]');

    // Fill the URL input
    await urlInput.fill("https://example.com");

    // Check that the input value is updated
    await expect(urlInput).toHaveValue("https://example.com");

    // Clear the input
    await urlInput.fill("");

    // Check that the input value is cleared
    await expect(urlInput).toHaveValue("");

    // Check that the scan button is disabled again
    await expect(
      page.locator('[data-testid="scan-url-button"]')
    ).toBeDisabled();
  });
});
