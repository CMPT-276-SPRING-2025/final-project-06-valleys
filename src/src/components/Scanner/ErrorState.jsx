import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function ErrorState({ error }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>
  );
}