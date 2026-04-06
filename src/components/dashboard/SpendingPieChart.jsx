import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useFinance } from "../../context/financeContext";

const COLORS = [
  "#2563EB", // Medium Blue
  "#F43F5E", // Rose
  "#10B981", // Emerald
  "#8B5CF6", // Violet
  "#F59E0B", // Amber
  "#06B6D4", // Cyan
  "#EC4899", // Pink
  "#6366F1", // Indigo
  "#3B82F6", // Royal Blue
  "#1E3A8A", // Deep Blue
];
const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const pct = Math.round(percent * 100);
  if (pct < 7) return null; // skip label for tiny slices

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: 11, fontWeight: 700 }}
    >
      <tspan x={x} dy="-0.4em">{`${pct}%`}</tspan>
      <tspan x={x} dy="1.15em">
        {name}
      </tspan>
    </text>
  );
};

const SpendingPieChart = ({ data }) => {
  const [mounted, setMounted] = useState(false);
  const { darkMode } = useFinance();

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = data
    .map((d) => ({
      name: d.category ?? "Unknown",
      amount: Number(d.amount) || 0,
    }))
    .filter((d) => d.amount > 0);

  const bgClass = darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-slate-200";

  if (!chartData.length) {
    return (
      <div
        className={`${bgClass} border p-4 rounded-2xl shadow-sm flex-1 min-w-[260px] h-[350px] flex flex-col transition-colors duration-200`}
      >
        <h3 className="text-lg font-semibold mb-2 text-sky-900 dark:text-sky-300">
          Spending Breakdown
        </h3>
        <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-gray-500 text-sm">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${bgClass} border p-4 rounded-2xl shadow-sm flex-1 min-w-[260px] h-[350px] transition-colors duration-200`}
    >
      <h3 className="text-lg text-sky-900 dark:text-sky-300 font-semibold mb-2">
        Spending Breakdown
      </h3>

      {mounted && (
        <ResponsiveContainer width="100%" height={300} minWidth={0}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={45}
              outerRadius={110}
              paddingAngle={2}
              labelLine={false}
              label={renderLabel}
              stroke="none"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                name,
              ]}
              contentStyle={{
                borderRadius: 10,
                border: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                background: darkMode ? "#1f2937" : "#fff",
                color: darkMode ? "#e5e7eb" : "#0c4a6e",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SpendingPieChart;
