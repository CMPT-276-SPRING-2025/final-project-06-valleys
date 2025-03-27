"use client";

import * as React from "react";
import ShieldLogo from "../../components/shieldlogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";

export default function EmailAnalysis() {
  const [text, setText] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";
  };

  const isFormValid = text.trim() !== "" || file !== null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);

    const formData = new FormData();
    if (text) formData.append("text", text);
    if (file) formData.append("file", file);

    try {
      const response = await fetch("/api/OpenAI/emailAnalysis", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data.annotatedHtml);
    } catch (error) {
      console.error("Failed to analyze email:", error);
      setResult(`<p style="color:red;">${error.message}</p>`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      {/* <div className="flex-1 flex items-center justify-center"> */}
      {/* Centered Logo and Title */}
      <div className="mb-4 flex flex-shrink-0 flex-col items-center">
        <ShieldLogo />
        <h1 className="mt-4 text-3xl font-bold">Email Analysis</h1>
        <p className="mt-2 text-center text-gray-600">
          AI-powered tool to analyze emails for potential phishing indicators.
        </p>
        {/* </div> */}
      </div>

      {/* Main Content (Two Columns) */}
      <div className="grid w-full max-w-screen-lg gap-6 p-4 md:grid-cols-2">
        {/* Left Column - Card */}
        <Card className="max-h-max p-4 shadow-lg">
          <CardHeader>
            <CardTitle>Email Content</CardTitle>
            <CardDescription>
              Paste the email content or upload a file for analysis.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Text Area */}
            <textarea
              className="h-48 w-full rounded-md border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Paste the full content here, including headers if available..."
              value={text}
              onChange={handleTextChange}
            />

            <p className="text-blue-00 mt-2 text-sm">
              Or upload a <span className="font-semibold">.txt</span> file.
            </p>

            <div className="mt-4 flex items-center space-x-2">
              {/* File Upload Button */}
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-md px-4 py-2 text-sm text-white transition hover:bg-blue-500"
                style={{ backgroundColor: "#5e7ab8" }}
              >
                Choose File
              </label>

              {/* Hidden but accessible input */}
              <input
                id="file-upload"
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="absolute h-0 w-0 overflow-hidden"
              />

              {/* File Name or Placeholder with Remove option */}
              {file ? (
                <div
                  className="relative flex cursor-pointer items-center"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={handleRemoveFile}
                >
                  <span className="mr-2 text-sm text-gray-500">
                    {file.name}
                  </span>
                  <span
                    className={`text-red-500 transition-opacity ${isHovering ? "opacity-100" : "opacity-0"}`}
                  >
                    <X size={16} />
                  </span>

                  {/* Overlay hint on hover */}
                  {isHovering && (
                    <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center rounded">
                      <span className="sr-only">Remove file</span>
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-sm text-gray-500">No file chosen</span>
              )}
            </div>
          </CardContent>

          {/* Submit Button */}
          <CardFooter>
            <Button
              className="w-full"
              disabled={!isFormValid || loading}
              variant={isFormValid ? "default" : "secondary"}
              onClick={handleSubmit}
            >
              {loading ? "Analyzing..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>

        {/* Right Column - Result */}
        {result && (
          <div
            className="max-h-[500px] overflow-y-auto rounded-md border bg-white p-4 shadow-md"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        )} 
     </div> 

  
    </div>
  );
}
