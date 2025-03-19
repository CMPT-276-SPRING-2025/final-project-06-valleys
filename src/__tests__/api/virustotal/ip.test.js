import { GET } from '@/app/api/virustotal/ip/route';

// Mock Request
global.Request = class Request {
  constructor(url) {
    this.url = url;
  }
};

describe('VirusTotal IP API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 when no IP is provided', async () => {
    const request = new Request('http://localhost:3000/api/virustotal/ip');
    const response = await GET(request);

    expect(response.status).toBe(400);
    expect(response.data).toEqual({ error: 'IP address is required' });
  });

  it('successfully fetches IP analysis results', async () => {
    const mockResponse = {
      data: {
        attributes: {
          last_analysis_stats: {
            harmless: 10,
            malicious: 0,
            suspicious: 0,
            undetected: 5,
          },
        },
      },
    };

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const request = new Request(
      'http://localhost:3000/api/virustotal/ip?ip=8.8.8.8'
    );
    const response = await GET(request);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.virustotal.com/api/v3/ip_addresses/8.8.8.8',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'x-apikey': process.env.VIRUSTOTAL_API_KEY,
        }),
      })
    );

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockResponse);
  });

  it('handles network error', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );

    const request = new Request(
      'http://localhost:3000/api/virustotal/ip?ip=8.8.8.8'
    );
    const response = await GET(request);

    expect(response.status).toBe(500);
    expect(response.data).toEqual({ error: 'Internal Server Error' });
  });
}); 