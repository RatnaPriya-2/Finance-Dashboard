import React, { useState } from "react";
import TransactionsFilters from "./TransactionsFilters";
import TransactionsTable from "./TransactionsTable";

const TransactionsContainer = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="w-full flex flex-col gap-4 flex-wrap">
      <TransactionsFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <TransactionsTable
        activeFilter={activeFilter}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default TransactionsContainer;
