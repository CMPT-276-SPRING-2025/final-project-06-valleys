"use client";

import * as React from "react";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

export default function EmailGenerator() {
  const [text, setText] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailContent, setEmailContent] = useState(
    "Dear Valued Customer,\n\nWe have detected unusual activity on your account. For your security, we have temporarily limited access to sensitive account features.\n\nPlease verify your identity by clicking the link below to restore full access to your account:\n\n[SUSPICIOUS LINK]\n\nIf you do not verify your account within 24 hours, your account may be suspended.\n\nThank you for your cooperation.\n\nSecurity Team\nBank Name"
  );

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
      {/* Centered Logo and Title */}
      <div className="mt-10 flex flex-shrink-0 flex-col items-center">
        <ShieldLogo size={48} />
        <h1 className="mt-4 text-3xl font-bold">Phishing Email Generator</h1>
        <p className="mt-2 text-center text-gray-600">
          Create realistic phising emails for security awareness training
        </p>
      </div>
      {/*Content Group*/}
      <div className="mx-60 items-center p-8">
        {/* Disclaimer Section */}
        <div className="mb-7">
          <Card className="bg-gray-100">
            <CardContent>
              <p>
                This tool is for educational purposes only. Use it responsibly
                to test and improve security awareness. Only send simulated
                phishing emails to individuals who have given explicit consent.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left Column - Full Height */}
          <div className="flex flex-col md:col-span-2">
            <Card className="flex-grow">
              <CardContent>
                <h2 className="mb-4 text-lg font-semibold">Email Generator</h2>
                <label className="mb-2 block">Email Template</label>
                <select className="mb-4 w-full rounded-md border p-2">
                  <option>Banking Alert</option>
                </select>
                <label className="mb-2 block">Sender Email</label>
                <Input
                  value="security@bankname-alerts.com"
                  disabled
                  className="mb-4"
                />
                <label className="mb-2 block">Subject Line</label>
                <Input
                  value="URGENT: Unusual activity detected on your account"
                  disabled
                  className="mb-4"
                />
                <label className="mb-2 block">Email Content</label>
                <Textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  rows={8}
                  className="mb-4"
                />
                <Button className="mr-2">Reset to Template</Button>
                <Button>Copy Email</Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Two Stacked Components */}
          <div className="flex flex-col gap-6">
            <Card>
              <CardContent>
                <h2 className="mb-4 text-lg font-semibold">Send Test Email</h2>
                <label className="mb-2 block">Recipient Email</label>
                <Input
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="mb-4"
                />
                <p className="mb-4 text-sm text-gray-600">
                  By sending this email, you confirm that the recipient has
                  given consent to receive phishing simulation emails for
                  educational purposes.
                </p>
                <Button className="w-full">Send Email</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="mb-4 text-lg font-semibold">Email Preview</h2>
                <div className="rounded-md border bg-gray-100 p-4">
                  <p>
                    <strong>From:</strong> security@bankname-alerts.com
                  </p>
                  <p>
                    <strong>Subject:</strong> URGENT: Unusual activity detected
                    on your account
                  </p>
                  <p className="mt-4 whitespace-pre-line">{emailContent}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
