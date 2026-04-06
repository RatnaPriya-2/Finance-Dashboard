import React, { useEffect, useState } from "react";
import { useFinance } from "../../context/financeContext.jsx";
import TransactionRow from "./TransactionRow";
import EditTransactionModal from "./EditTransactionModal.jsx";

const TransactionsTable = ({ activeFilter, searchQuery }) => {
  const { transactions, setTransactions, role, darkMode } = useFinance();
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTxn, setEditTxn] = useState(null);

  const handleDeleteTxn = (id) => {
    setTransactions((prev) => prev.filter((txn) => txn.id !== id));
    setShowDeleteSuccess(true);
    setTimeout(() => setShowDeleteSuccess(false), 2200);
  };

  const [data, setData] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [showFullList, setShowFullList] = useState(false);

  useEffect(() => {
    let filteredTxns = [...transactions];

    if (activeFilter !== "All") {
      filteredTxns = filteredTxns.filter(
        (txn) => txn.type.toLowerCase() === activeFilter.toLowerCase(),
      );
    }

    if (searchQuery && searchQuery.length > 0) {
      filteredTxns = filteredTxns.filter(
        (txn) =>
          txn.category.toLowerCase().includes(searchQuery) ||
          txn.type.toLowerCase().includes(searchQuery) ||
          txn.description.toLowerCase().includes(searchQuery),
      );
    }

    filteredTxns.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTotalTransactions(filteredTxns.length);
    setData(showFullList ? filteredTxns : filteredTxns.slice(0, 8));
  }, [activeFilter, showFullList, searchQuery, transactions]);

  const bgClass = darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-slate-200";

  const thClass = darkMode
    ? "text-sky-300 border-gray-700"
    : "text-sky-900 border-gray-200";

  return (
    <div
      className={`w-full overflow-x-auto rounded-2xl shadow-sm border ${bgClass} py-4 px-5 transition-colors duration-200`}
    >
      <table className="w-full min-w-[700px] text-sm text-left border-collapse">
        <thead className={`border-b-2 ${thClass}`}>
          <tr>
            <th
              className={`py-3 text-xs uppercase tracking-wider font-semibold ${thClass} pr-4`}
            >
              Date
            </th>
            <th
              className={`py-3 text-xs uppercase tracking-wider font-semibold ${thClass} pr-4`}
            >
              Description
            </th>
            <th
              className={`py-3 text-xs uppercase tracking-wider font-semibold ${thClass} pr-4`}
            >
              Category
            </th>
            <th
              className={`py-3 text-xs uppercase tracking-wider font-semibold ${thClass} pr-4`}
            >
              Amount
            </th>
            <th
              className={`py-3 text-xs uppercase tracking-wider font-semibold ${thClass} pr-4`}
            >
              Type
            </th>
            {role === "Admin" && (
              <th
                className={`py-3 text-xs uppercase tracking-wider font-semibold ${thClass}`}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((txn) => (
              <TransactionRow
                key={txn.id}
                transaction={txn}
                editOpen={editOpen}
                setEditOpen={setEditOpen}
                editTxn={editTxn}
                setEditTxn={setEditTxn}
                handleDeleteTxn={handleDeleteTxn}
              />
            ))
          ) : (
            <tr>
              <td colSpan={role === "Admin" ? 6 : 5}>
                <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400 dark:text-gray-500">
                  <span className="text-5xl">🔍</span>
                  <p className="font-semibold text-base">
                    No transactions found
                  </p>
                  <p className="text-sm">Try adjusting your search or filter</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex gap-4 items-center mt-3">
        <p
          className={`text-xs ${darkMode ? "text-gray-400" : "text-slate-500"}`}
        >
          Showing <span className="font-semibold">{data.length}</span> of{" "}
          <span className="font-semibold">{totalTransactions}</span>{" "}
          transactions
        </p>
        {totalTransactions > 8 && (
          <button
            className="whitespace-nowrap bg-sky-700 hover:bg-sky-800 active:scale-95 transition-all duration-200 text-white text-xs font-semibold px-5 py-2 rounded-lg"
            onClick={() => setShowFullList((v) => !v)}
          >
            {showFullList ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      {/* Delete toast */}
      {showDeleteSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-100 border border-green-400 text-green-700 px-5 py-3 rounded-xl shadow-lg z-[1001] flex items-center gap-2 animate-bounce-in">
          <span>✅</span>
          <span className="font-semibold text-sm">Transaction deleted</span>
        </div>
      )}
      {editOpen && (
        <EditTransactionModal
          transaction={editTxn}
          onClose={() => setEditOpen(false)}
        />
      )}
    </div>
  );
};

export default TransactionsTable;
