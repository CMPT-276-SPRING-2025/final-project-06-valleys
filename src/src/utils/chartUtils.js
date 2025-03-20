export function prepareChartData(stats) {
  if (!stats) return [];

  return [
    { name: "Harmless", value: stats.harmless || 0, color: "#4ade80" },
    { name: "Malicious", value: stats.malicious || 0, color: "#ef4444" },
    { name: "Suspicious", value: stats.suspicious || 0, color: "#facc15" },
    { name: "Undetected", value: stats.undetected || 0, color: "#86efac" },
    { name: "Timeout", value: stats.timeout || 0, color: "#60a5fa" },
  ].filter((item) => item.value > 0); // Only include non-zero values
}
