import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SecurityVendorsTable({ results }) {
  // Process results into sorted array
  const sortedResults = Object.entries(results).sort(
    ([vendorA, resultA], [vendorB, resultB]) => {
      // Define category priority
      const getPriority = (category) => {
        switch (category) {
          case "malicious":
            return 1;
          case "suspicious":
            return 2;
          case "harmless":
            return 3;
          case "timeout":
            return 4;
          case "undetected":
            return 5;
          default:
            return 6;
        }
      };

      const priorityA = getPriority(resultA.category);
      const priorityB = getPriority(resultB.category);

      // First sort by category priority
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // If same category, sort alphabetically by vendor name
      return vendorA.localeCompare(vendorB);
    }
  );

  return (
    <div className="mt-6">
      <details className="mb-2">
        <summary className="cursor-pointer text-lg font-semibold">
          Security Vendors' Analysis
        </summary>
        <Card className="mt-2 overflow-hidden">
          <CardContent className="p-0">
            <div className="max-h-96 overflow-auto">
              {/* Mobile view - single column */}
              <div className="block md:hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left text-sm font-medium text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Security Vendor</th>
                      <th className="px-4 py-3">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedResults.map(([vendor, result]) => (
                      <tr key={vendor} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900">
                          {vendor}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {result.category === "malicious" ? (
                            <Badge
                              variant="destructive"
                              className="flex items-center gap-1"
                            >
                              <span className="h-2 w-2 rounded-full bg-red-500"></span>
                              Malware
                            </Badge>
                          ) : result.category === "suspicious" ? (
                            <Badge
                              variant="warning"
                              className="flex items-center gap-1 bg-yellow-100 text-yellow-800"
                            >
                              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                              Suspicious
                            </Badge>
                          ) : result.category === "harmless" ? (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 bg-green-100 text-green-800"
                            >
                              <span className="h-2 w-2 rounded-full bg-green-500"></span>
                              Clean
                            </Badge>
                          ) : result.category === "undetected" ? (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 bg-green-50 text-green-500"
                            >
                              <span className="h-2 w-2 rounded-full bg-green-300"></span>
                              Undetected
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                              {result.category || "Unknown"}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Desktop view - two columns flowing left to right */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left text-sm font-medium text-gray-500">
                    <tr>
                      <th className="w-1/4 px-4 py-3">Security Vendor</th>
                      <th className="w-1/4 px-4 py-3">Result</th>
                      <th className="w-1/4 px-4 py-3">Security Vendor</th>
                      <th className="w-1/4 px-4 py-3">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Array.from({
                      length: Math.ceil(sortedResults.length / 2),
                    }).map((_, rowIndex) => {
                      const leftIndex = rowIndex * 2;
                      const rightIndex = leftIndex + 1;

                      return (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          {/* Left column vendor and result */}
                          {leftIndex < sortedResults.length && (
                            <>
                              <td className="border-r border-gray-100 px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900">
                                {sortedResults[leftIndex][0]}
                              </td>
                              <td className="border-r border-gray-200 px-4 py-3 text-sm">
                                {renderBadge(
                                  sortedResults[leftIndex][1].category
                                )}
                              </td>
                            </>
                          )}

                          {/* Right column vendor and result */}
                          {rightIndex < sortedResults.length ? (
                            <>
                              <td className="border-r border-gray-100 px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900">
                                {sortedResults[rightIndex][0]}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {renderBadge(
                                  sortedResults[rightIndex][1].category
                                )}
                              </td>
                            </>
                          ) : (
                            // Empty cells if there's no right column item
                            <>
                              <td className="border-r border-gray-100"></td>
                              <td></td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </details>
    </div>
  );
}

// Helper function to render the appropriate badge based on category
function renderBadge(category) {
  switch (category) {
    case "malicious":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-red-500"></span>
          Malware
        </Badge>
      );
    case "suspicious":
      return (
        <Badge
          variant="warning"
          className="flex items-center gap-1 bg-yellow-100 text-yellow-800"
        >
          <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
          Suspicious
        </Badge>
      );
    case "harmless":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 bg-green-100 text-green-800"
        >
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          Clean
        </Badge>
      );
    case "undetected":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 bg-green-50 text-green-600"
        >
          <span className="h-2 w-2 rounded-full bg-green-300"></span>
          Undetected
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-gray-500"></span>
          {category || "Unknown"}
        </Badge>
      );
  }
}
