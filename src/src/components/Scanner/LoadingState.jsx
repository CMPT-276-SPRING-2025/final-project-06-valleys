import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LoadingState({ status }) {
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
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>

          {status && (
            <Badge variant="outline" className="mt-4">
              Status: {status}
            </Badge>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
