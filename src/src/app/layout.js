"use client";

import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <NavBar toggleMenu={handleMenuToggle} isOpen={isMenuOpen} />

          <main
            className={`flex-grow pt-16 transition-all ${isMenuOpen ? "mt-60" : ""}`}
          >
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
