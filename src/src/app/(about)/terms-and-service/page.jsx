import React from "react";
import ShieldLogo from "@/components/shieldlogo";

export default function termsOfService() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-4 sm:px-6 md:px-8 lg:px-10">
                <div className="flex justify-center w-full">
                    <ShieldLogo className="w-64 h-64" />
                </div>
                <h1 className="flex justify-center text-5xl font-bold text-[#5e7ab8] mb-8">Terms of Service</h1>
                <p><strong>Effective Date:</strong> [March 27, 2025]</p>
                <p><strong>Last Updated:</strong> [March 27, 2025]</p>

                <p className="mt-4">
                    Thank you for choosing to use <strong>Deep Phishing</strong>. By accessing or using our service, you agree to comply with these Terms of Service.
                </p>

                <h2 className="text-2xl font-semibold text-[#5e7ab8] mt-6">1. Acceptance of Terms</h2>
                <p className="mt-2">
                    By using <strong>Deep Phishing</strong>, you agree to be bound by these Terms of Service and our Privacy Policy.
                </p>

                <h2 className="text-2xl font-semibold text-[#5e7ab8] mt-6">2. Service Description</h2>
                <p className="mt-2">
                    <strong>Deep Phishing</strong> is an AI-powered email analysis tool designed to help users identify phishing attempts. It allows users to submit email content or upload files for analysis.
                </p>

                <h2 className="text-2xl font-semibold text-[#5e7ab8] mt-6">3. User Responsibilities</h2>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Users must ensure that the email content submitted is not harmful or illegal.</li>
                    <li>You agree to use the service only for lawful purposes.</li>
                    <li>Users are responsible for maintaining the confidentiality of their personal information and data.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-[#5e7ab8] mt-6">4. Prohibited Activities</h2>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>You must not use <strong>Deep Phishing</strong> to conduct illegal activities, including hacking or phishing.</li>
                    <li>Users are prohibited from using the service to distribute spam, malware, or any malicious software.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-[#5e7ab8] mt-6">5. Termination of Service</h2>
                <p className="mt-2">
                    We reserve the right to suspend or terminate your access to the service if we believe you have violated these Terms of Service.
                </p>

                <h2 className="text-2xl font-semibold text-[#5e7ab8] mt-6">6. Limitation of Liability</h2>
                <p className="mt-2">
                    <strong>Deep Phishing</strong> will not be liable for any damages, losses, or risks associated with the use of the service.
                </p>

                <h2 className="text-2xl font-semibold text-[#5e7ab8] mt-6">7. Changes to Terms</h2>
                <p className="mt-2">
                    We may update these Terms of Service from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
                </p>
                <p className="mt-4 mb-4">
                    By using Deep Phishing, you agree to the terms outlined in these Terms of Service.
                </p>
            </div>
        </div>
    );
}
