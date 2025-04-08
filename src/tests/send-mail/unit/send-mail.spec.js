import { test, expect } from "@playwright/test";

test.describe("Email API Endpoint", () => {
  test("should return 400 when required fields are missing", async ({
    request,
  }) => {
    const response = await request.post("/api/send-mail", {
      data: {
        // Missing required fields
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

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("Invalid email format");
  });

  test("should return 500 when email sending fails", async ({ request }) => {
    // Mock nodemailer to simulate failure
    const response = await request.post("/api/send-mail", {
      data: {
        recipientEmail: "test@example.com",
        subject: "Test Subject",
        content: "Test Content",
      },
    });

    expect(response.status()).toBe(500);
    const body = await response.json();
    expect(body.error).toBe("Failed to send email");
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
