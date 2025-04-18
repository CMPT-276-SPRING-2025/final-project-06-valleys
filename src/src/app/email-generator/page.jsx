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
import { Checkbox } from "@/components/ui/checkbox";
import { RefreshCw, Trash2, Copy, Send } from "lucide-react";
import { baseURL } from "@/utils/constant";
import parse from "html-react-parser";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

const baseRedirectUrl =
  process.env.NODE_ENV === "production"
    ? `${baseURL}`
    : "http://localhost:3000";

const UrlLink = `${baseRedirectUrl}/phished-warning`;

export const template = {
  bank: {
    subject: "URGENT: Unusual activity detected on your account",
    content: `Dear Valued Customer,\n\nWe have detected unusual activity on your account. For your security, we have temporarily limited access to sensitive account features.\n\nPlease verify your identity by clicking the secure verification link below to restore full access to your account:\n\n<a href="${UrlLink}">Verify My Account</a>\n\nIf you do not verify your account within 24 hours, your account may be suspended.\n\nThank you for your cooperation.\n\nSecurity Team\nBank Name`,
  },
  lotto: {
    subject: "Congratulations! You've Won $1,000,000!",
    content: `Dear Winner,\n\nCongratulations! Your email has been randomly selected as the grand prize winner of the International Lottery. You have won **$1,000,000 USD!**\n\nTo claim your prize, please confirm your details by visiting our official claim portal below:\n\n<a href="${UrlLink}">Claim Your Prize</a>\n\nAct fast! Unclaimed prizes will be forfeited within 48 hours.\n\nBest regards,\nLottery Claims Department`,
  },
  "tech-support": {
    subject: "Your PC Has Been Infected! Immediate Action Required!",
    content: `Dear User,\n\nOur security system has detected multiple viruses on your computer. Immediate action is required to prevent data loss.\n\nPlease call our certified support team at **+1-800-XXX-XXXX** or download our free security patch by clicking the protection link below:\n\n<a href="${UrlLink}">Download Security Patch</a>\n\nFailure to act may result in complete system failure!\n\nStay safe,\nMicrosoft Security Team`,
  },
  "job-offer": {
    subject: "High-Paying Remote Job Opportunity - No Experience Needed!",
    content: `Dear Candidate,\n\nWe found your resume online and would like to offer you an exciting remote job opportunity. No experience required, and you can earn **$5000+ per month** working from home.\n\nTo apply, simply complete the application form by accessing the link below:\n\n<a href="${UrlLink}">Apply Now</a>\n\nDon't miss this opportunity—limited spots available!\n\nBest regards,\nGlobal Recruitment Team`,
  },
};

const emailSender = "deepphished@gmail.com";

