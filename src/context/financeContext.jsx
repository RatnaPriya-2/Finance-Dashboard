import React, { createContext, useContext, useEffect, useState } from "react";
import transactionsData from "../data/transactionsData.js";

const FinanceContext = createContext();

const FinanceProvider = ({ children }) => {
  const [role, setRole] = useState("Select Role");

  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) ?? false
  );

  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || transactionsData
  );

  const [cardData, setCardData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
  });

  // Persist dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Persist transactions and recompute card data
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    const totalIncome = transactions.reduce(
      (acc, txn) => (txn.type === "income" ? acc + Number(txn.amount) : acc),
      0
    );
    const totalExpense = transactions.reduce(
      (acc, txn) => (txn.type === "expense" ? acc + Number(txn.amount) : acc),
      0
    );
    const totalBalance = totalIncome - totalExpense;
    setCardData({ totalIncome, totalExpense, totalBalance });
  }, [transactions]);

  return (
    <FinanceContext.Provider
      value={{
        role,
        setRole,
        transactions,
        setTransactions,
        cardData,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

const useFinance = () => {
  return useContext(FinanceContext);
};

export { FinanceContext, FinanceProvider, useFinance };
