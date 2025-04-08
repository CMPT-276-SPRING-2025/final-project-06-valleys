import { test, expect } from "@playwright/test";

test.describe("IPScanForm Component", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the IP scan page
    await page.goto("/scan/ip");
  });

  test("renders the IP scan form correctly", async ({ page }) => {
    // Check that the form is rendered
    await expect(page.locator('[data-testid="ip-scan-form"]')).toBeVisible();

    // Check that the title is correct
    await expect(page.locator('[data-testid="ip-scan-form"] h2')).toContainText(
      "Enter an IP address to scan"
    );

    // Check that the IP input is visible
    await expect(page.locator('[data-testid="ip-input"]')).toBeVisible();

    // Check that the scan button is disabled initially
    await expect(page.locator('[data-testid="scan-ip-button"]')).toBeDisabled();
  });

  test("validates IP address format", async ({ page }) => {
    const ipInput = page.locator('[data-testid="ip-input"]');
    const scanButton = page.locator('[data-testid="scan-ip-button"]');

    // Test invalid IP
    await ipInput.fill("not a valid ip");
    await page.waitForTimeout(1000);
    await expect(scanButton).toBeDisabled();

    // Test another invalid IP
    await ipInput.fill("192.168.1");
    await page.waitForTimeout(1000);
    await expect(scanButton).toBeDisabled();

    // Test valid IP
    await ipInput.fill("192.168.1.1");
    await page.waitForTimeout(1000);
    await expect(scanButton).toBeEnabled();
  });

  test("Get My IP button is clickable", async ({ page }) => {
    // Increase timeout
    test.setTimeout(30000);

    // Click the Get My IP button
    await page.locator('[data-testid="get-my-ip-button"]').click();

    // Wait for the IP input to have a value
    await page.waitForTimeout(5000);

    // Get the current value of the IP input
    const ipValue = await page.locator('[data-testid="ip-input"]').inputValue();

    // Verify it's a valid IP format using regex
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    expect(ipRegex.test(ipValue)).toBeTruthy();

    // Check that the scan button is now enabled
    await expect(page.locator('[data-testid="scan-ip-button"]')).toBeEnabled({
      timeout: 5000,
    });
  });
});
