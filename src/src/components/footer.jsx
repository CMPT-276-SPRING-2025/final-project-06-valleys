import Link from "next/link";
import ShieldLogo from "./shieldlogo";

export default function Footer() {
  return (
    <footer className="bg-white py-12 text-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Logo and Slogan */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4 flex items-center text-2xl font-bold">
              <ShieldLogo />
              <span className="text-black-400 ml-2">Deep Phishing</span>
            </div>

            <p className="text-sm text-gray-400">
              Help Detect Scam Emails and Protect Your Identity.
            </p>
          </div>

          {/* Column 2: Tools */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-semibold">Tools</h3>
            <Link
              href="/scan/url"
              className="mb-2 border-b border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
            >
              URL Scanner
            </Link>
            <Link
              href="/scan/file"
              className="mb-2 border-b border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
            >
              File Scanner
            </Link>
            <Link
              href="/item-three"
              className="mb-2 border-b border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
            >
              Email Generator
            </Link>
          </div>

          {/* Column 3: Education */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-semibold">Education</h3>
            <Link
              href="/about"
              className="mb-2 border-b border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
            >
              About Us
            </Link>
            <Link
              href="/quiz"
              className="mb-2 border-b border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
            >
              Take Quiz
            </Link>
          </div>

          {/* Column 4: Privacy and Terms */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <Link
              href="/privacy"
              className="mb-2 border-b border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="mb-2 border-b border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400">
        <span>
          &copy; {new Date().getFullYear()} Deep Phishing. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
