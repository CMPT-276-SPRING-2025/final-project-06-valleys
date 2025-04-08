import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Eye,
  Search,
  FileCode,
  BookUser,
  Mail,
  HelpCircle,
} from "lucide-react";

export const metadata = {
  title: "Deep Phishing",
  name: "description",
  content: "Help Detect Scam Email",
};

export default function Home() {
  return (
    // <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">

    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <section className="container mx-auto flex flex-col-reverse items-center justify-between px-6 py-16 md:flex-row md:px-12 lg:px-20">
        {/* Left Side - Text and Buttons */}
        <div className="text-center md:w-1/2 md:text-left">
          <h1 className="text-4xl leading-tight font-bold text-pretty md:text-5xl">
            Protect Yourself from Phishing Attacks
          </h1>
          <p className="mt-4 text-lg text-pretty text-gray-700">
            Deep Phishing provides essential security tools and AI-powered
            educational resources to help you identify and prevent phishing
            attempts.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link href="/scan/file">
              <Button className="bg-[#5e7ab8] hover:bg-[#4a6aa0]" size="lg">
                Start Scanning
              </Button>
            </Link>
            <Link href="#security">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-10 flex justify-center md:mt-0 md:ml-8 md:w-1/2 lg:ml-10">
          <video
            className="w-full max-w-3xl rounded-lg shadow-lg md:max-w-4xl"
            loop
            autoPlay
            muted
          >
            <source src="/phishing-detection.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Our Security Tools Section */}
      <section id="security" className="scroll-mt-24 bg-gray-50 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-center text-5xl font-bold text-gray-900">
            Our Security Tools
          </h2>
          <p className="mt-4 mb-12 text-center text-gray-600">
            Comprehensive tools to help you identify and prevent phishing
            attempts.
          </p>

          {/* Grid layout with responsive columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition duration-300 hover:shadow-lg">
              <Search className="h-8 w-8 text-[#5e7ab8]" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                URL Scanner
              </h3>

              <p className="mt-2 text-pretty text-gray-600">
                Upload URLs from suspicious emails to detect phishing attempts.
              </p>
              <Link href="/scan/url">
                <Button className="mt-4 bg-[#5e7ab8] hover:bg-[#4a6aa0]">
                  Try It
                </Button>
              </Link>
            </div>
            {/* Feature Card 2 */}
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition duration-300 hover:shadow-lg">
              <FileCode className="h-8 w-8 text-[#5e7ab8]" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                File Scanner
              </h3>

              <p className="mt-2 text-pretty text-gray-600">
                Upload suspicious files for analysis by multiple antivirus
                services.
              </p>
              <Link href="/scan/file">
                <Button className="mt-4 bg-[#5e7ab8] hover:bg-[#4a6aa0]">
                  Try It
                </Button>
              </Link>
            </div>
            {/* Feature Card 3 */}
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition duration-300 hover:shadow-lg">
              <BookUser className="h-8 w-8 text-[#5e7ab8]" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                IP Scanner
              </h3>

              <p className="mt-2 text-gray-600">
                Analyze the sender&apos;s IP address in emails to detect
                potential phishing threats.
              </p>
              <Link href="/scan/ip">
                <Button className="mt-4 bg-[#5e7ab8] hover:bg-[#4a6aa0]">
                  Try It
                </Button>
              </Link>
            </div>
            {/* Feature Card 4 */}
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition duration-300 hover:shadow-lg">
              <Eye className="h-8 w-8 text-[#5e7ab8]" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Email Analysis
              </h3>

              <p className="mt-2 text-gray-600">
                Analyze and get emails detailed insights on email authenticity
                by AI.
              </p>
              <Link href="/email-analysis">
                <Button className="mt-4 bg-[#5e7ab8] hover:bg-[#4a6aa0]">
                  Try It
                </Button>
              </Link>
            </div>
            {/* Feature Card 5 */}
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition duration-300 hover:shadow-lg">
              <Mail className="h-8 w-8 text-[#5e7ab8]" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Email Generator
              </h3>

              <p className="mt-2 text-gray-600">
                Generate AI-powered scam emails to help recognize potential
                threats.
              </p>
              <Link href="/email-generator">
                <Button className="mt-4 bg-[#5e7ab8] hover:bg-[#4a6aa0]">
                  Try It
                </Button>
              </Link>
            </div>
            {/* Feature Card 6 */}
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition duration-300 hover:shadow-lg">
              <HelpCircle className="h-8 w-8 text-[#5e7ab8]" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Email Quiz
              </h3>

              <p className="mt-2 text-gray-600">
                Test your ability to identify phishing emails with our
                AI-powered quiz.
              </p>
              <Link href="/quiz">
                <Button className="mt-4 bg-[#5e7ab8] hover:bg-[#4a6aa0]">
                  Try It
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-center text-5xl font-bold">
            Why Security Matters
          </h2>
          <p className="mt-4 mb-12 text-center text-gray-600">
            Phishing attacks are becoming increasingly sophisticated and
            prevalent
          </p>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-md transition duration-300 hover:shadow-lg">
              <h3 className="text-4xl font-bold text-[#5e7ab8]">83%</h3>
              <h4 className="mt-2 text-2xl text-black">of organization</h4>
              <p className="mt-2 text-gray-700">
                experienced phishing attacks in 2023, underscoring the urgent
                need for robust security defenses.{" "}
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-md transition duration-300 hover:shadow-lg">
              <h3 className="text-4xl font-bold text-[#5e7ab8]">$4.9M</h3>
              <h4 className="mt-2 text-2xl text-black">Average cost</h4>
              <p className="mt-2 text-gray-700">
                of data breach caused by phishing, including financial losses
                and reputational damage.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-md transition duration-300 hover:shadow-lg">
              <h3 className="text-4xl font-bold text-[#5e7ab8]">65%</h3>
              <h4 className="mt-2 text-2xl text-black">reduction in risk</h4>
              <p className="mt-2 text-gray-700">
                with proper security awareness, helping organizations stay
                protected.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto flex flex-col items-center px-6 text-center lg:px-12">
          <h2 className="text-5xl font-bold text-gray-900">
            Ready to Protect Yourself?
          </h2>
          <p className="mt-4 mb-12 text-gray-600">
            Start using our security tools today and learn how to identify and
            prevent phishing attempts.
          </p>
          <Link href="/email-analysis">
            <Button className="mt-2 bg-[#5e7ab8] px-8 py-4 text-lg font-semibold hover:bg-[#4a6aa0]">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
