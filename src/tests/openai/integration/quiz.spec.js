//integration test for page.jsx on email quiz feature
import { test, expect } from "@playwright/test";

test.describe("Integration Test: Email Quiz Page", () => {
  test("loads the quiz and allows answer submission", async ({ page }) => {
    // Navigate to the quiz page
    await page.goto("/quiz");
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Debug: Log the HTML to see what's actually rendered
    console.log('Page HTML:', await page.content());
    
    // Try different selector approaches
    const heading = await page.locator('.text-center h1').first();
    await expect(heading).toBeVisible();
    
    // Check the text content
    const headingText = await heading.textContent();
    console.log('Heading text:', headingText);
    expect(headingText).toContain('Phishing Email Quiz');
    
    // Continue with the rest of the test
    await expect(page.getByText("Email 1")).toBeVisible();
    await expect(page.getByText("Email 2")).toBeVisible();

    // Click on the first email card
    await page.locator('.grid-cols-1 > div').first().click();

    // Find and click the submit button
    const submitButton = page.getByRole("button", { name: "Submit Answer" });
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // Check for feedback message
    await expect(
      page.locator("div").filter({ hasText: /Correct!|Incorrect!/ }).first()
    ).toBeVisible();
  });
});