export default function EmailGenerator() {
  const [emailTemplate, setEmailTemplate] = React.useState("bank");
  const [emailSubject, setEmailSubject] = React.useState(
    template["bank"].subject
  );
  const [emailContent, setEmailContent] = React.useState(
    template["bank"].content
  );
  const [customizeMode, setCustomizeMode] = React.useState(false);
  const [useAI, setUseAI] = React.useState(true);
  const [emailContext, setEmailContext] = React.useState("");
  const [isEmailContextSendLoading, setIsEmailContextSendLoading] =
    React.useState(false);
  const [isSendEmailLoading, setIsSendEmailLoading] = React.useState(false);
  const [recipientEmail, setRecipientEmail] = React.useState("");
  const [copySuccess, setCopySuccess] = React.useState(false);
  // Add state for notification messages
  const [notification, setNotification] = React.useState({
    type: null, // 'success' or 'error'
    message: "",
  });

  const handleChangeTemplate = (newTemplate) => {
    // Early return for custom template
    if (newTemplate === "custom") {
      setEmailTemplate("custom");
      setCustomizeMode(true);
      setEmailSubject("");
      setEmailContent("");
      setEmailContext("");
      setUseAI(true); // Set AI to enabled by default for custom mode
      return;
    }
    setEmailTemplate(newTemplate);
    setCustomizeMode(false);
    setEmailSubject(template[newTemplate].subject);
    setEmailContent(template[newTemplate].content);
  };

  const handleResetTemplate = () => {
    handleChangeTemplate("bank");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailContent);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  const handleSubmitEmailContext = async (e) => {
    e.preventDefault();

    setIsEmailContextSendLoading(true);
    try {
      const response = await fetch("/api/OpenAI/generateEmail/plain-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: emailContext,
        }),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();

      setEmailSubject(data.subject);
      setEmailContent(data.content);
    } catch (error) {
      console.error("Failed to generate email:", error);
      setNotification({
        type: "error",
        message: "Failed to generate email. Please try again.",
      });
    } finally {
      setIsEmailContextSendLoading(false);
    }
  };

  const handleSendEmail = async () => {
    let sendContent;
    // Start the loading here
    setIsSendEmailLoading(true);
    // Clear any previous notifications
    setNotification({ type: null, message: "" });

    try {
      const response = await fetch("/api/OpenAI/generateEmail/html", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: emailContent,
        }),
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();

      sendContent = data.content;
    } catch (error) {
      console.error("Failed to convert email to html:", error);
      setNotification({
        type: "error",
        message: "Failed to convert email to HTML",
      });
      setIsSendEmailLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientEmail,
          subject: emailSubject,
          content: sendContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.json();
      // Show success notification
      setNotification({
        type: "success",
        message: "Email sent successfully",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      // Show error notification
      setNotification({
        type: "error",
        message: error.message || "Failed to send email",
      });

      // Handle network errors specifically
      if (!navigator.onLine || error.name === "TypeError") {
        setNotification({
          type: "error",
          message: "Network error occurred",
        });
      }
    } finally {
      // Stop the loading here
      setIsSendEmailLoading(false);
    }
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
        {/* Notification Alert */}
        {notification.type && (
          <Alert
            className={`mb-4 ${
              notification.type === "success" ? "bg-green-50" : "bg-red-50"
            }`}
            data-testid={`${notification.type}-message`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription
              className={
                notification.type === "success"
                  ? "text-green-700"
                  : "text-red-700"
              }
            >
              {notification.message}
            </AlertDescription>
          </Alert>
        )}

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
                    onValueChange={handleChangeTemplate}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Banking Alert</SelectItem>
                      <SelectItem value="lotto">Lottery Scam</SelectItem>
                      <SelectItem value="tech-support">
                        Tech Support Scam
                      </SelectItem>
                      <SelectItem value="job-offer">Job Offer Scam</SelectItem>
                      <SelectItem value="custom">Customize</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  {/* Appear only in customize mode */}
                  {customizeMode && (
                    <div className="space-y-3">
                      <Label htmlFor="email-context">Email Context</Label>
                      <Textarea
                        id="email-context"
                        className="min-h-[100px] w-full"
                        placeholder="Enter the context of your phishing email for AI to generate..."
                        value={emailContext}
                        onChange={(e) => {
                          setEmailContext(e.target.value);
                        }}
                        disabled={!useAI}
                      />
                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                          <Checkbox
                            id="useAI"
                            checked={useAI}
                            onCheckedChange={setUseAI}
                          />
                          <Label
                            htmlFor="useAI"
                            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Use AI to generate email
                          </Label>
                        </div>
                        <Button
                          variant="default"
                          onClick={handleSubmitEmailContext}
                          className="min-w-[140px] flex-1"
                          disabled={
                            !useAI ||
                            emailContext === "" ||
                            isEmailContextSendLoading
                          }
                        >
                          {isEmailContextSendLoading ? "Loading..." : "Submit"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Always appear field */}
                <div className="space-y-2">
                  <Label htmlFor="sender-email">Sender Email</Label>
                  <Input id="sender-email" value={emailSender} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject-line">Subject Line</Label>
                  <Input
                    id="subject-line"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter the subject of your phishing email..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-content">Email Content</Label>
                  <Textarea
                    id="email-content"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Enter the content of your phishing email..."
                  />
                </div>
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleResetTemplate}
                    className="min-w-[140px] flex-1"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to default
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => handleChangeTemplate("custom")}
                    className="min-w-[140px] flex-1"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>

                  <Button
                    variant="default"
                    onClick={handleCopyEmail}
                    className="min-w-[140px] flex-1"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {copySuccess ? "Copied!" : "Copy Email"}
                  </Button>
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
                  variant="default"
                  className="w-full"
                  onClick={handleSendEmail}
                  disabled={!recipientEmail || isSendEmailLoading}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSendEmailLoading ? "Sending the email..." : "Send Email"}
                </Button>
              </CardContent>
            </Card>

            <Card className="flex-grow">
              <CardHeader>
                <CardTitle>Email Preview</CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="flex h-full flex-col rounded-md border bg-gray-50 p-6">
                  <div className="mb-4 space-y-2">
                    <p className="break-words text-gray-600">
                      <strong className="break-words text-gray-900">
                        From:
                      </strong>
                      {emailSender}
                    </p>
                    <p className="break-words text-gray-600">
                      <strong className="text-gray-900">Subject:</strong>
                      {emailSubject}
                    </p>
                  </div>
                  <div className="flex-grow">
                    <p className="break-words whitespace-pre-line text-gray-800">
                      {parse(emailContent)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
