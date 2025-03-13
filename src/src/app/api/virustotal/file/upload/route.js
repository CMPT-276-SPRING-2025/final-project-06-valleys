import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // Get the file from the request
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'File is required' }, { status: 400 });
        }

        // Prepare the form data for VirusTotal
        const vtFormData = new FormData();
        vtFormData.append('file', file);

        // Make the request to VirusTotal
        const response = await fetch('https://www.virustotal.com/api/v3/files', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'x-apikey': process.env.VIRUSTOTAL_API_KEY, // Ensure this is set in your environment
            },
            body: vtFormData,
        });

        const data = await response.json();

        // Return the response from VirusTotal
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}