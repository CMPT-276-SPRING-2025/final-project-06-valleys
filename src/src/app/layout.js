// app/layout.tsx
import "./globals.css";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import { Public_Sans, JetBrains_Mono } from "next/font/google";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: "Deep Phishing",
  description:
    "Educational tool to identify, understand, and prevent phishing scams through file scanning and threat detection.",
  keywords: "security, phishing, scanner, threat detection, cybersecurity",
  openGraph: {
    title: "Deep Phishing - Advanced Security Scanner",
    description:
      "Educational tool to identify, understand, and prevent phishing scams through file scanning and threat detection.",
    siteName: "Deep Phishing",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </head>
      <body
        className={`${publicSans.className} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <NavBar />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
