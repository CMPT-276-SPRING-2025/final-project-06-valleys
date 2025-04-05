"use client";

import { Shield } from "lucide-react";
import IPScanForm from "@/components/Scanner/IPScanForm";
import RecentScans from "@/components/Scanner/RecentScans";
export default function IPScanPage() {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center justify-center p-4">
      <div className="text-primary mb-2">
        <Shield size={48} />
      </div>

      <h1 className="mb-2 text-center text-3xl font-bold">
        IP Address Scanner
      </h1>

      <p className="mb-6 text-center text-sm text-neutral-600">
        Scan IP addresses to detect potential security threats and gather
        intelligence
      </p>

      <IPScanForm />

      <div className="mt-6 w-full">
        <RecentScans type="ip" />
      </div>
    </div>
  );
}
