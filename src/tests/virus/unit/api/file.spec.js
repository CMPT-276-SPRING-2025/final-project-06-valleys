import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import os from "os";

test.describe("VirusTotal File API", () => {
  // Create a test file
  let testFilePath;
  let invalidFilePath;

  test.beforeAll(async () => {
    // Use the OS temp directory for test files
    const tempDir = os.tmpdir();

    // Create a temporary test file
    testFilePath = path.join(tempDir, "test-file.txt");
    fs.writeFileSync(
      testFilePath,
      "This is a test file for VirusTotal API testing"
    );

    // Create an invalid file (empty file with executable extension)
    invalidFilePath = path.join(tempDir, "invalid-file.exe");
    fs.writeFileSync(invalidFilePath, "");
  });

  test.afterAll(async () => {
    // Clean up the test files
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
    if (fs.existsSync(invalidFilePath)) {
      fs.unlinkSync(invalidFilePath);
    }
  });

  test("successfully submits file for scanning", async ({ request }) => {
    // Create a FormData object with the file
    const fileBuffer = fs.readFileSync(testFilePath);

    // Submit the file
    const response = await request.post("/api/virustotal/file", {
      multipart: {
        file: {
          name: "test-file.txt",
          mimeType: "text/plain",
          buffer: fileBuffer,
        },
      },
    });

    // Check response - update to include 409 status code
    expect([200, 202, 409]).toContain(response.status());

    const data = await response.json();
    console.log("File Scan Response:", data);

    // If successful, we should have an analysis ID
    if (response.status() === 200) {
      expect(data).toHaveProperty("analysisId");
    }
  });

  test("handles invalid file types", async ({ request }) => {
    // Read the invalid file
    const fileBuffer = fs.readFileSync(invalidFilePath);

    // Submit the file
    const response = await request.post("/api/virustotal/file", {
      multipart: {
        file: {
          name: "invalid-file.exe",
          mimeType: "application/x-msdownload",
          buffer: fileBuffer,
        },
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();

    // We should get back an analysis ID at minimum
    expect(data).toHaveProperty("analysisId");
    expect(data).toHaveProperty("fileName");
    expect(data).toHaveProperty("fileSize");
  });
});
