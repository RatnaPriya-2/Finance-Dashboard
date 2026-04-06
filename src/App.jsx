import React from "react";
import Navbar from "./components/common/Navbar";
import Card from "./components/dashboard/Card";
import balanceBg from "./assets/balance-bg.png";
import incomeBg from "./assets/income-bg.png";
import expensesBg from "./assets/expenses-bg.png";
import FinancialOverviewChart from "./components/dashboard/FinancialOverviewChart";
import {
  generateLineChartData,
  generatePieChartData,
} from "./utils/calculations.js";
import { useFinance } from "./context/financeContext.jsx";
import SpendingPieChart from "./components/dashboard/SpendingPieChart.jsx";
import TransactionsContainer from "./components/transactions/TransactionsContainer.jsx";
import Insights from "./components/dashboard/Insights.jsx";

const App = () => {
  const { transactions, cardData, role, darkMode } = useFinance();
  const lineChartData = generateLineChartData(transactions);
  const pieChartData = generatePieChartData(transactions);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 transition-colors duration-200">
      <Navbar />

      {/* Role prompt banner */}
      {role === "Select Role" && (
        <div className="mx-4 mt-4 md:mx-6 xl:mx-8 flex items-center gap-3 bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-700 text-sky-800 dark:text-sky-200 rounded-xl px-5 py-3 text-sm font-medium shadow-sm">
          <span className="text-lg">👋</span>
          <span>
            Welcome! Please select a <strong>role</strong> from the top-right to
            get started. Choose <strong>Viewer</strong> to browse data or{" "}
            <strong>Admin</strong> to manage transactions.
          </span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="p-4 md:p-6 xl:p-8 flex gap-4 md:gap-6 flex-wrap">
        <Card
          bg={balanceBg}
          title="Total Balance"
          value={`₹${cardData.totalBalance.toLocaleString("en-IN")}`}
        />
        <Card
          bg={incomeBg}
          title="Total Income"
          value={`₹${cardData.totalIncome.toLocaleString("en-IN")}`}
        />
        <Card
          bg={expensesBg}
          title="Total Expenses"
          value={`₹${cardData.totalExpense.toLocaleString("en-IN")}`}
        />
      </div>

      {/* Charts + Insights */}
      <div className="flex flex-wrap gap-4 lg:gap-6 p-4 md:p-6 xl:p-8 pt-0">
        <FinancialOverviewChart data={lineChartData} />
        <SpendingPieChart data={pieChartData} />
        <Insights />
      </div>

      {/* Transactions */}
      <div className="w-full p-4 md:p-6 xl:p-8 pt-0">
        <TransactionsContainer />
      </div>
    </div>
  );
};

export default App;
