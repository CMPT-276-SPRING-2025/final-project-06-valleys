"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LoadingState } from "@/components/Scanner/LoadingState";
import { ErrorState } from "@/components/Scanner/ErrorState";
import { ResultsChart } from "@/components/Scanner/ResultsChart";
import { StatsCards } from "@/components/Scanner/StatsCards";
import { AdditionalStats } from "@/components/Scanner/AdditionalStats";
import { SecurityVendorsTable } from "@/components/Scanner/SecurityVendorsTable";
import { URLInformation } from "@/components/Scanner/URLInformation";
import { CommentsSection } from "@/components/Scanner/CommentsSection";

import { prepareChartData } from "@/utils/chartUtils";

export default function URLResultPage() {
  const params = useParams();
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const analysisId = params.url;
    let pollingInterval;

    const fetchResults = async () => {
      try {
        const analysisResponse = await fetch(
          `/api/virustotal/url/analyze?id=${analysisId}`
        );
        const analysisData = await analysisResponse.json();

        if (!analysisResponse.ok) {
          throw new Error(
            analysisData.error || "Failed to fetch analysis results"
          );
        }

        setAnalysisResults(analysisData);

        // Check if the analysis is completed
        if (analysisData.data?.attributes?.status === "completed") {
          clearInterval(pollingInterval);
          // Mark as complete but don't hide loading screen yet
          setLoadingComplete(true);
        } else if (analysisData.data?.attributes?.status === "failed") {
          clearInterval(pollingInterval);
          setError("Analysis failed. Please try again.");
          setLoading(false);
        }
        // If status is still "queued" or "in-progress", continue refreshing
      } catch (error) {
        setError(error.message);
        clearInterval(pollingInterval);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchResults();

    pollingInterval = setInterval(fetchResults, 5000);

    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [params.url]);

  // Handle the transition from loading to showing results
  useEffect(() => {
    if (loadingComplete) {
      // Wait for loading animation to complete before showing results
      const timer = setTimeout(() => {
        setLoading(false);
        setShowResults(true);
      }, 1500); 

      return () => clearTimeout(timer);
    }
  }, [loadingComplete]);

  if (loading) {
    return (
      <LoadingState
        status={
          loadingComplete
            ? "completed"
            : analysisResults?.data?.attributes?.status
        }
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
      {analysisResults && showResults && (
        <Card className="w-full gap-2">
          <CardHeader>
            <CardTitle className={""}>
              <h1 className="text-3xl font-bold">
                Results For:&nbsp;
                {analysisResults.meta.url_info.url ? (
                  <Link
                    href={analysisResults.meta.url_info.url}
                    target="_blank"
                    className="text-primary hover:text-primary/80 truncate text-base transition-colors md:text-3xl"
                  >
                    {analysisResults.meta.url_info.url}
                  </Link>
                ) : null}
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold">Summary</h3>

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
              <URLInformation url={analysisResults.data.attributes.url} />
            )}

            {/* Comments Section */}
            {analysisResults.comments && (
              <CommentsSection
                comments={analysisResults.comments.data}
                votes={analysisResults.votes?.data || []}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
