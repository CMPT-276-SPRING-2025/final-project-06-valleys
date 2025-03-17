import { Card, CardContent } from "@/components/ui/card";

export function AdditionalStats({ stats, totalEngines }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      <Card className="border-gray-200 bg-gray-50 py-0">
        <CardContent className="p-3">
          <p className="font-medium">Undetected</p>
          <p className="text-2xl font-bold">{stats.undetected || 0}</p>
          <p className="text-sm text-gray-600">
            {totalEngines > 0
              ? `${Math.round(((stats.undetected || 0) / totalEngines) * 100)}%`
              : "0%"}
          </p>
        </CardContent>
      </Card>
      <Card className="border-blue-200 bg-blue-50 py-0">
        <CardContent className="p-3 py-2">
          <p className="font-medium">Timeout</p>
          <p className="text-2xl font-bold">{stats.timeout || 0}</p>
          <p className="text-sm text-gray-600">
            {totalEngines > 0
              ? `${Math.round(((stats.timeout || 0) / totalEngines) * 100)}%`
              : "0%"}
          </p>
        </CardContent>
      </Card>
      <Card className="border-purple-200 bg-purple-50 py-0">
        <CardContent className="p-3">
          <p className="font-medium">Total Engines</p>
          <p className="text-2xl font-bold">{totalEngines}</p>
        </CardContent>
      </Card>
    </div>
  );
}