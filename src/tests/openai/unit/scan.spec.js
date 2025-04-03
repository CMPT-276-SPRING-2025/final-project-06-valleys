//unit test for openAI api on email quiz feature

import { test, expect } from "@playwright/test";

test.describe("OpenAI Quiz API Tests", () => {
  test("makes a real API request to quiz endpoint", async ({ request }) => {
    // Submit request to the quiz API
    const response = await request.post("/api/OpenAI/quiz", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Quiz API Response Status:", response.status());

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    console.log("Quiz API Response Data Structure:", Object.keys(data));

    expect(data).toHaveProperty("questions");
    expect(Array.isArray(data.questions)).toBeTruthy();

    if (data.questions.length > 0) {
      const question = data.questions[0];
      expect(question).toHaveProperty("fake_subject");
      expect(question).toHaveProperty("real_subject");
      expect(question).toHaveProperty("fake_email");
      expect(question).toHaveProperty("real_email");
      expect(question).toHaveProperty("fake_message");
      expect(question).toHaveProperty("real_message");
      expect(question).toHaveProperty("correct_email");
    }
  });
});
