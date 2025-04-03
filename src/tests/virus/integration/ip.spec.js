import { test, expect } from "@playwright/test";

test.describe("IP Scanner Page", () => {
  test("should load the IP scanner page", async ({ page }) => {
    await page.goto("/scan/ip");

    // Check that the page title is visible
    await expect(page.locator("h1")).toContainText("IP Address Scanner");

    // Check that the input field is visible
    await expect(page.locator('input[type="text"]')).toBeVisible();

    // Check that the scan button is disabled initially (no IP entered)
    const scanButton = page.locator('button:has-text("Scan")').last();
    await expect(scanButton).toBeDisabled();
  });

  test("should validate IP addresses correctly", async ({ page }) => {
    await page.goto("/scan/ip");

    const ipInput = page.locator('input[type="text"]');
    const scanButton = page.locator('button:has-text("Scan")').last();

    // Test invalid IP
    await ipInput.fill("not a valid ip");
    await expect(scanButton).toBeDisabled();

    // Test another invalid IP
    await ipInput.fill("192.168.1");
    await expect(scanButton).toBeDisabled();

    // Test valid IP
    await ipInput.fill("192.168.1.1");
    await expect(scanButton).toBeEnabled();

    // Test another valid IP
    await ipInput.fill("8.8.8.8");
    await expect(scanButton).toBeEnabled();
  });

  test("should scan IP and redirect to results page", async ({ page }) => {
    // Set a longer timeout for this test as it makes a real API call
    test.setTimeout(60000);

    await page.goto("/scan/ip");

    // Enter an IP
    const ipInput = page.locator('input[type="text"]');
    await ipInput.fill("8.8.8.8");

    // Click the scan button
    const scanButton = page.locator('button:has-text("Scan")').last();
    await scanButton.click();

    // Wait for the loading state
    await expect(page.locator("text=Scanning...")).toBeVisible();

    // Wait for redirection to the results page
    // This might take some time as it's making a real API call
    await page.waitForURL("**/scan/ip/**", { timeout: 30000 });

    // Verify we're on a results page
    expect(page.url()).toMatch(/\/scan\/ip\/[^/]+/);
  });

  test("should handle API errors gracefully", async ({ page }) => {
    // Mock a failed API response
    await page.route("**/api/virustotal/ip", async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await page.goto("/scan/ip");

    // Enter an IP
    const ipInput = page.locator('input[type="text"]');
    await ipInput.fill("8.8.8.8");

    // Click the scan button
    const scanButton = page.locator('button:has-text("Scan")').last();
    await scanButton.click();

    // Check for error message - update to match the actual error message
    await expect(page.locator(".bg-red-50")).toBeVisible();
    await expect(page.locator(".text-red-600")).toContainText(
      "Internal Server Error"
    );
  });
});
