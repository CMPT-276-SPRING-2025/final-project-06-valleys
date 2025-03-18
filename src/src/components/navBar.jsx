"use client";

import * as React from "react";
import Link from 'next/link';
import ShieldLogo from './shieldlogo';

export default function NavBar({ toggleMenu, isOpen }) {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-gray-100 border-b fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <ShieldLogo />
            <span className="text-xl font-bold">Deep Phishing</span>
          </div>
        </Link>
      </div>

      {/* Hamburger Icon (for small screens) */}
      <div className="md:hidden flex items-center" onClick={toggleMenu}>
        <button className="text-gray-800 hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-gray-800 hover:text-blue-500 transition">Home</Link>
        <Link href="/scan/url" className="text-gray-800 hover:text-blue-500 transition">URL Scanner</Link>
        <Link href="/scan/file" className="text-gray-800 hover:text-blue-500 transition">File Scanner</Link>
        <Link href="/item-three" className="text-gray-800 hover:text-blue-500 transition">Email Generator</Link>
        <Link href="/emailAnalysis" className="text-gray-800 hover:text-blue-500 transition">Email Analysis</Link>
        <Link href="/quiz" className="text-gray-800 hover:text-blue-500 transition">Email Quiz</Link>
      </div>

      {/* Mobile Links (shown when isOpen is true) */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-gray-100 p-4 shadow-lg`}>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link href="/" className="text-gray-800 hover:text-blue-500 transition">Home</Link>
          <Link href="/scan/url" className="text-gray-800 hover:text-blue-500 transition">URL Scanner</Link>
          <Link href="/scan/file" className="text-gray-800 hover:text-blue-500 transition">File Scanner</Link>
          <Link href="/item-three" className="text-gray-800 hover:text-blue-500 transition">Email Generator</Link>
          <Link href="/emailAnalysis" className="text-gray-800 hover:text-blue-500 transition">Email Analysis</Link>
          <Link href="/quiz" className="text-gray-800 hover:text-blue-500 transition">Email Quiz</Link>
        </div>
      </div>
    </nav>
  );
}
