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
    await page.getByRole("combobox").selectOption("lotto");

    // Check if subject contains "Congratulations"
    const subjectInput = page.getByLabel("Subject Line");
    await expect(subjectInput).toContainText("Congratulations");

    // Check if content contains "lottery"
    const contentTextarea = page.getByLabel("Email Content");
    await expect(contentTextarea).toContainText("lottery");
  });

  test("should enable customization mode when Customize is selected", async ({
    page,
  }) => {
    // Select "Customize" option
    await page.getByRole("combobox").selectOption("custom");

    // Check if email context input appears
    await expect(page.getByLabel("Email Context")).toBeVisible();

    // Check if AI checkbox is checked by default
    const aiCheckbox = page.getByLabel("Use AI to generate email");
    await expect(aiCheckbox).toBeChecked();
  });

  test("should validate recipient email before sending", async ({ page }) => {
    // Try to send without recipient email
    const sendButton = page.getByRole("button", { name: "Send Email" });
    await expect(sendButton).toBeDisabled();

    // Enter invalid email
    await page.getByLabel("Recipient Email").fill("invalid-email");
    await expect(sendButton).toBeDisabled();

    // Enter valid email
    await page.getByLabel("Recipient Email").fill("test@example.com");
    await expect(sendButton).toBeEnabled();
  });
});
