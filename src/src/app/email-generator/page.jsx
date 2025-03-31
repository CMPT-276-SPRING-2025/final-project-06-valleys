"use client";

import * as React from "react";
import ShieldLogo from "@/components/shieldlogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EmailGenerator() {
  const [recipientEmail, setRecipientEmail] = React.useState("");
  const [emailContent, setEmailContent] = React.useState(
    "Dear Valued Customer,\n\nWe have detected unusual activity on your account. For your security, we have temporarily limited access to sensitive account features.\n\nPlease verify your identity by clicking the link below to restore full access to your account:\n\n[SUSPICIOUS LINK]\n\nIf you do not verify your account within 24 hours, your account may be suspended.\n\nThank you for your cooperation.\n\nSecurity Team\nBank Name"
  );

  const handleResetTemplate = () => {
    setEmailContent(
      "Dear Valued Customer,\n\nWe have detected unusual activity on your account. For your security, we have temporarily limited access to sensitive account features.\n\nPlease verify your identity by clicking the link below to restore full access to your account:\n\n[SUSPICIOUS LINK]\n\nIf you do not verify your account within 24 hours, your account may be suspended.\n\nThank you for your cooperation.\n\nSecurity Team\nBank Name"
    );
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailContent);
    // You could add a toast notification here
  };

  const handleSendEmail = () => {
    // Implement email sending functionality
    console.log(`Sending email to: ${recipientEmail}`);
    // You could add API call here
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      {/* Centered Logo and Title */}
      <div className="mt-10 flex flex-shrink-0 flex-col items-center">
        <ShieldLogo size={48} />
        <h1 className="mt-4 text-3xl font-bold">Phishing Email Generator</h1>
        <p className="mt-2 text-center text-gray-600">
          Create realistic phishing emails for security awareness training
        </p>
      </div>

      {/*Content Group*/}
      <div className="mx-auto max-w-5xl items-center p-8">
        {/* Disclaimer Section */}
        <Card className="mb-7 bg-gray-100">
          <CardContent className="p-4">
            <p>
              This tool is for educational purposes only. Use it responsibly to
              test and improve security awareness. Only send simulated phishing
              emails to individuals who have given explicit consent.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left Column - Email Generator */}
          <div className="flex flex-col md:col-span-2">
            <Card className="flex-grow">
              <CardHeader>
                <h2 className="text-lg font-semibold">Email Generator</h2>
              </CardHeader>
              <CardContent>
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

                <div className="flex space-x-2">
                  <Button onClick={handleResetTemplate}>
                    Reset to Template
                  </Button>
                  <Button onClick={handleCopyEmail}>Copy Email</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tools */}
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Send Test Email</h2>
              </CardHeader>
              <CardContent>
                <label className="mb-2 block">Recipient Email</label>
                <Input
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  className="mb-4"
                />

                <p className="mb-4 text-sm text-gray-600">
                  By sending this email, you confirm that the recipient has
                  given consent to receive phishing simulation emails.
                </p>

                <Button
                  className="w-full"
                  onClick={handleSendEmail}
                  disabled={!recipientEmail}
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Email Preview</h2>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border bg-gray-50 p-4">
                  <p>
                    <strong>From:</strong> security@bankname-alerts.com
                  </p>
                  <p>
                    <strong>Subject:</strong> URGENT: Unusual activity detected
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
