import Link from 'next/link';
import ShieldLogo from './shieldlogo';

export default function Footer() {
  return (
    <footer className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and Slogan */}
          <div className="flex flex-col items-center md:items-start">
          <div className="text-2xl font-bold mb-4 flex items-center">
  <ShieldLogo /> 
  <span className="text-black-400 ml-2">Deep Phishing</span>
</div>

            <p className="text-sm text-gray-400">
              Help Detect Scam Emails and Protect Your Identity.
            </p>
          </div>

          {/* Column 2: Tools */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">Tools</h3>
            <Link href="/scan/url" className="text-gray-600 mb-2 border-b border-gray-300 hover:text-blue-500 hover:border-blue-500">
                URL Scanner
            
            </Link>
            <Link href="/scan/file" className="text-gray-600 mb-2 border-b border-gray-300 hover:text-blue-500 hover:border-blue-500">
                File Scanner
             
            </Link>
            <Link href="/item-three" className="text-gray-600 mb-2 border-b border-gray-300 hover:text-blue-500 hover:border-blue-500">
                Email Generator
             
            </Link>
          </div>

          {/* Column 3: Education */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">Education</h3>
            <Link href="/about"className="text-gray-600 mb-2 border-b border-gray-300 hover:text-blue-500 hover:border-blue-500">
                About Us
         
            </Link>
            <Link href="/quiz" className="text-gray-600 mb-2 border-b border-gray-300 hover:text-blue-500 hover:border-blue-500">
                Take Quiz
            
            </Link>
          </div>

          {/* Column 4: Privacy and Terms */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <Link href="/privacy" className="text-gray-600 mb-2 border-b border-gray-300 hover:text-blue-500 hover:border-blue-500">
                Privacy Policy
       
            </Link>
            <Link href="/terms" className="text-gray-600 mb-2 border-b border-gray-300 hover:text-blue-500 hover:border-blue-500">
                Terms of Service
          
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-400">
        <span>&copy; {new Date().getFullYear()} Deep Phishing. All rights reserved.</span>
      </div>
    </footer>
  );
}
