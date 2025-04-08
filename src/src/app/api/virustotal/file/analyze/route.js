import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Analysis ID is required" },
        { status: 400 }
      );
    }

    // Fetch analysis results from VirusTotal
    const response = await fetch(
      `https://www.virustotal.com/api/v3/analyses/${id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: errorData.error?.message || "Failed to fetch from VirusTotal",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
