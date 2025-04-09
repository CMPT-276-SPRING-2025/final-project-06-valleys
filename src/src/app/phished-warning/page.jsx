"use client";
import { TriangleAlert, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PhishedWarning() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-20">
        <TriangleAlert size={70} color="#EF4444" />
        <h1 className="mt-4 font-bold text-red-500 sm:text-5xl md:text-5xl lg:text-6xl">
          You have been phished!
        </h1>
        <Card className="mx-auto mt-6 w-full max-w-[700px]">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl">
              Don't let this happen in real life
            </CardTitle>
            <CardDescription className="mt-2 text-sm sm:text-base">
              Learn how to protect yourself from phishing attacks and stay safe
              online
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500 sm:text-base">
              Phishing attacks are becoming increasingly sophisticated. Learn to
              identify and prevent them using our comprehensive security tools
              and educational resources
            </p>
            <Button className="mt-4 p-4">
              <div className="flex flex-row items-center justify-center">
                <Link href={`/`}>Protect Yourself Now</Link>
                <ArrowRight />
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
