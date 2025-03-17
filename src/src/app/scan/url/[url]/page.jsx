"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

// Import components
import { LoadingState } from "@/components/Scanner/LoadingState";
import { ErrorState } from "@/components/Scanner/ErrorState";
import { ResultsChart } from "@/components/Scanner/ResultsChart";
import { StatsCards } from "@/components/Scanner/StatsCards";
import { AdditionalStats } from "@/components/Scanner/AdditionalStats";
import { SecurityVendorsTable } from "@/components/Scanner/SecurityVendorsTable";
import { URLInformation } from "@/components/Scanner/URLInformation";
import { RawResults } from "@/components/Scanner/RawResults";

// Import utilities
import { prepareChartData } from "@/utils/chartUtils";

export default function URLResultPage() {
  const params = useParams();
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const analysisId = params.url;
    let pollingInterval;

    const fetchResults = async () => {
      try {
        const analysisResponse = await fetch(
          `/api/virustotal/analysis?id=${analysisId}`,
        );
        const analysisData = await analysisResponse.json();

        if (!analysisResponse.ok) {
          throw new Error(
            analysisData.error || "Failed to fetch analysis results",
          );
        }

        setAnalysisResults(analysisData);

        // Check if the analysis is completed
        if (analysisData.data?.attributes?.status === "completed") {
          clearInterval(pollingInterval);
          setLoading(false);
        } else if (analysisData.data?.attributes?.status === "failed") {
          clearInterval(pollingInterval);
          setError("Analysis failed. Please try again.");
          setLoading(false);
        }
        // If status is still "queued" or "in-progress", we'll continue polling
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        clearInterval(pollingInterval);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchResults();

    // Set up polling every 5 seconds
    pollingInterval = setInterval(fetchResults, 5000);

    // Clean up interval on component unmount
    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [params.url]);

  // Prepare chart data
  if (loading) {
    return (
      <LoadingState 
        status={analysisResults?.data?.attributes?.status} 
      />
    );
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  const stats = analysisResults?.data?.attributes?.stats;
  const chartData = prepareChartData(stats);
  const totalEngines = chartData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Results:
        {analysisResults.meta.url_info.url ? (
          <>
            <Button 
              variant="link" 
              asChild
              className="truncate text-base md:text-3xl"
            >
              <Link href={analysisResults.meta.url_info.url} target="_blank">
                {analysisResults.meta.url_info.url}
                <ExternalLink className="ml-1 hidden h-4 w-4 md:inline-block" />
              </Link>
            </Button>
          </>
        ) : null}
      </h1>

      {analysisResults && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className={"text-2xl"}>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {stats && (
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold">Summary</h3>

                {/* Chart section */}
                <div className="mb-6 flex flex-col items-center justify-center md:flex-row">
                  <ResultsChart chartData={chartData} />
                  <StatsCards stats={stats} totalEngines={totalEngines} />
                </div>

                {/* Additional stats in grid */}
                <AdditionalStats stats={stats} totalEngines={totalEngines} />
              </div>
            )}

            {/* Security Vendors Analysis */}
            {analysisResults.data?.attributes?.results && (
              <SecurityVendorsTable 
                results={analysisResults.data.attributes.results} 
              />
            )}

            {/* URL Information */}
            {analysisResults.data?.attributes?.url && (
              <URLInformation 
                url={analysisResults.data.attributes.url} 
              />
            )}

            {/* Raw Results (Collapsible) */}
            <RawResults data={analysisResults} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}