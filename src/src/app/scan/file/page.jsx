"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FileScanPage() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file) => {
    setErrorMessage("");
    
    // Check file size (max 32MB)
    if (file.size > 32 * 1024 * 1024) {
      setErrorMessage("File size exceeds the 32MB limit");
      return;
    }
    
    setFile(file);
  };

  // Update the handleSubmit function in the existing file
  const handleSubmit = async () => {
    if (!file) {
      setErrorMessage("Please select a file to scan");
      return;
    }
  
    setIsSubmitting(true);
    setErrorMessage("");
  
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await fetch("/api/virustotal/file", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload file");
      }
  
      const analysisId = data.analysisId || data.data?.id;
      if (!analysisId) {
        throw new Error("Failed to get analysis ID from response");
      }
  
      // Redirect to results page
      router.push(`/scan/file/${analysisId}`);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "Failed to scan file. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center justify-center p-4">
      <div className="text-primary mb-2">
        <Shield size={48} />
      </div>

      <h1 className="mb-2 text-center text-3xl font-bold">File Scanner</h1>

      <p className="mb-6 text-center text-sm text-neutral-600">
        Upload suspicious files for analysis by multiple antivirus services
      </p>

      <div className="w-full rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-medium">Upload a file to scan</h2>
        <p className="mb-4 text-sm text-neutral-600">
          We'll analyze your file using multiple antivirus engines to detect potential threats
        </p>

        {errorMessage && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <div 
          className={`mb-4 flex relative hover:bg-primary/10 flex-col items-center justify-center rounded-md border-2 border-dashed p-8 transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mb-2 text-primary">
            <Upload size={32} />
          </div>
          <p className="mb-2 text-center text-sm">Click to upload or drag and drop</p>
          <p className="text-center text-xs text-gray-500">Max file size: 32MB</p>
          
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />
        </div>

        {file && (
          <div className="mb-4 rounded-md bg-gray-50 p-3">
            <p className="text-sm font-medium">Selected file:</p>
            <p className="text-sm">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !file}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
              Scanning...
            </>
          ) : (
            "Scan File"
          )}
        </Button>
      </div>
    </div>
  );
}
