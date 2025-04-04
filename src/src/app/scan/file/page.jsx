"use client";

import { Shield } from "lucide-react";
import FileScanForm from "@/components/Scanner/FileScanForm";
import RecentScans from "@/components/Scanner/RecentScans";

export default function FileScanPage() {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center justify-center p-4">
      <div className="text-primary mb-2">
        <Shield size={48} />
      </div>

      <h1 className="mb-2 text-center text-3xl font-bold">File Scanner</h1>

      <p className="mb-6 text-center text-sm text-neutral-600">
        Upload suspicious files for analysis by multiple antivirus services
      </p>

      <FileScanForm />

      <div className="mt-6 w-full">
        <RecentScans type="file" />
      </div>
    </div>
  );
}
