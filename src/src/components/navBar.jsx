"use client";

import * as React from "react";
import Link from "next/link";
import ShieldLogo from "./shieldlogo";

export default function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-between border-b bg-gray-100 p-4">
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
      <div className="flex items-center md:hidden" onClick={toggleMenu}>
        <button className="text-gray-800 hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Desktop Links */}
      <div className="hidden space-x-6 md:flex">
        <Link href="/" className="text-gray-800 transition hover:text-blue-500">
          Home
        </Link>
        <Link
          href="/email-generator"
          className="text-gray-800 transition hover:text-blue-500"
        >
          Email Generator
        </Link>
        <Link
          href="/email-analysis"
          className="text-gray-800 transition hover:text-blue-500"
        >
          Email Analysis
        </Link>
        <Link
          href="/quiz"
          className="text-gray-800 transition hover:text-blue-500"
        >
          Email Quiz
        </Link>
        <Link
          href="/scan/url"
          className="text-gray-800 transition hover:text-blue-500"
        >
          URL Scanner
        </Link>
        <Link
          href="/scan/ip"
          className="text-gray-800 transition hover:text-blue-500"
        >
          IP Scanner
        </Link>
        <Link
          href="/scan/file"
          className="text-gray-800 transition hover:text-blue-500"
        >
          File Scanner
        </Link>
      </div>

      {/* Mobile Links (shown when isOpen is true) */}
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-gray-100 p-4 shadow-lg`}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link
            href="/"
            className="text-gray-800 transition hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            href="/item-three"
            className="text-gray-800 transition hover:text-blue-500"
          >
            Email Generator
          </Link>
          <Link
            href="/emailAnalysis"
            className="text-gray-800 transition hover:text-blue-500"
          >
            Email Analysis
          </Link>
          <Link
            href="/quiz"
            className="text-gray-800 transition hover:text-blue-500"
          >
            Email Quiz
          </Link>
          <Link
            href="/scan/url"
            className="text-gray-800 transition hover:text-blue-500"
          >
            URL Scanner
          </Link>
          <Link
            href="/scan/ip"
            className="text-gray-800 transition hover:text-blue-500"
          >
            IP Scanner
          </Link>
          <Link
            href="/scan/file"
            className="text-gray-800 transition hover:text-blue-500"
          >
            File Scanner
          </Link>
        </div>
      </div>
    </nav>
  );
}
