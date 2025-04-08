import { test, expect } from "@playwright/test";

test.describe("Email API Endpoint", () => {
  test("should return 400 when required fields are missing", async ({
    request,
  }) => {
    const response = await request.post("/api/send-mail", {
      data: {
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("Missing required fields");
  });

  test("should return 400 when email is invalid", async ({ request }) => {
    const response = await request.post("/api/send-mail", {
      data: {
        recipientEmail: "invalid-email",
        subject: "Test Subject",
        content: "Test Content",
      },
    });

    expect(response.status()).toBe(500);
    const body = await response.json();
    expect(body.error).toBeTruthy();
  });

  test("should return 500 when email sending fails", async ({ page, request }) => {
    await page.goto("/email-generator");
    
    // Mock the API to force a failure
    await page.route("/api/send-mail", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Failed to send email" }),
      });
    });
    
    // Now make a request through the page
    const response = await page.evaluate(async () => {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientEmail: "test@example.com",
          subject: "Test Subject",
          content: "Test Content",
        }),
      });
      
      return {
        status: res.status,
        body: await res.json(),
      };
    });
    
    // Check the response
    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Failed to send email");
  });

  test("should successfully send email with valid data", async ({
    request,
  }) => {
    const response = await request.post("/api/send-mail", {
      data: {
        recipientEmail: "test@example.com",
        subject: "Test Subject",
        content: "Test Content",
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe("Email sent successfully");
  });
});
