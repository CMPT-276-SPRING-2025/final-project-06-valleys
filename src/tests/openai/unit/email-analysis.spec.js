import { test, expect } from "@playwright/test";

test.describe("Email Analysis API", () => {
  test("should return 400 when no email content is provided", async ({
    request,
  }) => {
    // Send a POST request with no email content to trigger 400
    const response = await request.post("/api/OpenAI/emailAnalysis", {
      form: {
        text: "",
      },
    });
    // Assert that the response status is 400 (Bad Request)
    expect(response.status()).toBe(400);

    // Assert that the error message is correct
    const responseBody = await response.json();
    expect(responseBody.error).toBe("Email content is required");
  });

  // For the failing test:
  test("should return 200 when sending texts", async ({ request }) => {
    // Send a POST request with a valid input
    const formData = new FormData();
    formData.append('text', 'This is a valid email');
    
    const response = await request.post("/api/OpenAI/emailAnalysis", {
      multipart: {
        text: "This is a valid email"
      }
    });
    
    // Assert that the response status is 200 (Successful Request)
    expect(response.status()).toBe(200);
  });

  test("should return 500 when an internal server error occurs", async ({
    request,
  }) => {
    // Mock an error scenario, this could be simulated by sending invalid data,
    // Send a POST request with valid email content but in plain text.
    const response = await request.post("/api/OpenAI/emailAnalysis", {
      body: "This is a valid email content.",
    });

    // Assert that the response status is 500 (Internal Server Error)
    expect(response.status()).toBe(500);

    const responseBody = await response.json();
    // Assert that the error message is correct
    expect(responseBody.error).toBe("Failed to analyze email");
  });
});
