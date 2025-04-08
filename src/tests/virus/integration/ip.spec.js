import { test, expect } from "@playwright/test";

test.describe("IP Scanner Page", () => {
  test("should load the IP scanner page", async ({ page }) => {
    // Increase timeout for page load
    test.setTimeout(30000);

    await page.goto("/scan/ip");

    // Check that the page title is visible
    await expect(page.locator("h1")).toContainText("IP Address Scanner", {
      timeout: 10000,
    });

    // Check that the input field is visible using data-testid
    await expect(page.locator('[data-testid="ip-input"]')).toBeVisible({
      timeout: 10000,
    });

    // Check that the scan button is disabled initially (no IP entered)
    const scanButton = page.locator('[data-testid="scan-ip-button"]');
    await expect(scanButton).toBeDisabled({ timeout: 10000 });
  });

  test("should validate IP addresses correctly", async ({ page }) => {
    // Increase timeout
    test.setTimeout(30000);

    await page.goto("/scan/ip");

    const ipInput = page.locator('[data-testid="ip-input"]');
    const scanButton = page.locator('[data-testid="scan-ip-button"]');

    // Test invalid IP
    await ipInput.fill("not a valid ip");
    await page.waitForTimeout(1000); // Increase timeout for validation
    await expect(scanButton).toBeDisabled();

    // Test another invalid IP
    await ipInput.fill("192.168.1");
    await page.waitForTimeout(1000);
    await expect(scanButton).toBeDisabled();

    // Test valid IP
    await ipInput.fill("192.168.1.1");
    await page.waitForTimeout(1000);
    await expect(scanButton).toBeEnabled();

    // Test another valid IP
    await ipInput.fill("8.8.8.8");
    await page.waitForTimeout(1000);
    await expect(scanButton).toBeEnabled();
  });

  test("should scan IP and redirect to results page", async ({ page }) => {
    // Set a longer timeout for this test as it makes a real API call
    test.setTimeout(90000);

    await page.goto("/scan/ip");

    // Enter an IP
    const ipInput = page.locator('[data-testid="ip-input"]');
    await ipInput.fill("8.8.8.8");
    await page.waitForTimeout(1000);

    // Click the scan button
    const scanButton = page.locator('[data-testid="scan-ip-button"]');
    await expect(scanButton).toBeEnabled();
    await scanButton.click();

    // Wait for the loading state
    await expect(page.locator("text=Scanning IP Address")).toBeVisible({
      timeout: 10000,
    });

    // Wait for navigation to complete - use a more robust approach
    await page.waitForURL(/\/scan\/ip\/.*/, { timeout: 60000 });

    // Verify we're on a results page
    const currentUrl = page.url();
    expect(currentUrl).toContain("/scan/ip/");
  });

  test("should handle API errors gracefully", async ({ page }) => {
    // Mock a failed API response
    await page.route("**/api/virustotal/ip*", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await page.goto("/scan/ip");

    // Enter an IP
    const ipInput = page.locator('[data-testid="ip-input"]');
    await ipInput.fill("8.8.8.8");
    await page.waitForTimeout(500);

    // Click the scan button
    const scanButton = page.locator('[data-testid="scan-ip-button"]');
    await expect(scanButton).toBeEnabled();
    await scanButton.click();

    // Check for error message using data-testid
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible({
      timeout: 5000,
    });
    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      "Internal Server Error"
    );
  });
});
