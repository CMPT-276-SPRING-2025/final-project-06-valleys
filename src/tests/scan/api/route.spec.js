//unit test for openAI api on email quiz feature

import { test, expect } from "@playwright/test";
import { POST } from "../../../app/api/OpenAI/quiz/route";

test.describe("Unit Test: API src/src/app/api/OpenAI/quiz", () => {
  test("returns valid question JSON from OpenAI", async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                questions: [
                  {
                    fake_subject: "Suspicious Login",
                    real_subject: "Your sign-in alert",
                    fake_email: "security@not-google.com",
                    real_email: "noreply@google.com",
                    fake_message: "Reset your password urgently",
                    real_message: "Your login was successful",
                    correct_email: "noreply@google.com",
                  },
                ],
              }),
            },
          },
        ],
      }),
    });

    const request = { json: async () => ({}) };
    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.questions).toHaveLength(1);
    expect(result.questions[0]).toHaveProperty("fake_email");
  });
  
  test("returns 500 on malformed JSON", async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: "INVALID_JSON" } }],
      }),
    });

    const request = { json: async () => ({}) };
    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result).toHaveProperty("error");
  });
});
