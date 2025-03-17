"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react"; // Import shield icon

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
      // Step 1: Submit the URL and get the analysis ID
      const submitResponse = await fetch(
        `/api/virustotal/url?url=${encodeURIComponent(url)}`,
      );
      const submitData = await submitResponse.json();

      if (!submitData.analysisId) {
        throw new Error("Failed to get analysis ID");
      }

      // Instead of fetching results here, redirect to the results page
      router.push(`/scan/url/${submitData.analysisId}`);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center justify-center p-4">
      <div className="text-primary mb-2">
        <Shield size={48} />
      </div>

      <h1 className="mb-2 text-center text-3xl font-bold">URL Scanner</h1>

      <p className="mb-6 text-center text-sm text-neutral-600">
        Scan URLs, domains, and IP addresses to detect potential security
        threats
      </p>

      <div className="w-full rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-medium">Enter a URL to scan</h2>
        <p className="mb-4 text-sm text-neutral-600">
          We'll check the URL against multiple security databases to identify
          potential threats.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            type="search"
            placeholder="Enter URL, domain, or IP address"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            className="flex-grow"
          />
          <Button
            onClick={handleScan}
            disabled={loading || !isValidUrl}
            className="whitespace-nowrap"
          >
            {loading ? "Scanning..." : "Scan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
