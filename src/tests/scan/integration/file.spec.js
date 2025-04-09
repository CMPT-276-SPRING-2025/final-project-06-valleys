import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import os from "os";

test.describe("File Scan Page", () => {
  // Create a test file before all tests
  let testFilePath;
  let testFileName;
  let invalidFilePath;

  test.beforeAll(async () => {
    // Use temp directory for better permissions
    const tempDir = os.tmpdir();

    // Create a temporary test file with a unique name to avoid conflicts
    testFileName = `test-file-${Date.now()}.txt`;
    testFilePath = path.join(tempDir, testFileName);
    fs.writeFileSync(testFilePath, "This is a test file for scanning");

    // Create invalid test file in temp directory
    invalidFilePath = path.join(tempDir, `invalid-test-file-${Date.now()}.bin`);
    fs.writeFileSync(invalidFilePath, Buffer.from([0xff, 0xd8, 0xff, 0xe0])); // Invalid file header
  });

  test.afterAll(async () => {
    // Clean up the test files
    for (const filePath of [testFilePath, invalidFilePath]) {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          console.warn(`Could not delete test file: ${error.message}`);
          // Schedule deletion for later when the file might be unlocked
          setTimeout(() => {
            try {
              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
            } catch (e) {
              console.error(
                `Failed to delete test file on retry: ${e.message}`
              );
            }
          }, 1000);
        }
      }
    }
  });

  test("should load the file scan page", async ({ page }) => {
    await page.goto("/scan/file");

    // Check that the page title is visible
    await expect(page.locator("h1")).toContainText("File Scanner");

    // Check that the upload area is visible using data-testid
    await expect(page.locator('[data-testid="file-drop-area"]')).toBeVisible();

    // Check that the scan button is disabled initially
    const scanButton = page.locator('[data-testid="scan-button"]');
    await expect(scanButton).toBeDisabled();
  });

  test("should allow file upload and enable scan button", async ({ page }) => {
    await page.goto("/scan/file");

    // Upload a file using data-testid
    const fileInput = page.locator('[data-testid="file-input"]');
    await fileInput.setInputFiles(testFilePath);

    // Wait for the file info to appear
    await page.waitForSelector('[data-testid="selected-file-info"]', {
      state: "visible",
      timeout: 5000,
    });

    // Check that the file name is displayed
    await expect(
      page.locator('[data-testid="selected-file-info"]')
    ).toContainText(testFileName);

    // Check that the scan button is now enabled
    const scanButton = page.locator('[data-testid="scan-button"]');
    await expect(scanButton).toBeEnabled();
  });

  test("should show error for oversized files", async ({ page }) => {
    await page.goto("/scan/file");

    // Mock a large file upload by intercepting the file input event
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

  test("should scan file and redirect to results page", async ({ page }) => {
    // Set a longer timeout for this test as it makes a real API call
    test.setTimeout(120000);

    await page.goto("/scan/file");

    // Upload a file
    const fileInput = page.locator('[data-testid="file-input"]');
    await fileInput.setInputFiles(testFilePath);

    // Wait for the file info to appear
    await page.waitForSelector('[data-testid="selected-file-info"]', {
      state: "visible",
      timeout: 10000,
    });

    // Click the scan button
    const scanButton = page.locator('[data-testid="scan-button"]');
    await expect(scanButton).toBeEnabled();
    await scanButton.click();

    // Wait for the loading state - look for "Scanning File" text
    await expect(page.locator("text=Scanning File")).toBeVisible({
      timeout: 10000,
    });

    // Wait for navigation to complete - use a more robust approach
    await page.waitForURL(/\/scan\/file\/.*/, { timeout: 60000 });

    // Verify we're on a results page
    const currentUrl = page.url();
    expect(currentUrl).toContain("/scan/file/");
  });

  test("should handle API errors gracefully", async ({ page }) => {
    // Mock a failed API response
    await page.route("**/api/virustotal/file", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await page.goto("/scan/file");

    // Upload a file
    const fileInput = page.locator('[data-testid="file-input"]');
    await fileInput.setInputFiles(testFilePath);

    // Wait for any UI update - don't rely on specific element
    await page.waitForTimeout(2000);

    // Click the scan button - it should be enabled after file upload
    const scanButton = page.locator('[data-testid="scan-button"]');
    await scanButton.click();

    // Check for error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      "Internal Server Error"
    );
  });
});
