import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export function ResultsChart({ chartData }) {
  return (
    <div className="h-96 w-full md:w-1/2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} engines`, null]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
