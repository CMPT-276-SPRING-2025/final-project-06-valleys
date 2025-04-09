import { test, expect } from "@playwright/test";

test.describe("Email Generator Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/email-generator");
  });

  test("should load the email generator page", async ({ page }) => {
    // Check if the page title is correct
    await expect(page).toHaveTitle("Email Generator | Deep Phishing");

    // Check if the main heading is present
    await expect(
      page.getByRole("heading", { name: "Phishing Email Generator" })
    ).toBeVisible();

    // Check if the disclaimer is present
    await expect(
      page.getByText("This tool is for educational purposes only")
    ).toBeVisible();
  });

  test("should have all template options in the dropdown", async ({ page }) => {
    const templateOptions = [
      "Banking Alert",
      "Lottery Scam",
      "Tech Support Scam",
      "Job Offer Scam",
      "Customize",
    ];

    // Click the template dropdown
    await page.getByRole("combobox").click();

    // Check each template option
    for (const option of templateOptions) {
      await expect(page.getByRole("option", { name: option })).toBeVisible();
    }
  });

  test("should update subject and content when template is changed", async ({
    page,
  }) => {
    // Select "Lottery Scam" template
    await page.getByRole("combobox").click();
    await page.getByRole("option", { name: "Lottery Scam" }).click();

    // Check if subject contains "Congratulations"
    const subjectInput = page.getByLabel("Subject Line");
    await expect(subjectInput).toHaveValue(/Congratulations/);

    // Check if content contains "lottery"
    const contentTextarea = page.getByLabel("Email Content");
    await expect(contentTextarea).toHaveValue(/lottery/i);
  });

  test("should enable customization mode when Customize is selected", async ({
    page,
  }) => {
    // Select "Customize" option
    await page.getByRole("combobox").click();
    await page.getByRole("option", { name: "Customize" }).click();

    // Check if email context input appears
    await expect(page.getByLabel("Email Context")).toBeVisible();

    // Check if AI checkbox is checked by default
    const aiCheckbox = page.getByLabel("Use AI to generate email");
    await expect(aiCheckbox).toBeChecked();
  });

  test("should validate recipient email before sending", async ({ page }) => {
    // Fill in other required fields first
    await page.getByLabel("Subject Line").fill("Test Subject");
    await page.getByLabel("Email Content").fill("Test Content");

    // Fill in invalid email
    await page.getByLabel("Recipient Email").fill("invalid-email");

    // Try to send
    const sendButton = page.getByRole("button", { name: "Send Email" });

    // Click the button
    await sendButton.click();

    // Check for error notification with the correct data-testid
    // The app uses data-testid="${notification.type}-message"
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();

    // Fill in valid email
    await page.getByLabel("Recipient Email").fill("valid@example.com");

    // Mock the API response for successful email sending
    await page.route("/api/send-mail", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Email sent successfully" }),
      });
    });

    // Also mock the HTML conversion endpoint
    await page.route("/api/OpenAI/generateEmail/html", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ content: "<p>Test Content</p>" }),
      });
    });

    // Click send button again
    await sendButton.click();

    // Check for success notification
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });
});
