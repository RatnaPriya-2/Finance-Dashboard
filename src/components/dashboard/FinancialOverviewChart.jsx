import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useFinance } from "../../context/financeContext";

const FinancialOverviewChart = ({ data }) => {
  const [mounted, setMounted] = useState(false);
  const { darkMode } = useFinance();

  useEffect(() => {
    setMounted(true);
  }, []);

  const gridColor = darkMode ? "#374151" : "#e2e8f0";
  const axisColor = darkMode ? "#94a3b8" : "#075985";
  const bgClass = darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-slate-200";

  return (
    <div
      className={`${bgClass} border p-4 rounded-2xl shadow-sm flex-1 w-full min-w-[280px] md:min-w-[400px] h-[350px] transition-colors duration-200`}
    >
      <h3 className="text-lg text-sky-900 dark:text-sky-300 font-semibold mb-4">
        Financial Overview
      </h3>

      {mounted && (
        <ResponsiveContainer width="100%" height={290} minWidth={0}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 13, fill: axisColor, fontWeight: 500 }}
              tickMargin={5}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={["dataMin - 5000", "dataMax + 5000"]}
              tick={{ fontSize: 12, fill: axisColor, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                background: darkMode ? "#1f2937" : "#fff",
                color: darkMode ? "#e5e7eb" : "#0c4a6e",
              }}
              formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`]}
            />
            <Legend wrapperStyle={{ fontSize: "13px" }} />

            <Line
              dataKey="balance"
              stroke="#0EA5E9"
              strokeWidth={2}
              dot={{ r: 3, fill: "#0EA5E9" }}
              activeDot={{ r: 5 }}
            />
            <Line
              dataKey="income"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 3, fill: "#10B981" }}
              activeDot={{ r: 5 }}
            />
            <Line
              dataKey="expense"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ r: 3, fill: "#EF4444" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default FinancialOverviewChart;
