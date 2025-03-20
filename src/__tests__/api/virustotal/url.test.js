import { GET } from "@/app/api/virustotal/url/route";

// Mock Request
global.Request = class Request {
  constructor(url) {
    this.url = url;
  }
};

describe("VirusTotal URL API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 when no URL is provided", async () => {
    const request = new Request("http://localhost:3000/api/virustotal/url");
    const response = await GET(request);

    expect(response.status).toBe(400);
    expect(response.data).toEqual({ error: "URL is required" });
  });

  it("successfully submits URL to VirusTotal", async () => {
    const mockResponse = {
      data: {
        id: "test-analysis-id",
      },
    };

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const request = new Request(
      "http://localhost:3000/api/virustotal/url?url=https://example.com"
    );
    const response = await GET(request);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.virustotal.com/api/v3/urls",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        }),
        body: expect.any(String),
      })
    );

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ analysisId: "test-analysis-id" });
  });

  it("handles invalid VirusTotal response", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ error: "Invalid response" }),
      })
    );

    const request = new Request(
      "http://localhost:3000/api/virustotal/url?url=https://example.com"
    );
    const response = await GET(request);

    expect(response.status).toBe(500);
    expect(response.data).toEqual({ error: "Internal Server Error" });
  });

  it("handles network error", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    const request = new Request(
      "http://localhost:3000/api/virustotal/url?url=https://example.com"
    );
    const response = await GET(request);

    expect(response.status).toBe(500);
    expect(response.data).toEqual({ error: "Internal Server Error" });
  });
});
