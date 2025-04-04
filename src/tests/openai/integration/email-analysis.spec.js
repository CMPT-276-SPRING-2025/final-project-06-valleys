import { test, expect } from "@playwright/test";

test.describe("Email Analysis Feature", () => {
  test("should analyze an invalid email and display appropriate message", async ({
    page,
  }) => {
    // Navigate to the email analysis page
    await page.goto("/email-analysis");

    // Ensure the page title is correct
    await expect(page.locator("h1")).toHaveText("Email Analysis");

    // Locate the email input field and enter a test email
    const emailInput = page.locator('textarea[name="emailContent"]');
    await emailInput.fill(`hello this is scam`);

    // Click the submit button
    await page.locator('button:has-text("Submit")').click(); // Ensure correct text for submit button

    // Wait for analysis results to appear
    const resultSection = page.locator("#analysis-results");
    await resultSection.waitFor({ state: "visible", timeout: 10000 }); // Ensure that the result section is visible

    // Get the inner HTML of the result section and log it to the console
    const resultHTML = await resultSection.innerHTML();
    console.log("Analysis Result HTML:", resultHTML); // Log HTML to see what is in the result section

    // Optionally, you can log the inner text as well
    const resultText = await resultSection.innerText();
    console.log("Analysis Result Text:", resultText); // Log plain text of the result section

    // Expect the phrase to be present in the analyzed content
    await expect(resultSection).toContainText(
      "This is not a valid email. Please paste in a valid email and try again."
    );
  });
});

test.describe("Email Analysis Feature", () => {
  test("should analyze a valid email and display result with red or green annotations", async ({
    page,
  }) => {
    // Navigate to the email analysis page
    await page.goto("/email-analysis");

    // Ensure the page title is correct
    await expect(page.locator("h1")).toHaveText("Email Analysis");

    // Locate the email input field and enter a test email
    const emailInput = page.locator('textarea[name="emailContent"]');
    await emailInput.fill(`Dear User,
      Your account has been flagged for suspicious activity. 
      To secure your account, please verify your identity 
      by clicking the link below: [VERIFY IDENTITY LINK]
      Failure to do so may result in account suspension.   
      Best,
      Security Team`);

    // Click the submit button
    await page.locator('button:has-text("Submit")').click(); // Ensure correct text for submit button

    // Wait for analysis results to appear
    const resultSection = page.locator("#analysis-results");
    await expect(resultSection).toBeVisible({ timeout: 10000 });

    // Get the inner HTML of the result section and log it to the console
    const resultHTML = await resultSection.innerHTML();
    console.log("Analysis Result:", resultHTML);

    // Optionally, you can log the inner text as well
    const resultText = await resultSection.innerText();
    console.log("Analysis Result Text:", resultText);

    // Assert that result is visible
    await expect(resultSection).toBeVisible();

    // Check if there is any red annotation (indicating phishing, scam, suspicious)
    const redTextElements = resultSection.locator(
      '*[style*="color: red"], *[class*="text-red"], span, p'
    );
    const redTextCount = await redTextElements.count();
    console.log("Red Text Elements Count:", redTextCount);
    expect(redTextCount).toBeGreaterThan(0); // Expect at least one red annotation

    // Optionally, check for green annotations (valid, safe email) - adjust class or styles accordingly
    const greenTextElements = resultSection.locator(
      '*[style*="color: green"], *[class*="text-green"], span, p'
    );
    const greenTextCount = await greenTextElements.count();
    console.log("Green Text Elements Count:", greenTextCount);
    expect(greenTextCount).toBeGreaterThan(0); // Expect at least one green annotation (if applicable)
  });
});
