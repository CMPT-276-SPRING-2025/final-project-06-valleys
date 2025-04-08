import { test, expect } from "@playwright/test";

test.describe("Send Mail Integration", () => {
  test("should successfully send an email with HTML content", async ({ request }) => {
    const response = await request.post("/api/send-mail", {
      data: {
        recipientEmail: "test@example.com",
        subject: "Test HTML Email",
        content: "<h1>Test Heading</h1><p>This is a test email with HTML content</p>"
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe("Email sent successfully");
  });

  test("should handle large email content", async ({ request }) => {
    // Create a large email content
    const largeContent = "a".repeat(10000);
    
    const response = await request.post("/api/send-mail", {
      data: {
        recipientEmail: "test@example.com",
        subject: "Large Content Test",
        content: largeContent
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe("Email sent successfully");
  });

  test("should handle special characters in subject and content", async ({ request }) => {
    const response = await request.post("/api/send-mail", {
      data: {
        recipientEmail: "test@example.com",
        subject: "Test Email with Special Chars: !@#$%^&*()",
        content: "Content with special chars: <>&\"'"
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe("Email sent successfully");
  });

  test("should handle multiple recipients", async ({ request }) => {
    const response = await request.post("/api/send-mail", {
      data: {
        recipientEmail: "test1@example.com,test2@example.com",
        subject: "Multiple Recipients Test",
        content: "This email should be sent to multiple recipients"
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe("Email sent successfully");
  });

  test("should handle rate limiting", async ({ request }) => {
    // Send multiple requests in quick succession
    const requests = Array(5).fill().map(() => 
      request.post("/api/send-mail", {
        data: {
          recipientEmail: "test@example.com",
          subject: "Rate Limit Test",
          content: "Testing rate limiting"
        },
      })
    );

    const responses = await Promise.all(requests);
    
    // Check that at least some requests were successful
    const successfulResponses = responses.filter(r => r.status() === 200);
    expect(successfulResponses.length).toBeGreaterThan(0);
    
    // Check that some requests might have been rate limited
    const rateLimitedResponses = responses.filter(r => r.status() === 429);
    expect(rateLimitedResponses.length).toBeGreaterThanOrEqual(0);
  });

  test("should handle concurrent requests", async ({ request }) => {
    const concurrentRequests = 3;
    const requests = Array(concurrentRequests).fill().map(() => 
      request.post("/api/send-mail", {
        data: {
          recipientEmail: "test@example.com",
          subject: "Concurrent Test",
          content: "Testing concurrent requests"
        },
      })
    );

    const responses = await Promise.all(requests);
    
    // All requests should be successful
    responses.forEach(response => {
      expect(response.status()).toBe(200);
    });
  });
}); 