import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export function FileMetadata({ fileInfo }) {
  if (!fileInfo) return null;

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center gap-2">
        <FileText className="h-5 w-5" />
        <CardTitle className="text-lg">File Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            <span className="font-medium text-muted-foreground">Size:</span>
            <span>{(fileInfo.size / 1024).toFixed(2)} KB</span>
          </div>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            <span className="font-medium text-muted-foreground">SHA256:</span>
            <span className="break-all font-mono text-sm">{fileInfo.sha256}</span>
          </div>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            <span className="font-medium text-muted-foreground">MD5:</span>
            <span className="break-all font-mono text-sm">{fileInfo.md5}</span>
          </div>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            <span className="font-medium text-muted-foreground">SHA1:</span>
            <span className="break-all font-mono text-sm">{fileInfo.sha1}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}