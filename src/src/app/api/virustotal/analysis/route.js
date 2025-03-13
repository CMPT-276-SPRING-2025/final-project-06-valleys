import { NextResponse } from 'next/server';

export async function GET(request) {
    // Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const analysisId = searchParams.get('id');

    if (!analysisId) {
        return NextResponse.json({ error: 'Analysis ID is required' }, { status: 400 });
    }

    try {
        // Fetch analysis results from VirusTotal
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-apikey': process.env.VIRUSTOTAL_API_KEY, // Ensure this is set in your environment
            },
        };

        const response = await fetch(
            `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
            options
        );
        const data = await response.json();

        // Return the analysis results
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}