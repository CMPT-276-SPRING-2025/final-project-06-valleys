"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { saveToRecentScans } from "@/utils/scanHistory";

export default function ScanUrlForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const router = useRouter();

  // Validate URL whenever the input changes
  useEffect(() => {
    // Simple URL validation regex
    const urlPattern =
      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    setIsValidUrl(urlPattern.test(url));
  }, [url]);

  const handleScan = async () => {
    if (!isValidUrl) {
      alert("Please enter a valid URL");
      return;
    }

    setLoading(true);

    try {
      const submitResponse = await fetch(
        `/api/virustotal/url?url=${encodeURIComponent(url)}`
      );
      const submitData = await submitResponse.json();

      if (!submitData.analysisId) {
        throw new Error("Failed to get analysis ID");
      }

      // Save to recent scans
      saveToRecentScans("url", submitData.analysisId, url);

      // Redirect to the results page
      router.push(`/scan/url/${submitData.analysisId}`);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full rounded-lg bg-white p-6 shadow-sm"
      data-testid="url-scan-form"
    >
      <h2 className="mb-1 text-xl font-medium">Enter a URL to scan</h2>
      <p className="mb-4 text-sm text-neutral-600">
        We'll check the URL against multiple security databases to identify
        potential threats.
      </p>

      <div className="flex flex-col gap-4">
        <Input
          type="search"
          placeholder="Enter URL To Scan"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          className="flex-grow"
          data-testid="url-input"
        />
        <Button
          onClick={handleScan}
          disabled={loading || !isValidUrl}
          className="whitespace-nowrap"
          data-testid="scan-url-button"
        >
          {loading ? "Scanning URL..." : "Scan URL"}
        </Button>
      </div>
    </div>
  );
}
