import { NextResponse } from 'next/server';

export async function GET(request) {
    // Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        // Submit the URL to VirusTotal for scanning
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                'x-apikey': process.env.VIRUSTOTAL_API_KEY, 
            },
            body: new URLSearchParams({ url }).toString(),
        };

        const response = await fetch(
            'https://www.virustotal.com/api/v3/urls',
            options
        );
        const data = await response.json();

        if (!data.data || !data.data.id) {
            throw new Error("Invalid response from VirusTotal");
        }

        // Return the analysis ID to the client
        return NextResponse.json({ analysisId: data.data.id });
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}