import { POST } from '@/app/api/virustotal/file/route';

describe('VirusTotal File Upload API', () => {
  // Helper to create a mock file
  const createMockFile = (name = 'test.txt', size = 1024, type = 'text/plain') => {
    const buffer = new ArrayBuffer(size);
    const file = new File([buffer], name, { type });
    
    file.arrayBuffer = jest.fn().mockResolvedValue(buffer);
    
    return file;
  };

  const createMockFormData = (file) => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    
    formData.get = jest.fn((key) => {
      if (key === 'file') return file;
      return null;
    });
    
    return formData;
  };

  it('returns 400 if no file is uploaded', async () => {
    const request = {
      formData: jest.fn().mockResolvedValue(createMockFormData(null)),
    };

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(response.data).toEqual({ error: 'No file uploaded' });
  });

  it('returns 400 if file size exceeds limit', async () => {
    const largeFile = createMockFile('large.txt', 33 * 1024 * 1024);
    
    const request = {
      formData: jest.fn().mockResolvedValue(createMockFormData(largeFile)),
    };

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(response.data).toEqual({ error: 'File size exceeds the 32MB limit' });
  });

  it('successfully uploads file to VirusTotal', async () => {
    const validFile = createMockFile('valid.txt', 1024);
    
    const request = {
      formData: jest.fn().mockResolvedValue(createMockFormData(validFile)),
    };

    // Mock successful VirusTotal response
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          data: {
            id: 'test-analysis-id',
            type: 'analysis',
          },
        }),
      })
    );

    const response = await POST(request);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.virustotal.com/api/v3/files',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'x-apikey': process.env.VIRUSTOTAL_API_KEY,
        }),
      })
    );

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      analysisId: 'test-analysis-id',
      fileName: 'valid.txt',
      fileSize: 1024,
      status: 'queued'
    });
  });

  it('handles VirusTotal API error', async () => {
    const validFile = createMockFile('valid.txt', 1024);
    
    const request = {
      formData: jest.fn().mockResolvedValue(createMockFormData(validFile)),
    };

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 403,
        json: () => Promise.resolve({
          error: {
            message: 'API key invalid',
          },
        }),
      })
    );

    const response = await POST(request);

    expect(response.status).toBe(403);
    expect(response.data).toEqual({ error: 'API key invalid' });
  });

  it('handles unexpected errors', async () => {
    const request = {
      formData: jest.fn().mockRejectedValue(new Error('Unexpected error')),
    };

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(response.data).toEqual({ error: 'Failed to process file upload' });
  });
});