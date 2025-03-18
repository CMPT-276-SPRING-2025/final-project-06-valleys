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
                'x-apikey': process.env.VIRUSTOTAL_API_KEY, 
            },
        };

        // Fetch the main analysis data
        const analysisResponse = await fetch(
            `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
            options
        );
        const analysisData = await analysisResponse.json();

        // If we have a URL ID in the analysis data, fetch additional information
        let commentsData = null;
        let votesData = null;
        let historicalAnalysesData = null;
        
        if (analysisData.data?.links?.item) {
            // Extract the URL ID from the item link
            const itemUrl = analysisData.data.links.item;
            const urlId = itemUrl.split('/').pop();
            
            // Fetch comments for this URL
            const commentsResponse = await fetch(
                `https://www.virustotal.com/api/v3/urls/${urlId}/comments?limit=10`,
                options
            );
            
            if (commentsResponse.ok) {
                commentsData = await commentsResponse.json();
            }
            
            // Fetch votes for this URL
            const votesResponse = await fetch(
                `https://www.virustotal.com/api/v3/urls/${urlId}/votes?limit=10`,
                options
            );
            
            if (votesResponse.ok) {
                votesData = await votesResponse.json();
            }
            
            // Fetch historical analyses for this URL
            const historicalAnalysesResponse = await fetch(
                `https://www.virustotal.com/api/v3/urls/${urlId}/analyses?limit=5`,
                options
            );
            
            if (historicalAnalysesResponse.ok) {
                historicalAnalysesData = await historicalAnalysesResponse.json();
            }
        }

        // Combine all data into a single response
        const responseData = {
            ...analysisData,
            comments: commentsData,
            votes: votesData,
            historicalAnalyses: historicalAnalysesData
        };

        // Return the combined results
        return NextResponse.json(responseData);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}