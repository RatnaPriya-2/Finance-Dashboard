import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useFinance } from "../../context/financeContext.jsx";

const emptyTxn = () => ({
  id: crypto.randomUUID(),
  date: "",
  amount: "",
  description: "",
  type: "",
  category: "",
});

const AddTransactionModal = ({ isModalOpen, setIsModalOpen }) => {
  const { setTransactions, darkMode } = useFinance();
  const [successModal, setSuccessModal] = React.useState(false);
  const [txn, setTxn] = React.useState(emptyTxn());
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    if (!txn.date) newErrors.date = "Date is required";
    if (!txn.amount || Number(txn.amount) <= 0)
      newErrors.amount = "Enter a valid positive amount";
    if (!txn.description.trim())
      newErrors.description = "Description is required";
    if (!txn.type) newErrors.type = "Select a type";
    if (!txn.category) newErrors.category = "Select a category";
    return newErrors;
  };

  const handleFormData = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // Build the new txn from current state in a single shot — avoids stale state trap
    const newTxn = {
      id: crypto.randomUUID(),
      date: txn.date,
      amount: Number(txn.amount),
      description: txn.description.trim(),
      type: txn.type,
      category: txn.category,
    };

    setTransactions((prev) => [...prev, newTxn]);
    setSuccessModal(true);
    setTxn(emptyTxn());
    setTimeout(() => {
      setSuccessModal(false);
      setIsModalOpen(false);
    }, 1800);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTxn(emptyTxn());
    setErrors({});
  };
  const handleTypeChange = (value) => {
    setTxn((prev) => ({
      ...prev,
      type: value,
      category: "",
    }));

    setErrors((prev) => ({
      ...prev,
      type: "",
      category: "",
    }));
  };

  const dm = darkMode;

  return (
    <div className={`${isModalOpen ? "block" : "hidden"}`}>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
        onClick={handleClose}
      />

      <div
        className={`z-[1000] fixed shadow-xl border rounded-2xl w-[92%] md:w-[80%] lg:w-[60%] xl:w-[38%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 transition-colors duration-200 ${
          dm ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h2
          className={`text-xl text-center font-semibold mb-6 ${
            dm ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Add New Transaction
        </h2>

        <button
          className={`absolute top-4 right-4 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition ${
            dm
              ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
          onClick={handleClose}
        >
          <RxCross2 />
        </button>

        <form className="flex flex-col gap-4 w-full" onSubmit={handleFormData}>
          {/* Date */}
          <div className="flex flex-col gap-1">
            <input
              type="date"
              className={`px-4 py-2 rounded-lg font-medium outline-none border focus:ring-2 focus:ring-sky-500 transition ${
                dm
                  ? "bg-gray-800 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-700"
              } ${errors.date ? "border-red-400" : ""}`}
              name="date"
              value={txn.date}
              onChange={(e) => {
                setTxn((prev) => ({ ...prev, date: e.target.value }));
                setErrors((prev) => ({ ...prev, date: "" }));
              }}
            />
            {errors.date && (
              <span className="text-xs text-red-500">{errors.date}</span>
            )}
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1">
            <input
              type="number"
              min="1"
              step="any"
              placeholder="Amount (₹)"
              className={`px-4 py-2 rounded-lg font-medium outline-none border focus:ring-2 focus:ring-sky-500 transition ${
                dm
                  ? "bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-700"
              } ${errors.amount ? "border-red-400" : ""}`}
              name="amount"
              value={txn.amount}
              onChange={(e) => {
                setTxn((prev) => ({ ...prev, amount: e.target.value }));
                setErrors((prev) => ({ ...prev, amount: "" }));
              }}
            />
            {errors.amount && (
              <span className="text-xs text-red-500">{errors.amount}</span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Description"
              className={`px-4 py-2 rounded-lg font-medium outline-none border focus:ring-2 focus:ring-sky-500 transition ${
                dm
                  ? "bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-700"
              } ${errors.description ? "border-red-400" : ""}`}
              value={txn.description}
              name="description"
              onChange={(e) => {
                setTxn((prev) => ({ ...prev, description: e.target.value }));
                setErrors((prev) => ({ ...prev, description: "" }));
              }}
            />
            {errors.description && (
              <span className="text-xs text-red-500">{errors.description}</span>
            )}
          </div>

          {/* Type */}
          <div className="flex flex-col gap-1">
            <div
              className={`flex items-center gap-6 font-medium ${
                dm ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={txn.type === "income"}
                  onChange={(e) => handleTypeChange(e.target.value)}
                />
                Income
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={txn.type === "expense"}
                  onChange={(e) => handleTypeChange(e.target.value)}
                />
                Expense
              </label>
            </div>
            {errors.type && (
              <span className="text-xs text-red-500">{errors.type}</span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <select
              className={`px-4 py-2 rounded-lg font-medium outline-none border focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition ${
                dm
                  ? "bg-gray-800 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-700"
              } ${errors.category ? "border-red-400" : ""}`}
              name="category"
              disabled={!txn.type}
              value={txn.category}
              onChange={(e) => {
                setTxn((prev) => ({ ...prev, category: e.target.value }));
                setErrors((prev) => ({ ...prev, category: "" }));
              }}
            >
              <option value="" disabled hidden>
                {txn.type ? "Select Category" : "Select a type first"}
              </option>
              {txn.type === "income" && (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Business">Business</option>
                  <option value="Investment">Investment</option>
                  <option value="Other Income">Other Income</option>
                </>
              )}
              {txn.type === "expense" && (
                <>
                  <option value="Rent">Rent</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </>
              )}
            </select>
            {errors.category && (
              <span className="text-xs text-red-500">{errors.category}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow hover:shadow-md transition-all w-[200px] self-center mt-2"
          >
            Add Transaction
          </button>
        </form>

        {/* Success toast inside modal */}
        {successModal && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-gray-900/80 z-10">
            <div className="flex items-center gap-3 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-lg">
              <span className="text-2xl">✅</span>
              <span className="font-semibold">
                Transaction added successfully!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTransactionModal;
