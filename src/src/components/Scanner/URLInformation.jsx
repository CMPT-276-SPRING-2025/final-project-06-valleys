import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function URLInformation({ url }) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">URL Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="break-all">{url}</p>
      </CardContent>
    </Card>
  );
}