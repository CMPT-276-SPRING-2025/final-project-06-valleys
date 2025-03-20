import { POST } from '@/app/api/OpenAI/emailAnalysis/route';
import * as prompt from '@/app/api/OpenAI/emailAnalysis/aiPrompt';
import OpenAI from 'openai';

jest.mock('openai', () => {
    return jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn(),
        },
      },
    }));
  });
  

describe('POST function', () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = {
      formData: jest.fn().mockResolvedValue(new Map([
        ['text', 'Is this a scam?'],
      ])),
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should successfully analyze email content', async () => {
    // Mock the OpenAI response
    const mockCreate = jest.fn().mockResolvedValue({
        choices: [{
          message: {
            content: '<p>This email looks suspicious.</p>',
          },
        }],
      });
    OpenAI.mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    }));

    const response = await POST(mockRequest);
    
    // Assert that the OpenAI API was called with the correct parameters
    expect(OpenAI).toHaveBeenCalledWith({
        baseURL: 'https://models.inference.ai.azure.com',
        apiKey: process.env['OPENAI_API_KEY'],
      });
    
    
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.arrayContaining([
          { role: 'system', content: `You are a scam detector. Identify potential scam keywords in the following email and annotate them.
        Highlight in green or red in HTML any suspicious words or phrases that may indicate a scam.` },
          { role: "user", content: prompt.scamEmailText },
          { role: "system", content: prompt.scamEmailAiResponse },
          { role: "user", content: prompt.notScamEmailText },
          { role: "system", content: prompt.notScamEmailAiResponse },]),
        model: 'gpt-4o',
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
      })
    );

    expect(response.data).toEqual({ annotatedHtml: '<p>This email looks suspicious.</p>' });
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
