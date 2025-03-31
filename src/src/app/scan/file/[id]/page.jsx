"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LoadingState } from "@/components/Scanner/LoadingState";
import { ErrorState } from "@/components/Scanner/ErrorState";
import { ResultsChart } from "@/components/Scanner/ResultsChart";
import { StatsCards } from "@/components/Scanner/StatsCards";
import { SecurityVendorsTable } from "@/components/Scanner/SecurityVendorsTable";

import { prepareChartData } from "@/utils/chartUtils";

import { FileMetadata } from "@/components/Scanner/FileMetadata";

export default function FileResultPage() {
  const params = useParams();
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const analysisId = params.id;
    let pollingInterval;

    const fetchResults = async () => {
      try {
        const analysisResponse = await fetch(
          `/api/virustotal/file/analyze?id=${analysisId}`
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
        // If status is still "queued" or "in-progress", continue polling
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
  }, [params.id]);

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
              <h1 className="text-3xl font-bold">File Scan Results</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysisResults.meta?.file_info && (
              <FileMetadata fileInfo={analysisResults.meta.file_info} />
            )}

            {stats && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold">Summary</h3>

                {/* Chart section */}
                <div className="mb-6 flex flex-col items-center justify-center md:flex-row">
                  <ResultsChart chartData={chartData} />
                  <StatsCards stats={stats} totalEngines={totalEngines} />
                </div>
              </div>
            )}

            {/* Security Vendors Analysis */}
            {analysisResults.data?.attributes?.results && (
              <SecurityVendorsTable
                results={analysisResults.data.attributes.results}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
