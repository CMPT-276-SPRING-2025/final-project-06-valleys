"use client";  

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Locate } from "lucide-react";

export default function IPScanPage() {
  const [ipAddress, setIpAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingIP, setIsLoadingIP] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Regular expression for validating IP addresses
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Clear any previous errors
    setErrorMessage("");
    
    // Validate IP address format
    if (!ipRegex.test(ipAddress)) {
      setErrorMessage("Please enter a valid IPv4 address (e.g., 192.168.1.1)");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit IP for scanning - using the new API route
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

      // Redirect to results page with the analysis ID
      router.push(`/scan/ip/${data.analysisId}`);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "Failed to scan IP address. Please try again.");
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
        throw new Error("Could not detect your IP address");
      }
    } catch (error) {
      console.error("Error fetching IP:", error);
      setErrorMessage("Failed to detect your IP address. Please enter it manually.");
    } finally {
      setIsLoadingIP(false);
    }
  };

  return (
    <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center justify-center p-4">
      <div className="text-primary mb-2">
        <Shield size={48} />
      </div>

      <h1 className="mb-2 text-center text-3xl font-bold">IP Address Scanner</h1>

      <p className="mb-6 text-center text-sm text-neutral-600">
        Scan IP addresses to detect potential security threats and gather intelligence
      </p>

      <div className="w-full rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-medium">Enter an IP address to scan</h2>
        <p className="mb-4 text-sm text-neutral-600">
          We'll check the IP address against multiple security databases to identify
          potential threats and provide detailed information.
        </p>

        {errorMessage && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-4 md:gap-2">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="text"
              placeholder="Enter IP address (e.g., 8.8.8.8)"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              disabled={isSubmitting || isLoadingIP}
              className="flex-grow"
            />
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={getMyIP}
                disabled={isSubmitting || isLoadingIP}
                className="whitespace-nowrap"
              >
                {isLoadingIP ? (
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                ) : (
                  <Locate className="mr-2 h-4 w-4" />
                )}
                My IP
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || isLoadingIP || !ipAddress.trim() || !ipRegex.test(ipAddress)}
                className="whitespace-nowrap"
              >
                {isSubmitting ? "Scanning..." : "Scan"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
