import { POST } from '@/app/api/OpenAI/emailAnalysis/route';

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  }));
});

import OpenAI from "openai"; 

describe('POST function', () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = {
      formData: jest.fn().mockResolvedValue(new Map([
        ['text', 'Is this a scam?']
      ])),
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should successfully analyze email content', async () => {
    OpenAI.mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{
              message: {
                content: '<p>This email looks suspicious.</p>',
              },
            }],
          }),
        },
      },
    }));

    const response = await POST(mockRequest);
    expect(response.data).toEqual( { annotatedHtml: '<p>This email looks suspicious.</p>'  });
    expect(response.status).toBe(200);
  });

  it('should return 400 if text is missing', async () => {
    mockRequest.formData.mockResolvedValue(new Map());
    const response = await POST(mockRequest);
    expect(response.data).toEqual({ error: 'Email content is required' });
    expect(response.status).toBe(400);
  });

  it('should return 500 if OpenAI API fails', async () => {
    OpenAI.mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockRejectedValue(new Error('OpenAI API error')),
        },
      },
    }));

    const response = await POST(mockRequest);
    expect(response.data).toEqual({ error: 'Failed to analyze email' });
    expect(response.status).toBe(500);
  });
});
