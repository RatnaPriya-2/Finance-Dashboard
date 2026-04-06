import React from "react";
import {
  generateLineChartData,
  generatePieChartData,
} from "../../utils/calculations";
import { useFinance } from "../../context/financeContext";

const Insights = () => {
  const { transactions, darkMode } = useFinance();
  const lineChartData = generateLineChartData(transactions);
  const pieChartData = generatePieChartData(transactions);
  const monthsCount = lineChartData.length || 1;

  const totalIncome = transactions.reduce(
    (acc, txn) => acc + (txn.type == "income" ? Number(txn.amount) : 0),
    0,
  );

  const totalSavings = lineChartData.reduce(
    (acc, txn) => acc + Number(txn.balance) || 0,
    0,
  );

  const averageMonthlyExpense = Math.round(
    transactions.reduce(
      (acc, txn) => (txn.type === "expense" ? acc + Number(txn.amount) : acc),
      0,
    ) / monthsCount,
  ).toLocaleString("en-IN");

  const highestSpendingCategory =
    pieChartData.length > 0
      ? pieChartData.reduce(
          (max, txn) => (txn.amount > max.amount ? txn : max),
          { category: "", amount: 0 },
        ).category
      : "N/A";

  const lastMonth = lineChartData[lineChartData.length - 1];
  const prevMonth = lineChartData[lineChartData.length - 2];
  const monthlyChange = (lastMonth?.balance ?? 0) - (prevMonth?.balance ?? 0);

  const savingsRate =
    totalIncome > 0 ? Math.round((totalSavings / totalIncome) * 100) : 0;

  const bgClass = darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-slate-200";

  const bullets = [
    {
      color: "bg-rose-500",
      text: (
        <>
          Highest spending category is{" "}
          <span className="text-rose-500 font-bold">
            {highestSpendingCategory}
          </span>
        </>
      ),
    },
    {
      color: "bg-green-500",
      text: (
        <>
          Total savings across {monthsCount} month{monthsCount !== 1 ? "s" : ""}{" "}
          is{" "}
          <span className="text-green-600 dark:text-green-400 font-bold">
            ₹{totalSavings.toLocaleString("en-IN")}
          </span>
        </>
      ),
    },
    {
      color: "bg-purple-500",
      text: (
        <>
          Average monthly expense is{" "}
          <span className="text-purple-600 dark:text-purple-400 font-bold">
            ₹{averageMonthlyExpense}
          </span>
        </>
      ),
    },
    {
      color: monthlyChange >= 0 ? "bg-amber-500" : "bg-red-400",
      text: (
        <>
          {monthlyChange >= 0
            ? "Savings increased by "
            : "Savings decreased by "}
          <span
            className={`font-bold ${monthlyChange >= 0 ? "text-amber-500" : "text-red-500"}`}
          >
            ₹{Math.abs(monthlyChange).toLocaleString("en-IN")}
          </span>{" "}
          vs last month
        </>
      ),
    },
    {
      color: "bg-sky-500",
      text: (
        <>
          Overall savings rate is{" "}
          <span
            className={`font-bold ${savingsRate >= 20 ? "text-sky-600 dark:text-sky-400" : "text-orange-500"}`}
          >
            {savingsRate}%
          </span>{" "}
          {savingsRate >= 20 ? "🎉 Great job!" : "— aim for 20%+"}
        </>
      ),
    },
  ];

  return (
    <div
      className={`${bgClass} border p-5 rounded-2xl shadow-sm flex-1 min-w-[260px] min-h-[250px] transition-colors duration-200`}
    >
      <h3 className="text-lg text-sky-900 dark:text-sky-300 font-semibold mb-4 border-b border-slate-200 dark:border-gray-700 pb-2">
        💡 Insights
      </h3>
      <ul className="space-y-3">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className={`w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 ${b.color}`}
            />
            <span className="text-[13px] text-sky-900 dark:text-sky-200 font-medium leading-snug">
              {b.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Insights;
