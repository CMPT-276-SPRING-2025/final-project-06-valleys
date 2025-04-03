import { test, expect } from "@playwright/test";

test.describe("VirusTotal URL API", () => {
  test("returns 400 when no URL is provided", async ({ request }) => {
    // Make a request to the API without providing a URL
    const response = await request.get("/api/virustotal/url");

    // Check status code
    expect(response.status()).toBe(400);

    // Check response body
    const data = await response.json();
    expect(data).toEqual({ error: "URL is required" });
  });

  test("successfully submits URL to VirusTotal", async ({ request }) => {
    // Use a real URL for testing
    const testUrl = "https://example.com";

    // Make a request to the API with a URL
    const response = await request.get(`/api/virustotal/url?url=${testUrl}`);

    // Check if we got a successful response
    expect(response.status()).toBe(200);

    // Verify we got an analysis ID back
    const data = await response.json();
    expect(data).toHaveProperty("analysisId");
    console.log("VirusTotal API Response:", data);
  });

  test("successfully retrieves analysis results", async ({ request }) => {
    // First submit a URL to get an analysis ID
    const testUrl = "https://example.com";
    const submitResponse = await request.get(
      `/api/virustotal/url?url=${testUrl}`
    );
    expect(submitResponse.status()).toBe(200);

    const submitData = await submitResponse.json();
    expect(submitData).toHaveProperty("analysisId");

    // Now use that analysis ID to get the results
    const analysisId = submitData.analysisId;
    const analyzeResponse = await request.get(
      `/api/virustotal/url/analyze?id=${analysisId}`
    );

    // The analysis might not be complete immediately, so we'll check for either a 200 or a 202
    expect([200, 202]).toContain(analyzeResponse.status());

    const analyzeData = await analyzeResponse.json();
    console.log("Analysis Results Structure:", Object.keys(analyzeData));

    // If we got a 200, we should have a properly structured response
    if (analyzeResponse.status() === 200) {
      // Verify the structure of the response
      expect(analyzeData).toHaveProperty("data");
      expect(analyzeData.data).toHaveProperty("id");
      expect(analyzeData.data).toHaveProperty("type");
      expect(analyzeData.data).toHaveProperty("attributes");

      // Verify we have meta information
      expect(analyzeData).toHaveProperty("meta");

      // Log some useful information for debugging
      console.log("Analysis ID:", analyzeData.data.id);
      console.log("Analysis Type:", analyzeData.data.type);
    }
    // If we got a 202, the analysis is still in progress
    else if (analyzeResponse.status() === 202) {
      expect(analyzeData).toHaveProperty("message");
      console.log("Analysis in progress message:", analyzeData.message);
    }
  });
});
