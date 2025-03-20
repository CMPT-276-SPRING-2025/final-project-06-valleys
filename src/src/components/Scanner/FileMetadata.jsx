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
            <span className="text-muted-foreground font-medium">Size:</span>
            <span>{(fileInfo.size / 1024).toFixed(2)} KB</span>
          </div>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            <span className="text-muted-foreground font-medium">SHA256:</span>
            <span className="font-mono text-sm break-all">
              {fileInfo.sha256}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            <span className="text-muted-foreground font-medium">MD5:</span>
            <span className="font-mono text-sm break-all">{fileInfo.md5}</span>
          </div>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            <span className="text-muted-foreground font-medium">SHA1:</span>
            <span className="font-mono text-sm break-all">{fileInfo.sha1}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
