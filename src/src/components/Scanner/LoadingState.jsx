import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export function LoadingState({ status }) {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (status === "queued" && !isCompleting) {
      setProgress(10);
    } else if (status === "completed" && !isCompleting) {
      // If status changes to completed, trigger completion animation
      setIsCompleting(true);
    }

    // Simulate progress increment for queued status
    if (status === "queued" && !isCompleting) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          return prevProgress < 90 ? prevProgress + 0.5 : prevProgress;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [status, isCompleting]);

  useEffect(() => {
    if (isCompleting) {
      // Quickly animate to 100%
      const completionInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(completionInterval);

            // Wait a moment at 100% before hiding the loader
            setTimeout(() => {
              setShowLoader(false);
            }, 800);

            return 100;
          }

          // Move faster to 100%
          return prevProgress + (100 - prevProgress) / 4;
        });
      }, 100);

      return () => clearInterval(completionInterval);
    }
  }, [isCompleting]);

  if (!showLoader) {
    return null;
  }

  const displayStatus = isCompleting ? "Finalizing" : status;

  let statusMessage = "Starting analysis...";
  if (progress > 30 && progress < 70) {
    statusMessage = "Processing data...";
  } else if (progress >= 70 && progress < 95) {
    statusMessage = "Almost there...";
  } else if (progress >= 95) {
    statusMessage = "Wrapping up...";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Analyzing...</CardTitle>
          <CardDescription className="text-center">
            This may take a minute or two
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="border-primary mb-4 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>

          <div className="mb-2 w-full">
            <Progress value={progress} className="h-2" />
          </div>

          <Badge variant="outline" className="mt-2">
            Status: {displayStatus}
          </Badge>

          <p className="text-muted-foreground mt-2 text-sm">
            {Math.round(progress)}% complete
          </p>

          <p className="text-muted-foreground mt-2 text-center text-xs">
            {statusMessage}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
