import * as React from "react"
import Link from 'next/link';
import ShieldLogo from './shieldlogo';

export default function NavBar() {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-gray-100 border-b">
      
      <div className="text-xl font-bold">
     
        <Link href="/">
           <div className="flex items-center space-x-2">
               <ShieldLogo />
               <span className="text-xl font-bold">Deep Phishing</span>
          </div>
        </Link>
      </div>
      <div className="flex space-x-6">
        <Link href="/" className="text-gray-800 hover:text-blue-500 transition">
          Home
        </Link>
        <Link href="/scan/url" className="text-gray-800 hover:text-blue-500 transition">
          URL Scanner
        </Link>
        <Link href="/scan/file" className="text-gray-800 hover:text-blue-500 transition">
          File Scanner
        </Link>
        <Link href="/item-three" className="text-gray-800 hover:text-blue-500 transition">
          Email Generator
        </Link>
        <Link href="/emailAnalysis" className="text-gray-800 hover:text-blue-500 transition">
          Email Analysis
        </Link>
        <Link href="/quiz" className="text-gray-800 hover:text-blue-500 transition">
          Email Quiz
        </Link>

      </div>
    </nav>
  )
}
