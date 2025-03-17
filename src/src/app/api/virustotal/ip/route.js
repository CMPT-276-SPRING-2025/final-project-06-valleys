import { NextResponse } from 'next/server';

export async function GET(request) {
    // Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const ip = searchParams.get('ip');

    if (!ip) {
        return NextResponse.json({ error: 'IP address is required' }, { status: 400 });
    }

    try {
        // Fetch IP information from VirusTotal
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-apikey': process.env.VIRUSTOTAL_API_KEY, // Ensure this is set in your environment
            },
        };

        const response = await fetch(
            `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
            options
        );
        const data = await response.json();

        // Return the IP information to the client
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}