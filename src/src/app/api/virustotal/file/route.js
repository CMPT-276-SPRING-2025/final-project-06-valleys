import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (file.size > 32 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds the 32MB limit' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create form data for VirusTotal
    const vtFormData = new FormData();
    vtFormData.append('file', new Blob([buffer]), file.name);

    // Upload to VirusTotal
    const vtResponse = await fetch('https://www.virustotal.com/api/v3/files', {
      method: 'POST',
      headers: {
        'x-apikey': process.env.VIRUSTOTAL_API_KEY,
      },
      body: vtFormData,
    });

    if (!vtResponse.ok) {
      const errorData = await vtResponse.json();
      return NextResponse.json({ 
        error: errorData.error?.message || 'Failed to upload to VirusTotal' 
      }, { status: vtResponse.status });
    }

    const vtData = await vtResponse.json();

    return NextResponse.json({ 
      analysisId: vtData.data.id,
      fileName: file.name,
      fileSize: file.size,
      status: 'queued'
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to process file upload' 
    }, { status: 500 });
  }
}