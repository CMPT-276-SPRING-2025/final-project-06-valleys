"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Locate } from "lucide-react";
import { saveToRecentScans } from "@/utils/scanHistory";

export default function IPScanForm() {
  const [ipAddress, setIpAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingIP, setIsLoadingIP] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Regular expression for validating IP addresses
  const ipRegex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    setErrorMessage("");

    // Validate IP address format
    if (!ipRegex.test(ipAddress)) {
      setErrorMessage("Please enter a valid IPv4 address (e.g., 192.168.1.1)");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit IP for scanning - using the IP route
      const response = await fetch("/api/virustotal/ip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip: ipAddress }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to scan IP address");
      }

      // Save to recent scans
      saveToRecentScans("ip", data.analysisId, ipAddress);

      // Redirect to results page with the analysis ID
      router.push(`/scan/ip/${data.analysisId}`);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        error.message || "Failed to scan IP address. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const getMyIP = async () => {
    setIsLoadingIP(true);
    setErrorMessage("");

    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();

      if (data.ip) {
        setIpAddress(data.ip);
      } else {
        throw new Error("Failed to get your IP address");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to get your IP address. Please try again.");
    } finally {
      setIsLoadingIP(false);
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-xl font-medium">Enter an IP address to scan</h2>
      <p className="mb-4 text-sm text-neutral-600">
        We'll check the IP address against multiple security databases to
        identify potential threats and provide detailed information.
      </p>

      {errorMessage && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row md:gap-2">
          <Input
            type="text"
            placeholder="Enter IP address (e.g., 8.8.8.8)"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            disabled={isSubmitting || isLoadingIP}
            className="flex-grow"
          />
          <Button
            type="button"
            variant="outline"
            onClick={getMyIP}
            disabled={isSubmitting || isLoadingIP}
            className="whitespace-nowrap"
          >
            {isLoadingIP ? "Loading..." : "Get My IP"}
            <Locate className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isLoadingIP || !ipRegex.test(ipAddress)}
          className="w-full"
        >
          {isSubmitting ? "Scanning..." : "Scan"}
        </Button>
      </form>
    </div>
  );
}
