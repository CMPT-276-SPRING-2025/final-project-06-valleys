import { Card, CardContent } from "@/components/ui/card";

export function RawResults({ data }) {
  return (
    <details className="mt-6">
      <summary className="cursor-pointer text-lg font-semibold">
        Full Results (Click to expand)
      </summary>
      <Card className="mt-2">
        <CardContent className="max-h-96 overflow-auto p-4">
          <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
        </CardContent>
      </Card>
    </details>
  );
}
