import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('File Scan Page', () => {
  // Create a test file before all tests
  let testFilePath;
  let testFileName;

  test.beforeAll(async () => {
    // Create a temporary test file with a unique name to avoid conflicts
    testFileName = `test-file-${Date.now()}.txt`;
    testFilePath = path.join(process.cwd(), testFileName);
    fs.writeFileSync(testFilePath, 'This is a test file for scanning');
  });

  test.afterAll(async () => {
    // Clean up the test file with a retry mechanism
    if (fs.existsSync(testFilePath)) {
      try {
        await fs.promises.unlink(testFilePath);
      } catch (error) {
        console.warn(`Could not delete test file: ${error.message}`);
        // Schedule deletion for later when the file might be unlocked
        setTimeout(async () => {
          try {
            if (fs.existsSync(testFilePath)) {
              await fs.promises.unlink(testFilePath);
            }
          } catch (e) {
            console.error(`Failed to delete test file on retry: ${e.message}`);
          }
        }, 1000);
      }
    }
  });

  test('should load the file scan page', async ({ page }) => {
    await page.goto('/scan/file');

    // Check that the page title is visible
    await expect(page.locator('h1')).toContainText('File Scanner');

    // Check that the upload area is visible
    await expect(
      page.locator('text=Click to upload or drag and drop')
    ).toBeVisible();

    // Check that the scan button is disabled initially
    const scanButton = page.locator('button:has-text("Scan File")');
    await expect(scanButton).toBeDisabled();
  });

  test('should allow file upload and enable scan button', async ({ page }) => {
    await page.goto('/scan/file');

    // Upload a file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testFilePath);

    // Check that the file name is displayed - use the dynamic file name
    await expect(page.locator(`text=${testFileName}`)).toBeVisible();

    // Check that the scan button is now enabled
    const scanButton = page.locator('button:has-text("Scan File")');
    await expect(scanButton).toBeEnabled();
  });

  test('should show error for oversized files', async ({ page }) => {
    await page.goto('/scan/file');

    // Mock a large file upload by intercepting the file input event
    await page.evaluate(() => {
      // Create a mock file object that appears to be over 32MB
      const mockFile = new File([''], 'large-file.bin', {
        type: 'application/octet-stream',
        lastModified: new Date().getTime(),
      });

      // Override the size property
      Object.defineProperty(mockFile, 'size', {
        value: 33 * 1024 * 1024, // 33MB
      });

      // Trigger the file validation function
      const input = document.querySelector('input[type="file"]');
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(mockFile);
      input.files = dataTransfer.files;

      // Dispatch change event
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Check that error message is displayed
    await expect(
      page.locator('text=File size exceeds the 32MB limit')
    ).toBeVisible();
  });

  test('should scan file and redirect to results page', async ({ page }) => {
    // Set a longer timeout for this test as it makes a real API call
    test.setTimeout(60000);

    await page.goto('/scan/file');

    // Upload a file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testFilePath);

    // Click the scan button
    const scanButton = page.locator('button:has-text("Scan File")');
    await scanButton.click();

    // Wait for the loading state
    await expect(page.locator('text=Scanning...')).toBeVisible();

    // Wait for redirection to the results page
    // This might take some time as it's making a real API call
    await page.waitForURL('**/scan/file/**', { timeout: 30000 });

    // Verify we're on a results page
    expect(page.url()).toMatch(/\/scan\/file\/[a-zA-Z0-9-_]+/);
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // For testing error handling, we can use an invalid file type
    const invalidFilePath = path.join(
      process.cwd(),
      'invalid-test-file.bin'
    );
    fs.writeFileSync(invalidFilePath, Buffer.from([0xFF, 0xD8, 0xFF, 0xE0])); // Invalid file header

    try {
      await page.goto('/scan/file');

      // Upload the invalid file
      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles(invalidFilePath);

      // Click the scan button
      const scanButton = page.locator('button:has-text("Scan File")');
      await scanButton.click();

    } finally {
      // Clean up the invalid test file
      if (fs.existsSync(invalidFilePath)) {
        try {
          await fs.promises.unlink(invalidFilePath);
        } catch (error) {
          console.warn(`Could not delete invalid test file: ${error.message}`);
        }
      }
    }
  });
});
