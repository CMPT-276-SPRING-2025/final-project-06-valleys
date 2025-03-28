import Image from "next/image"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaEye,  FaSearch,  FaFileCode,  FaAddressBook, FaMailBulk, FaQuestion } from "react-icons/fa"; 

export const metadata = {
  title: "Deep Phishing",
  name: "description",
  content: "Help Detect Scam Email",
};

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">

      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16">
        {/* Left Side - Text and Buttons */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Protect Yourself from Phishing Attacks
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Deep Phishing provides essential security tools and AI-powered educational resources to help you identify and prevent phishing attempts.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Link href="/scan/file">
              <Button className="bg-[#5e7ab8] hover:bg-[#4a6aa0]" size="lg">
                Start Scanning
              </Button>
            </Link> 
            <Link href="/scan/file">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
  
        <div className="md:w-1/2 flex justify-center md:mt-0 mb-10 md:ml-8 lg:ml-10">
         <video 
           className="w-full max-w-3xl md:max-w-4xl rounded-lg shadow-lg" 
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
      <section className="py-12  bg-gray-100">
       <div className="container mx-auto px-6 lg:px-12">
         <h2 className="text-5xl font-bold text-gray-900 text-center">
           Our Security Tools
         </h2>
         <p className="mt-4 mb-12 text-gray-600 text-center">
           Comprehensive tools to help you identify and prevent phishing attempts.
         </p>
     
         {/* Grid layout with responsive columns */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Feature Card 1 */}
           <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
             <FaSearch className="text-[#5e7ab8] text-4xl" />
             <h3 className="mt-4 text-xl font-semibold text-gray-900">URL Scanner</h3>
             <p className="mt-2 text-gray-600">
               Upload URLs from suspicious emails to detect phishing attempts.
             </p>
             <Link href="/scan/url">
               <Button className="mt-4 bg-[#5e7ab8] hover:bg-[#4a6aa0]">
                 Try It
               </Button>
             </Link>
           </div>
           {/* Feature Card 2 */}
           <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
             <FaFileCode className="text-[#5e7ab8] text-4xl" />
             <h3 className="mt-4 text-xl font-semibold text-gray-900">File Scanner</h3>
             <p className="mt-2 text-gray-600">
               Upload suspicious files for analysis by multiple antivirus services.
             </p>
             <Link href="/scan/file">
               <Button className="mt-4 bg-[#5e7ab8] hover:bg-[#4a6aa0]">
                 Try It
               </Button>
             </Link>
           </div>
           {/* Feature Card 3 */}
           <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
             <FaAddressBook className="text-[#5e7ab8] text-4xl" />
             <h3 className="mt-4 text-xl font-semibold text-gray-900">IP Scanner</h3>
             <p className="mt-2 text-gray-600">
               Analyze the sender's IP address in emails to detect potential phishing threats.
             </p>
             <Link href="/scan/ip">
               <Button className="mt-4 bg-[#5e7ab8] hover:bg-[#4a6aa0]">
                 Try It
               </Button>
             </Link>
           </div>
           {/* Feature Card 4 */}
           <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
             <FaEye className="text-[#5e7ab8] text-4xl" />
             <h3 className="mt-4 text-xl font-semibold text-gray-900">Email Analysis</h3>
             <p className="mt-2 text-gray-600">
               Analyze and get emails detailed insights on email authenticity by AI.
             </p>
             <Link href="/email-analysis">
               <Button className="mt-4 bg-[#5e7ab8] hover:bg-[#4a6aa0]">
                 Try It
               </Button>
             </Link>
           </div>
           {/* Feature Card 5 */}
           <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
             <FaMailBulk className="text-[#5e7ab8] text-4xl" />
             <h3 className="mt-4 text-xl font-semibold text-gray-900">Email Generator</h3>
             <p className="mt-2 text-gray-600">
               Generate AI-powered scam emails to help recognize potential threats.
             </p>
             <Link href="/">
               <Button className="mt-4 bg-[#5e7ab8] hover:bg-[#4a6aa0]">
                 Try It
               </Button>
             </Link>
           </div>
           {/* Feature Card 6 */}
           <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
             <FaQuestion className="text-[#5e7ab8] text-4xl" />
             <h3 className="mt-4 text-xl font-semibold text-gray-900">Email Quiz</h3>
             <p className="mt-2 text-gray-600">
               Test your ability to identify phishing emails with our AI-powered quiz.
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
     <section className="py-12 bg-gray-50">
       <div className="container mx-auto px-6 lg:px-12">
         <h2 className="text-5xl font-bold text-center">
           Why Security Matters
         </h2>
         <p className="mt-4 mb-12 text-gray-600 text-center">
           Phishing attacks are becoming increasingly sophisticated and prevalent
         </p>
     
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Card 1 */}
           <div className="bg-white p-8 rounded-lg shadow-md transition duration-300 hover:shadow-lg flex flex-col items-center justify-center text-center">
             <h3 className="text-[#5e7ab8] text-4xl font-bold">83%</h3>
             <h4 className="text-black text-2xl mt-2">of organization</h4>
             <p className="text-gray-700 mt-2">experienced phishing attacks in 2023, underscoring the urgent need for robust security defenses. </p>
           </div>
     
           {/* Card 2 */}
           <div className="bg-white p-8 rounded-lg shadow-md transition duration-300 hover:shadow-lg flex flex-col items-center justify-center text-center">
             <h3 className="text-[#5e7ab8] text-4xl font-bold">$4.9M</h3>
             <h4 className="text-black text-2xl mt-2">Average cost</h4>
             <p className="text-gray-700 mt-2">of data breach caused by phishing, including financial losses and reputational damage.</p>
           </div>
     
           {/* Card 3 */}
           <div className="bg-white p-8 rounded-lg shadow-md transition duration-300 hover:shadow-lg flex flex-col items-center justify-center text-center">
             <h3 className="text-[#5e7ab8] text-4xl font-bold">65%</h3>
             <h4 className="text-black text-2xl mt-2">reduction in risk</h4>
             <p className="text-gray-700 mt-2">with proper security awareness, helping organizations stay protected.</p>
           </div>
         </div>
       </div>
     </section>
     <section className="py-12 bg-gray-50">
       <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
         <h2 className="text-5xl font-bold text-gray-900">
           Ready to Protect Yourself?
         </h2>
         <p className="mt-4 mb-12 text-gray-600">
           Start using our security tools today and learn how to identify and prevent phishing attempts.
         </p>
         <Link href="/email-analysis">
           <Button className="mt-2 bg-[#5e7ab8] hover:bg-[#4a6aa0] text-lg font-semibold py-4 px-8 rounded-lg">
             Get Started
           </Button>
         </Link>
       </div>
     </section>


    </div>
  );
}
