import React from "react";
import { FaSearch, FaDownload } from "react-icons/fa";
import { useFinance } from "../../context/financeContext";
import AddTransactionModal from "./AddTransactionModal";

const exportToCSV = (transactions) => {
  const headers = ["Date", "Description", "Category", "Amount", "Type"];
  const rows = transactions.map((txn) => [
    txn.date,
    `"${txn.description.replace(/"/g, '""')}"`,
    txn.category,
    txn.amount,
    txn.type,
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `findash-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const TransactionsFilters = ({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { role, transactions, darkMode } = useFinance();

  const filterBtnBase =
    "px-5 py-2 text-sm font-semibold border rounded-lg transition-all duration-200 cursor-pointer";
  const filterActive = darkMode
    ? "bg-sky-700 text-white border-sky-700"
    : "bg-sky-700 text-white border-sky-700";
  const filterInactive = darkMode
    ? "bg-gray-800 border-gray-600 text-sky-300 hover:bg-gray-700"
    : "bg-white border-slate-300 text-sky-800 hover:bg-sky-50";

  return (
    <div className="flex flex-col gap-4">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 dark:border-gray-700 pb-4">
        <h3 className="text-lg text-sky-900 dark:text-sky-300 font-bold">
          Transactions
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Export CSV — visible to all */}
          <button
            onClick={() => exportToCSV(transactions)}
            title="Export as CSV"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition"
          >
            <FaDownload className="text-xs" />
            Export CSV
          </button>

          {/* Add Transaction — Admin only */}
          {role === "Admin" && (
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-sky-700 hover:bg-sky-800 active:scale-95 text-white rounded-lg transition shadow-sm"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="text-base leading-none">+</span>
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filter + Search row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Filter tabs */}
        <div className="flex gap-2">
          {["All", "Income", "Expense"].map((f) => (
            <button
              key={f}
              className={`${filterBtnBase} ${activeFilter === f ? filterActive : filterInactive}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <div
          className={`flex-1 flex items-center gap-2 border rounded-lg px-3 py-2 transition-colors ${
            darkMode
              ? "bg-gray-800 border-gray-600"
              : "bg-white border-slate-300"
          }`}
        >
          <FaSearch className="text-sky-600 dark:text-sky-400 text-xs flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by description, category or type..."
            className="border-none outline-none bg-transparent text-sm text-sky-800 dark:text-sky-200 placeholder-slate-400 dark:placeholder-gray-500 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.trim().toLowerCase())}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-slate-400 hover:text-slate-600 text-xs ml-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <AddTransactionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default TransactionsFilters;
