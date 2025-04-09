import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('VirusTotal File API', () => {
  // Create a test file
  let testFilePath;
  let largeFilePath;
  let invalidFilePath;
  
  test.beforeAll(async () => {
    // Create a temporary test file
    testFilePath = path.join(process.cwd(), 'test-file.txt');
    fs.writeFileSync(testFilePath, 'This is a test file for VirusTotal API testing');
    
    // Create a large test file (32MB - just over most API limits)
    largeFilePath = path.join(process.cwd(), 'large-test-file.bin');
    const largeBuffer = Buffer.alloc(33 * 1024 * 1024); // 33MB, 32MB is current limit
    fs.writeFileSync(largeFilePath, largeBuffer);
    
    // Create an invalid file (empty file with executable extension)
    invalidFilePath = path.join(process.cwd(), 'invalid-file.exe');
    fs.writeFileSync(invalidFilePath, '');
  });
  
  test.afterAll(async () => {
    // Clean up the test files
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
    if (fs.existsSync(largeFilePath)) {
      fs.unlinkSync(largeFilePath);
    }
    if (fs.existsSync(invalidFilePath)) {
      fs.unlinkSync(invalidFilePath);
    }
  });

  test('successfully submits file for scanning', async ({ request }) => {
    // Create a FormData object with the file
    const fileBuffer = fs.readFileSync(testFilePath);
    
    // Submit the file
    const response = await request.post('/api/virustotal/file', {
      multipart: {
        file: {
          name: 'test-file.txt',
          mimeType: 'text/plain',
          buffer: fileBuffer
        }
      }
    });
    
    // Check response
    expect([200, 202]).toContain(response.status());
    
    const data = await response.json();
    console.log('File Scan Response:', data);
    
    // If successful, we should have an analysis ID
    if (response.status() === 200) {
      expect(data).toHaveProperty('analysisId');
    }
  });
  
  test('handles oversized file upload', async ({ request }) => {
    // Read the large file
    const fileBuffer = fs.readFileSync(largeFilePath);
    
    // Submit the large file
    const response = await request.post('/api/virustotal/file', {
      multipart: {
        file: {
          name: 'large-test-file.bin',
          mimeType: 'application/octet-stream',
          buffer: fileBuffer
        }
      },
      timeout: 60000 // Increase timeout for large file upload
    });
    
    // We expect either a 413 (Payload Too Large) or a custom error response
    console.log('Large File Upload Status:', response.status());
    
    const data = await response.json();
    console.log('Large File Upload Response:', data);
    
    // Check that we got an error response
    expect(data).toHaveProperty('error');
  });
  
  test('handles invalid file upload', async ({ request }) => {
    // Read the invalid file
    const fileBuffer = fs.readFileSync(invalidFilePath);
    
    // Submit the invalid file
    const response = await request.post('/api/virustotal/file', {
      multipart: {
        file: {
          name: 'invalid-file.exe',
          mimeType: 'application/x-msdownload',
          buffer: fileBuffer
        }
      }
    });
    
    console.log('Invalid File Upload Status:', response.status());
    
    const data = await response.json();
    console.log('Invalid File Upload Response:', data);
    
    // The API should either reject the file or accept it but flag it
    // We'll check for either a specific error or a successful scan with warnings
    if (response.status() >= 400) {
      // If rejected, should have an error message
      expect(data).toHaveProperty('error');
    } else {
      // If accepted, should have an analysis ID
      expect(data).toHaveProperty('analysisId');
    }
  });
  // retrieving a File upload takes too long.
});