import { Card, CardContent } from "@/components/ui/card";

export function StatsCards({ stats, totalEngines }) {
  return (
    <>
      <div className="mt-6 w-full md:mt-0 md:w-1/2">
        <div className="grid grid-cols-1 gap-4">
          <Card className="border-green-200 bg-green-50 py-0">
            <CardContent className="p-4">
              <p className="font-medium">Harmless</p>
              <p className="text-2xl font-bold">{stats.harmless || 0}</p>
              <p className="text-sm text-gray-600">
                {totalEngines > 0
                  ? `${Math.round(((stats.harmless || 0) / totalEngines) * 100)}%`
                  : "0%"}
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-red-50 py-0">
            <CardContent className="p-4">
              <p className="font-medium">Malicious</p>
              <p className="text-2xl font-bold">{stats.malicious || 0}</p>
              <p className="text-sm text-gray-600">
                {totalEngines > 0
                  ? `${Math.round(((stats.malicious || 0) / totalEngines) * 100)}%`
                  : "0%"}
              </p>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50 py-0">
            <CardContent className="p-4">
              <p className="font-medium">Suspicious</p>
              <p className="text-2xl font-bold">{stats.suspicious || 0}</p>
              <p className="text-sm text-gray-600">
                {totalEngines > 0
                  ? `${Math.round(((stats.suspicious || 0) / totalEngines) * 100)}%`
                  : "0%"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}