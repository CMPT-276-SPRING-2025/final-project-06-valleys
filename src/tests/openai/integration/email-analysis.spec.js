import { test, expect } from "@playwright/test";

test.describe("Email Analysis Feature", () => {
  test("should analyze an invalid email and display appropriate message", async ({
    page,
  }) => {
    // Navigate to the email analysis page
    await page.goto("/email-analysis");

    // Ensure the page title is correct
    await expect(page.locator("h1")).toHaveText("Email Analysis");

    // Locate the email input field and enter a test email using data-testid
    const emailInput = page.locator('[data-testid="email-content-textarea"]');
    await emailInput.fill(`hello this is scam`);

    // Click the submit button using data-testid
    await page.locator('[data-testid="analyze-button"]').click();

    // Wait for analysis results to appear using data-testid
    const resultSection = page.locator('[data-testid="analysis-results"]');
    await resultSection.waitFor({ state: "visible", timeout: 10000 });

    // Get the inner HTML of the result section and log it to the console
    const resultHTML = await resultSection.innerHTML();
    console.log("Analysis Result HTML:", resultHTML);

    // Optionally, you can log the inner text as well
    const resultText = await resultSection.innerText();
    console.log("Analysis Result Text:", resultText);

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
    // Set a longer timeout for this test as it makes a real API call
    test.setTimeout(30000);
    // Navigate to the email analysis page
    await page.goto("/email-analysis");

    // Ensure the page title is correct
    await expect(page.locator("h1")).toHaveText("Email Analysis");

    // Locate the email input field and enter a test email using data-testid
    const emailInput = page.locator('[data-testid="email-content-textarea"]');
    await emailInput.fill(`Dear User,
      Your account has been flagged for suspicious activity. 
      To secure your account, please verify your identity 
      by clicking the link below: [VERIFY IDENTITY LINK]
      Failure to do so may result in account suspension.   
      Best,
      Security Team`);

    // Click the submit button using data-testid
    const analyzeButton = page.locator('[data-testid="analyze-button"]');
    await expect(analyzeButton).toBeEnabled();
    await analyzeButton.click();

    // Wait for button to show loading state
    await expect(analyzeButton).toHaveText("Analyzing Email...");

    // Wait for button to return to normal state (indicating request completed)
    await expect(analyzeButton).toHaveText("Analyze Email", { timeout: 30000 });

    // Now check for results container
    const resultContainer = page.locator(
      '[data-testid="analysis-result-container"]'
    );
    await expect(resultContainer).toBeVisible({ timeout: 5000 });

    // Wait for analysis results to appear using data-testid
    const resultSection = page.locator('[data-testid="analysis-results"]');
    await expect(resultSection).toBeVisible({ timeout: 5000 });

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
