"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ExternalLink, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function RecentScans({ type, className }) {
  const [recentScans, setRecentScans] = useState([]);

  useEffect(() => {
    // Load recent scans from localStorage
    const storedScans = localStorage.getItem(`recent-${type}-scans`);
    if (storedScans) {
      try {
        const parsedScans = JSON.parse(storedScans);
        setRecentScans(parsedScans);
      } catch (error) {
        console.error("Error parsing recent scans:", error);
      }
    }
  }, [type]);

  return (
    <Card className={cn("w-full max-w-2xl gap-2", +className)}>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Clock className="mr-2 h-5 w-5" />
          Recently Scanned
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentScans.length === 0 ? (
          <div className="flex items-center justify-center py-4 text-gray-500">
            <AlertCircle className="mr-2 h-4 w-4" />
            <span>No items scanned yet</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {recentScans.map((scan, index) => (
              <Link
                key={index}
                href={`/scan/${type}/${scan.id}`}
                className="block"
              >
                <li className="hover:bg-primary/10 flex items-center justify-between rounded-lg border-b p-2 transition-colors last:border-0">
                  <div className="flex-1 truncate">
                    <span className="text-primary block truncate hover:underline">
                      {scan.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(scan.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <span className="hover:text-primary ml-2 text-gray-500">
                    <ExternalLink size={16} />
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}