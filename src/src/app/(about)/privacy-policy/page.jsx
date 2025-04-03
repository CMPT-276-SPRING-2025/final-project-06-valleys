import React from "react";
import ShieldLogo from "@/components/shieldlogo";

export default function privacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100">
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:mt-6 sm:px-6 md:mt-8 md:px-8 lg:mt-10 lg:px-10">
        <div className="flex w-full justify-center">
          <ShieldLogo className="h-64 w-64" />
        </div>
        <h1 className="mb-8 flex justify-center text-5xl font-bold text-[#5e7ab8]">
          Privacy Policy
        </h1>
        <p>
          <strong>Effective Date:</strong> [March 27, 2025]
        </p>
        <p>
          <strong>Last Updated:</strong> [March 27, 2025]
        </p>

        <p className="mt-4">
          Thank you for using <strong>Deep Phishing</strong>, an AI-powered
          email analysis tool designed to help users identify potential phishing
          attempts. Your privacy is important to us, and this Privacy Policy
          outlines how we collect, use, and protect your information.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-[#5e7ab8]">
          1. Information We Collect
        </h2>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>
            <strong>Email Content:</strong> If you submit email text or upload a
            file for analysis, we process that content to provide results.
          </li>
          <li>
            <strong>Usage Data:</strong> We may collect anonymous usage
            statistics, such as the number of analyses performed, to improve our
            service.
          </li>
          <li>
            <strong>Device & Browser Information:</strong> Basic data about your
            device, such as your browser type and operating system, may be
            collected for performance optimization.
          </li>
        </ul>

        <h2 className="mt-6 text-2xl font-semibold text-[#5e7ab8]">
          2. How We Use Your Information
        </h2>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>To analyze and provide phishing detection results.</li>
          <li>
            To improve our AI model and enhance phishing detection capabilities.
          </li>
          <li>To maintain and secure our platform.</li>
        </ul>

        <h2 className="mt-6 text-2xl font-semibold text-[#5e7ab8]">
          3. Data Storage & Security
        </h2>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>
            <strong>Temporary Storage:</strong> Email content and uploaded files
            are processed in real-time and are not stored permanently.
          </li>
          <li>
            <strong>Encryption:</strong> We use industry-standard security
            measures to protect data during transmission.
          </li>
          <li>
            <strong>Limited Access:</strong> Only authorized personnel have
            access to the system logs for debugging and improvement purposes.
          </li>
        </ul>

        <h2 className="mt-6 text-2xl font-semibold text-[#5e7ab8]">
          4. Sharing of Information
        </h2>
        <p className="mt-2">
          We do <strong>not</strong> sell, rent, or share your data with third
          parties except in the following cases:
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>If required by law or government authorities.</li>
          <li>
            If necessary to prevent fraud, security threats, or abuse of the
            service.
          </li>
        </ul>

        <h2 className="mt-6 text-2xl font-semibold text-[#5e7ab8]">
          5. Third-Party Services
        </h2>
        <p className="mt-2">
          Our platform may use APIs and services provided by third-party vendors
          (e.g., OpenAI for email analysis). These services may have their own
          privacy policies governing how they handle data.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-[#5e7ab8]">
          6. Your Rights & Choices
        </h2>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>
            You can choose <strong>not to submit</strong> email content or files
            if you do not wish to use the service.
          </li>
          <li>
            If you have concerns about your data, you may contact us to request
            its deletion.
          </li>
        </ul>

        <h2 className="mt-6 text-2xl font-semibold text-[#5e7ab8]">
          7. Changes to This Privacy Policy
        </h2>
        <p className="mt-2">
          We may update this policy from time to time. Any changes will be
          posted on this page with an updated "Last Updated" date.
        </p>

        <p className="mt-4 mb-4">
          By using Deep Phishing, you agree to the terms outlined in this
          Privacy Policy.
        </p>
      </div>
    </div>
  );
}
