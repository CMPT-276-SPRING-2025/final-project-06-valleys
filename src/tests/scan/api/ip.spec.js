import { test, expect } from "@playwright/test";

test.describe("VirusTotal IP API", () => {
  test("returns 400 when no IP is provided", async ({ request }) => {
    const response = await request.get("/api/virustotal/ip");
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data).toEqual({ error: "IP address is required" });
  });

  test("successfully scans IP address", async ({ request }) => {
    const testIp = "8.8.8.8"; // Google's public DNS
    const response = await request.get(`/api/virustotal/ip?ip=${testIp}`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log("IP Scan Response Structure:", Object.keys(data));

    // Verify basic structure
    expect(data).toHaveProperty("data");
    expect(data.data).toHaveProperty("id");
    expect(data.data).toHaveProperty("type");
    expect(data.data.type).toBe("ip_address");
  });

  test("successfully retrieves IP analysis details", async ({ request }) => {
    const testIp = "8.8.8.8";
    const response = await request.get(
      `/api/virustotal/ip/analyze?ip=${testIp}`
    );
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log("IP Analysis Results Structure:", Object.keys(data));

    // Verify we have the expected data structure
    expect(data).toHaveProperty("data");
    expect(data.data).toHaveProperty("attributes");

    // Log some useful information
    if (data.data?.attributes?.last_analysis_stats) {
      console.log(
        "IP Analysis Stats:",
        data.data.attributes.last_analysis_stats
      );
    }
  });
});
