const generatePieChartData = (transactions) => {
  const allExpenses = transactions.filter((txn) => txn?.type === "expense");

  let groupedData = {};

  for (let txn of allExpenses) {
    if (!groupedData[txn.category]) {
      groupedData[txn.category] = Number(txn?.amount);
    } else {
      groupedData[txn.category] += Number(txn?.amount);
    }
  }

  let finalExpenseArray = Object.keys(groupedData).map((category) => {
    return { category: category, amount: groupedData[category] };
  });

  return finalExpenseArray;
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const generateLineChartData = (transactions) => {
  let groupedByMonthData = {};

  for (let txn of transactions) {
    const d = new Date(txn.date);
    // key = "YYYY-MM" so months sort correctly across year boundaries
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = MONTH_LABELS[d.getMonth()];

    if (!groupedByMonthData[key]) {
      groupedByMonthData[key] = {
        month: label,
        income: txn?.type === "income" ? Number(txn?.amount) : 0,
        expense: txn?.type === "expense" ? Number(txn?.amount) : 0,
      };
    } else {
      if (txn?.type === "income") {
        groupedByMonthData[key].income += Number(txn?.amount);
      } else {
        groupedByMonthData[key].expense += Number(txn?.amount);
      }
    }
  }

  // Sort by YYYY-MM key so months always appear in chronological order
  const sortedKeys = Object.keys(groupedByMonthData).sort();

  const finalArray = sortedKeys.map((key) => {
    const data = groupedByMonthData[key];
    return {
      month: data.month,
      income: data.income,
      expense: data.expense,
      balance: data.income - data.expense,
    };
  });

  return finalArray;
};

export { generatePieChartData, generateLineChartData };
