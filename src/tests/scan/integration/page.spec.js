//integration test for page.jsx on email quiz feature
import { test, expect } from "@playwright/test";

test.describe("Integration Test: Email Quiz Page", () => {
  test("loads the quiz and allows answer submission", async ({ page }) => {
    await page.goto("/emailquiz");

    await expect(page.getByRole("heading", { name: "Phishing Email Quiz" })).toBeVisible();

    await expect(page.getByText("Email 1")).toBeVisible();
    await expect(page.getByText("Email 2")).toBeVisible();

    await page.getByText("Email 1").click();

    const submitButton = page.getByRole("button", { name: "Submit Answer" });
    await submitButton.click();

    await expect(
      page.locator("text=/Correct!|Incorrect!/")
    ).toBeVisible();
  });
});
