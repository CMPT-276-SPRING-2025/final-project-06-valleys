import { test, expect } from "@playwright/test";

test.describe("FileScanForm Component", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the file scan page
    await page.goto("/scan/file");
  });

  test("renders the file scan form correctly", async ({ page }) => {
    // Check that the form is rendered
    await expect(page.locator('[data-testid="file-scan-form"]')).toBeVisible();

    // Check that the title is correct
    await expect(
      page.locator('[data-testid="file-scan-form"] h2')
    ).toContainText("Upload a file to scan");

    // Check that the file drop area is visible
    await expect(page.locator('[data-testid="file-drop-area"]')).toBeVisible();

    // Check that the scan button is disabled initially
    await expect(page.locator('[data-testid="scan-button"]')).toBeDisabled();
  });

  test("enables scan button when file is selected", async ({ page }) => {
    // Create a test file in memory
    const fileContent = "Test file content";

    // Use a more reliable approach to set the file input
    await page.setInputFiles('[data-testid="file-input"]', {
      name: "test-file.txt",
      mimeType: "text/plain",
      buffer: Buffer.from(fileContent),
    });

    // Wait for the file info to appear
    await page.waitForSelector('[data-testid="selected-file-info"]', {
      state: "visible",
      timeout: 5000,
    });

    // Check that the file info is displayed
    await expect(
      page.locator('[data-testid="selected-file-info"]')
    ).toBeVisible();

    // Check that the scan button is now enabled
    await expect(page.locator('[data-testid="scan-button"]')).toBeEnabled();
  });

  test("shows error message for oversized files", async ({ page }) => {
    // Mock a large file upload by evaluating JavaScript in the browser context
    await page.evaluate(() => {
      // Create a mock file object that appears to be over 32MB
      const mockFile = new File([""], "large-file.bin", {
        type: "application/octet-stream",
        lastModified: new Date().getTime(),
      });

      // Override the size property
      Object.defineProperty(mockFile, "size", {
        value: 33 * 1024 * 1024, // 33MB
      });

      // Trigger the file validation function
      const input = document.querySelector('[data-testid="file-input"]');
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(mockFile);
      input.files = dataTransfer.files;

      // Dispatch change event
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Check that error message is displayed
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      "File size exceeds the 32MB limit"
    );
  });
});
