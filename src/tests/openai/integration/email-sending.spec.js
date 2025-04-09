import { test, expect } from "@playwright/test";

test.describe("Email Sending Integration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/email-generator");
  });

  test("should successfully send an email with valid data", async ({
    page,
    request,
  }) => {
    // Mock the API response
    await page.route("/api/send-mail", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Email sent successfully" }),
      });
    });
    f;
    // Fill in the form
    await page.getByLabel("Recipient Email").fill("test@example.com");
    await page.getByLabel("Subject Line").fill("Test Subject");
    await page.getByLabel("Email Content").fill("Test Content");

    // Click send button
    await page.getByRole("button", { name: "Send Email" }).click();

    // Wait for success message - use waitForSelector with state visible
    await page
      .locator('[data-testid="success-message"]')
      .waitFor({ state: "visible" });
    await expect(page.getByText("Email sent successfully")).toBeVisible();
  });

  test("should handle API errors gracefully", async ({ page }) => {
    // Mock the API response with an error
    await page.route("/api/send-mail", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Failed to send email" }),
      });
    });

    // Fill in the form
    await page.getByLabel("Recipient Email").fill("test@example.com");
    await page.getByLabel("Subject Line").fill("Test Subject");
    await page.getByLabel("Email Content").fill("Test Content");

    // Click send button
    await page.getByRole("button", { name: "Send Email" }).click();

    // Wait for error message
    await page
      .locator('[data-testid="error-message"]')
      .waitFor({ state: "visible" });
    await expect(page.getByText("Failed to send email")).toBeVisible();
  });

  test("should handle network errors gracefully", async ({ page }) => {
    // Mock network error
    await page.route("/api/send-mail", async (route) => {
      await route.abort("failed");
    });

    // Fill in the form
    await page.getByLabel("Recipient Email").fill("test@example.com");
    await page.getByLabel("Subject Line").fill("Test Subject");
    await page.getByLabel("Email Content").fill("Test Content");

    // Click send button
    await page.getByRole("button", { name: "Send Email" }).click();

    // Wait for error message - use waitFor instead of toBeVisible with timeout
    await page
      .locator('[data-testid="error-message"]')
      .waitFor({ state: "visible" });
    // Check for a more generic error message that might be displayed
    const errorText = await page
      .locator('[data-testid="error-message"]')
      .innerText();
    console.log("Error message displayed:", errorText);

    // Check if the error message contains any error text
    expect(errorText.length).toBeGreaterThan(0);
  });

  test("should handle AI email generation", async ({ page }) => {
    // Mock the plain-text API response
    await page.route("/api/OpenAI/generateEmail/plain-text", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          subject: "Generated Subject",
          content: "Generated HTML content",
        }),
      });
    });

    // Also mock the HTML conversion endpoint for completeness
    await page.route("/api/OpenAI/generateEmail/html", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          content: "<p>Generated HTML content</p>",
        }),
      });
    });

    await page.getByRole("combobox").click(); // Open the dropdown
    await page.getByRole("option", { name: "Customize" }).click(); // Select the option

    // Fill in the context
    await page.getByLabel("Email Context").fill("Generate a phishing email");

    // Submit context
    await page.getByRole("button", { name: "Submit" }).click();

    // Wait for generated content
    await page.getByLabel("Email Content").waitFor({ state: "visible" });
    await expect(page.getByLabel("Email Content")).toContainText(
      "Generated HTML content"
    );
  });
});
