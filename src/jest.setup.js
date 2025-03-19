// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn();

// Mock Request
global.Request = class Request {
  constructor(url) {
    this.url = url;
  }
};

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options = {}) => ({
      status: options.status || 200,
      data,
    })),
  },
}));

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
}); 