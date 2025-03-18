"use client";

import React from "react";
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import NavBar from '../components/navBar';
import Footer from '../components/footer';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="en">

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Pass the handleMenuToggle and isOpen state to the NavBar */}
        <NavBar toggleMenu={handleMenuToggle} isOpen={isMenuOpen} />

        {/* Main content, add top padding and margin adjustment when the menu is open */}
        <div className={`transition-all pt-16 ${isMenuOpen ? "mt-60" : ""}`}>
          {children}
        </div>
      </body>
      <Footer/>
    </html>
  );
}
