"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LoadingState } from "@/components/Scanner/LoadingState";
import { ErrorState } from "@/components/Scanner/ErrorState";
import { ResultsChart } from "@/components/Scanner/ResultsChart";
import { StatsCards } from "@/components/Scanner/StatsCards";
import { AdditionalStats } from "@/components/Scanner/AdditionalStats";
import { SecurityVendorsTable } from "@/components/Scanner/SecurityVendorsTable";
import { CommentsSection } from "@/components/Scanner/CommentsSection";

import { prepareChartData } from "@/utils/chartUtils";

export default function IPResultPage() {
  const params = useParams();
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const ipAddress = params.ip;
    let pollingInterval;

    const fetchResults = async () => {
      try {
        const analysisResponse = await fetch(
          `/api/virustotal/ip/analyze?ip=${ipAddress}`
        );
        const analysisData = await analysisResponse.json();

        if (!analysisResponse.ok) {
          throw new Error(
            analysisData.error || "Failed to fetch analysis results"
          );
        }

        setAnalysisResults(analysisData);

        if (analysisData.data && analysisData.data.attributes) {
          clearInterval(pollingInterval);
          // Mark loading as complete but don't hide loading screen yet
          setLoadingComplete(true);
        } else if (analysisData.error) {
          clearInterval(pollingInterval);
          setError("Analysis failed. Please try again.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        clearInterval(pollingInterval);
        setLoading(false);
      }
    };

    fetchResults();

    pollingInterval = setInterval(fetchResults, 5000);

    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [params.ip]);

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

  // Calculate stats from last_analysis_results if stats is not available
  let stats = analysisResults?.data?.attributes?.stats;
  if (!stats && analysisResults?.data?.attributes?.last_analysis_results) {
    const results = analysisResults.data.attributes.last_analysis_results;
    stats = Object.values(results).reduce((acc, result) => {
      const category = result.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
  }

  const chartData = prepareChartData(stats);
  const totalEngines = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {analysisResults && showResults && (
        <Card className="w-full gap-2">
          <CardHeader>
            <CardTitle className={""}>
              <h1 className="text-3xl font-bold">
                Results For IP:&nbsp;
                {analysisResults.data?.id ? (
                  <span className="text-primary truncate text-base md:text-3xl">
                    {analysisResults.data.id}
                  </span>
                ) : null}
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* IP Information */}
            {analysisResults.data?.attributes && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">IP Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        IP Address
                      </p>
                      <p>{analysisResults.data.id}</p>
                    </div>
                    {analysisResults.data.attributes.country && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Country
                        </p>
                        <p>{analysisResults.data.attributes.country}</p>
                      </div>
                    )}
                    {analysisResults.data.attributes.as_owner && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          AS Owner
                        </p>
                        <p>{analysisResults.data.attributes.as_owner}</p>
                      </div>
                    )}
                    {analysisResults.data.attributes.continent && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Continent
                        </p>
                        <p>{analysisResults.data.attributes.continent}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            {stats && (
              <div className="my-6">
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
            {analysisResults.data?.attributes?.last_analysis_results && (
              <SecurityVendorsTable
                results={analysisResults.data.attributes.last_analysis_results}
              />
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
