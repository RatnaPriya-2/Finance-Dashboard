import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useFinance } from "../../context/financeContext";
import EditTransactionModal from "./EditTransactionModal";

const TransactionRow = ({
  transaction,
  handleDeleteTxn,
  editOpen,
  setEditOpen,
  editTxn,
  setEditTxn,
}) => {
  const { role, darkMode } = useFinance();

  const capitalisedType =
    transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1);

  const date = new Date(transaction.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const isExpense = transaction.type === "expense";
  const rowBase = darkMode
    ? "border-b border-gray-700 hover:bg-gray-700/50"
    : "border-b border-gray-100 hover:bg-slate-50";

  return (
    <>
      <tr className={`${rowBase} transition-colors duration-150`}>
        <td className="py-3 text-sm text-sky-700 dark:text-sky-400 font-semibold whitespace-nowrap pr-4">
          {date}
        </td>
        <td className="py-3 text-sm text-sky-900 dark:text-gray-200 font-medium pr-4">
          {transaction.description}
        </td>
        <td className="py-3 pr-4">
          <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300">
            {transaction.category}
          </span>
        </td>
        <td
          className={`py-3 text-sm font-bold pr-4 ${isExpense ? "text-red-500" : "text-emerald-600"}`}
        >
          {isExpense ? "−" : "+"} ₹
          {Number(transaction.amount).toLocaleString("en-IN")}
        </td>
        <td className="py-3 pr-4">
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
              isExpense
                ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            }`}
          >
            {capitalisedType}
          </span>
        </td>
        {role === "Admin" && (
          <td className="py-3">
            <div className="flex items-center gap-3">
              <button
                title="Edit transaction"
                onClick={() => {
                  setEditOpen(true);
                  setEditTxn(transaction);
                }}
                className="text-sky-400 hover:text-sky-600 transition-colors"
              >
                <FaEdit />
              </button>
              <button
                title="Delete transaction"
                onClick={() => handleDeleteTxn(transaction.id)}
                className="text-rose-400 hover:text-rose-600 transition-colors"
              >
                <FaTrashAlt />
              </button>
            </div>
          </td>
        )}
      </tr>
    </>
  );
};

export default TransactionRow;
