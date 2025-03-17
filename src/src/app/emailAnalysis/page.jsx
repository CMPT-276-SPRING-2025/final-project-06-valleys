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

async function postData(){
  const response = await fetch('http://localhost:3000/api/OpenAI/emailAnalysis', {
    method:'POST',
  });
  return response.json();
}
export default function EmailAnalysis() {
  const [text, setText] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [result, setResult] = React.useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const isFormValid = text.trim() !== '' || file !== null;

  const handleSubmit = async (e) => {
    console.log("kimchhorn");
    e.preventDefault();
    const formData = new FormData();

    if (text) formData.append('text', text);
    if (file) formData.append('file', file);

    try {
      const response = await fetch('/api/OpenAI/emailAnalysis', {
        method: 'POST',
        body: formData, // Send FormData to API
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      // Display annotated HTML
      setResult(data.annotatedHtml);
    } catch (error) {
      console.error('Failed to analyze email:', error);
      setResult(`<p style="color:red;">${error.message}</p>`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Shield Logo */}
      <ShieldLogo />

      {/* Title */}
      <h1 className="text-3xl font-bold mt-4">Email Analysis</h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-center mt-2">
        AI-powered tool to analyze emails for potential phishing indicators.
      </p>

      {/* Card */}
      <Card className="mt-6 w-full max-w-md p-4 shadow-lg">
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
           <div className="mt-4">
           {/* Choose File Button */}
           <Button
             as="label" // Button as a label for the file input
             htmlFor="file-upload"
             className="w-full  border-blue-600 border rounded-md  hover:text-white transition"
           >
             Choose File
           </Button>
           <input
             id="file-upload"
             type="file"
             className="hidden"
             accept=".txt" // Restrict file type to .txt
             onClick={handleSubmit}
           />
         </div>

          {/* Display uploaded file name */}
          {file && (
            <p className="text-sm text-gray-600 mt-2">
              {file.name}
            </p>
          )}
        </CardContent>

        {/* Submit Button */}
        <CardFooter>
        <Button
         className="w-full"
         disabled={!isFormValid}
         variant={isFormValid ? "default" : "secondary"}
         onClick={handleSubmit}
        >
         Submit
       </Button>
        </CardFooter>
      </Card>
      {result && (
        <div
          className="mt-6 w-full max-w-md p-4 border rounded-md bg-white shadow-md"
          dangerouslySetInnerHTML={{ __html: result }} 
        />
      )}
    </div>
  );
}
