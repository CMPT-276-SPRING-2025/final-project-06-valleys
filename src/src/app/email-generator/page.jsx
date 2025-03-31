"use client";

import * as React from "react";
import ShieldLogo from "@/components/shieldlogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function EmailGenerator() {
  const [emailTemplate, setEmailTemplate] = React.useState("bank");
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
  };

  const handleSendEmail = () => {
    console.log(`Sending email to: ${recipientEmail}`);
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

      {/* Content Group */}
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

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {/* Left Column - Email Generator */}
          <div className="flex flex-col">
            <Card className="flex-grow">
              <CardHeader>
                <CardTitle>Email Generator</CardTitle>
                <CardDescription>
                  Create a simulated phishing email using templates or customize
                  your own
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-template">Email Template</Label>
                  <Select
                    id="email-template"
                    value={emailTemplate}
                    onValueChange={setEmailTemplate}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Banking Alert</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sender-email">Sender Email</Label>
                  <Input
                    id="sender-email"
                    value="security@bankname-alerts.com"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject-line">Subject Line</Label>
                  <Input
                    id="subject-line"
                    value="URGENT: Unusual activity detected on your account"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-content">Email Content</Label>
                  <Textarea
                    id="email-content"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    rows={8}
                  />
                </div>

                <div className="flex space-x-2 pt-2">
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
                <CardTitle>Send Test Email</CardTitle>
                <CardDescription>
                  Send this phishing simulation to a recipient for testing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient-email">Recipient Email</Label>
                  <Input
                    id="recipient-email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="recipient@example.com"
                  />
                </div>

                <p className="text-sm text-gray-600">
                  By sending this email, you confirm that the recipient has
                  given consent to receive phishing simulation emails for
                  educational purposes.
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
                <CardTitle>Email Preview</CardTitle>
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
