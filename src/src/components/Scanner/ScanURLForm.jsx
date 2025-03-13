"use client"; 

import { useState } from "react";
import { Button } from "@/components/button"; 
import { Input } from "@/components/input"; 

export default function ScanUrlForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false); 
  const [analysisResults, setAnalysisResults] = useState(null); 

  const handleScan = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Submit the URL and get the analysis ID
      const submitResponse = await fetch(
        `/api/virustotal/url?url=${encodeURIComponent(url)}`,
      );
      const submitData = await submitResponse.json();

      if (!submitData.analysisId) {
        throw new Error("Failed to get analysis ID");
      }

      // Step 2: Fetch analysis results using the analysis ID
      const analysisResponse = await fetch(
        `/api/virustotal/analysis?id=${submitData.analysisId}`,
      );
      const analysisData = await analysisResponse.json();

      if (analysisResponse.ok) {
        setAnalysisResults(analysisData); 
      } else {
        throw new Error(
          analysisData.error || "Failed to fetch analysis results",
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 flex flex-col space-y-4">
      <h1 className="text-center text-2xl font-bold">
        Scan URL with VirusTotal
      </h1>
      <Input
        type="search"
        placeholder="Enter URL to scan"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={loading}
      />
      <Button onClick={handleScan} disabled={loading}>
        {loading ? "Scanning..." : "Scan URL"}
      </Button>

      {/* Display analysis results */}
      {analysisResults && (
        <div className="mt-4 rounded-lg bg-gray-100 p-4">
          <h2 className="text-xl font-bold">Analysis Results</h2>
          <pre>{JSON.stringify(analysisResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
