"use client";

import * as React from 'react';
import ShieldLogo from '../../components/shieldlogo';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function EmailAnalysis() {
  const [text, setText] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [result, setResult] = React.useState('');
  const [loading, setLoading] = React.useState(false); 

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const isFormValid = text.trim() !== '' || file !== null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true); 

    const formData = new FormData();
    if (text) formData.append('text', text);
    if (file) formData.append('file', file); // ✅ Fix: Append the file correctly

    try {
      const response = await fetch('/api/OpenAI/emailAnalysis', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data.annotatedHtml);
    } catch (error) {
      console.error('Failed to analyze email:', error);
      setResult(`<p style="color:red;">${error.message}</p>`);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Centered Logo and Title */}
      <div className="flex flex-col items-center mb-6">
        <ShieldLogo />
        <h1 className="text-3xl font-bold mt-4">Email Analysis</h1>
        <p className="text-gray-600 text-center mt-2">
          AI-powered tool to analyze emails for potential phishing indicators.
        </p>
      </div>

      {/* Main Content (Two Columns) */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Left Column - Card */}
        <Card className="p-4 shadow-lg">
          <CardHeader>
            <CardTitle>Email Content</CardTitle>
            <CardDescription>
              Paste the email content or upload a file for analysis.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Text Area */}
            <textarea
              className="w-full h-40 border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste the full content here, including headers if available..."
              value={text}
              onChange={handleTextChange}
            />

            <p className="text-blue-00 text-sm mt-2">
              Please upload only <span className="font-semibold">.txt</span> files.
            </p>

            <div className="flex items-center mt-4 space-x-2">
             {/* File Upload Button */}
             <label
               htmlFor="file-upload"
               className="px-4 py-2 text-sm text-white rounded-md transition cursor-pointer hover:bg-blue-500"
               style={{ backgroundColor: '#5e7ab8' }}
             >
               Choose File
             </label>
           
             {/* Hidden but accessible input */}
             <input
               id="file-upload"
               type="file"
               accept=".txt"
               onChange={handleFileChange}
               className="absolute w-0 h-0 overflow-hidden"
             />
           
             {/* File Name or Placeholder */}
             <span className="text-sm text-gray-500">
               {file ? file.name : 'No file chosen'}
             </span>
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
              {loading ? 'Analyzing...' : 'Submit'}
            </Button>
          </CardFooter>
        </Card>

        {/* Right Column - Result */}
        {result && (
          <div
            className="border rounded-md p-4 shadow-md bg-white"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        )}
      </div>
    </div>
  );
}
