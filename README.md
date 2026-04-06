# 💰 FinDash — Personal Finance Dashboard

A responsive personal finance dashboard built with **React**, **Vite**, and **Tailwind CSS**. FinDash lets you track income and expenses, visualize spending patterns through interactive charts, and manage your transaction history — all in one clean, intuitive UI.

---

## 📸 Overview

FinDash is a single-page application (SPA) that provides a complete financial overview at a glance. It features role-based access control (Admin vs Viewer), real-time summary cards, interactive Recharts visualizations, and a fully functional transactions table with filtering, search, and CRUD operations.

---

## ✨ Features

### 📊 Dashboard
- **Summary Cards** — Instantly view your Total Balance, Total Income, and Total Expenses with visually distinct background images
- **Financial Overview Chart** — A responsive line chart (powered by Recharts) plotting monthly income, expense, and balance trends across 6 months (Jan–Jun)
- **Spending Breakdown Pie Chart** — A donut pie chart showing the percentage split of expenses by category (Rent, Food, Travel, Shopping, Bills)
- **Insights Panel** — Auto-calculated financial insights including:
  - Highest spending category
  - Total savings over 6 months
  - Average monthly expense
  - Month-over-month savings change

### 🧾 Transactions
- **Transactions Table** — Displays all transactions across 5 columns (horizontally scrollable on mobile devices to prevent layout breaking)
- **Filter Tabs** — Filter transactions by All / Income / Expense
- **Search** — Real-time search by category, type, or description
- **Pagination** — Shows 6 transactions by default with "View All" / "Show Less" toggle
- **Delete** — Remove any transaction with a success toast notification
- **Add Transaction (Admin only)** — A modal form to add new transactions with fields for Date, Amount, Description, Type (Income/Expense), and Category

### 🔐 Role-Based Access Control
- **Viewer** — Can only view data. Cannot add, edit, or delete transactions
- **Admin** — Full access including creating, editing, and deleting transactions
- Role is switchable from the **Navbar** dropdown

### 💾 Persistent State
- All transactions are stored in the browser's **localStorage**, so data survives page refreshes

---

## 🗂️ Project Structure

```
finance-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                   # Static images (logo, card backgrounds)
│   │   ├── logo.png
│   │   ├── balance-bg.png
│   │   ├── income-bg.png
│   │   └── expenses-bg.png
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── Navbar.jsx            # Top nav with logo, app name, role switcher
│   │   ├── dashboard/
│   │   │   ├── Card.jsx              # Summary stat card (Balance / Income / Expenses)
│   │   │   ├── FinancialOverviewChart.jsx # Recharts LineChart — monthly income vs expense vs balance
│   │   │   ├── SpendingPieChart.jsx  # Recharts PieChart — expense category breakdown
│   │   │   └── Insights.jsx          # Auto-generated financial insights panel
│   │   └── transactions/
│   │       ├── TransactionsContainer.jsx   # Parent wrapper for filters + table
│   │       ├── TransactionsFilters.jsx     # Filter tabs, search bar, Add button
│   │       ├── TransactionsTable.jsx       # Sortable, filterable transactions table
│   │       ├── TransactionRow.jsx          # Individual row with delete action
│   │       └── AddTransactionModal.jsx     # Modal form to add a new transaction
│   │
│   ├── context/
│   │   └── financeContext.jsx    # React Context — global state for transactions, role, cardData
│   │
│   ├── data/
│   │   └── transactionsData.js   # Seed data: 6 months of sample transactions (Jan–Jun 2026)
│   │
│   ├── utils/
│   │   └── calculations.js       # Pure functions: generateLineChartData, generatePieChartData
│   │
│   ├── App.jsx                   # Root component — assembles all sections
│   ├── main.jsx                  # Entry point — wraps App in FinanceProvider
│   ├── index.css                 # Global base styles
│   └── App.css
│
├── index.html                    # HTML shell (Inter font, root div)
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── package.json
```

---

## 🛠️ Tech Stack

| Technology      | Version   | Purpose                              |
|-----------------|-----------|--------------------------------------|
| React           | ^19.2.4   | UI library                           |
| Vite            | ^8.0.1    | Build tool & dev server              |
| Tailwind CSS    | ^3.4.19   | Utility-first styling                |
| Recharts        | ^3.8.1    | Chart library (Line + Pie charts)    |
| React Icons     | ^5.6.0    | Icon set (FaSearch, FaChevronDown, RxCross2) |
| PostCSS         | ^8.5.8    | CSS processing                       |
| ESLint          | ^9.39.4   | Code linting                         |

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone or navigate to the project folder
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (or the next available port).

### Other Scripts

```bash
npm run build      # Build for production (outputs to /dist)
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint checks
```

---

## 🧠 How It Works

### State Management
The app uses **React Context API** (`financeContext.jsx`) as the single source of truth:

- `transactions` — Array of all transaction objects; initialized from `localStorage` or seed data
- `cardData` — Auto-computed `{ totalIncome, totalExpense, totalBalance }` via `useEffect` whenever transactions change
- `role` — Either `"Viewer"`, `"Admin"`, or `"Select Role"` (default); controls UI access

### Data Flow
```
transactionsData.js (seed)
      ↓
financeContext.jsx (global store + localStorage sync)
      ↓
App.jsx → pulls transactions + cardData
      ├─→ Card.jsx (displays totals)
      ├─→ FinancialOverviewChart.jsx ← generateLineChartData()
      ├─→ SpendingPieChart.jsx ← generatePieChartData()
      ├─→ Insights.jsx ← both utility functions
      └─→ TransactionsContainer.jsx
              ├─→ TransactionsFilters.jsx (filter/search/add)
              └─→ TransactionsTable.jsx → TransactionRow.jsx
```

### Utility Functions (`calculations.js`)

| Function | Description |
|---|---|
| `generateLineChartData(transactions)` | Groups transactions by month (Jan–Jun), computes monthly income, expense, and net balance for the line chart |
| `generatePieChartData(transactions)` | Groups expense-only transactions by category, returns category totals for the pie chart |

### Sample Transaction Schema
```js
{
  id: "uuid",             // auto-generated via crypto.randomUUID()
  date: "2026-01-02",     // YYYY-MM-DD
  amount: 48000,          // number (in ₹)
  type: "income",         // "income" | "expense"
  category: "Salary",     // "Salary" | "Freelance" | "Rent" | "Food" | "Travel" | "Shopping" | "Bills"
  description: "Monthly salary"
}
```

---

## 🧩 Component Reference

| Component | Location | Responsibility |
|---|---|---|
| `Navbar` | `common/` | App header with logo, brand name, and role-switcher dropdown |
| `Card` | `dashboard/` | Stat card showing a financial metric over a background image |
| `FinancialOverviewChart` | `dashboard/` | Recharts `LineChart` — monthly income vs expense vs balance |
| `SpendingPieChart` | `dashboard/` | Recharts `PieChart` — expense category breakdown with % labels |
| `Insights` | `dashboard/` | Derived financial stats (top category, savings, avg expense, MoM change) |
| `TransactionsContainer` | `transactions/` | Parent that holds filters state and passes it down |
| `TransactionsFilters` | `transactions/` | Filter tabs (All/Income/Expense), search bar, Add Transaction button |
| `TransactionsTable` | `transactions/` | Main table — filters, searches, sorts, paginates, and deletes transactions |
| `TransactionRow` | `transactions/` | Single table row with formatted amount, type badge, and delete button |
| `AddTransactionModal` | `transactions/` | Controlled modal form with validation to add new transactions |

---

## 🔑 Role-Based Features

| Feature | Viewer | Admin |
|---|:---:|:---:|
| View summary cards | ✅ | ✅ |
| View charts | ✅ | ✅ |
| View insights | ✅ | ✅ |
| Browse/search/filter transactions | ✅ | ✅ |
| Delete a transaction | ❌ | ✅ |
| Edit an existing transaction | ❌ | ✅ |
| Add a new transaction | ❌ | ✅ |

> Switch roles using the dropdown in the top-right of the Navbar.

---

## 📅 Sample Data Coverage

The seed data (`transactionsData.js`) covers **6 months** — January through June 2026 — with realistic Indian Rupee (₹) amounts across the following categories:

| Category | Type |
|---|---|
| Salary | Income |
| Freelance | Income |
| Rent | Expense |
| Food | Expense |
| Travel | Expense |
| Shopping | Expense |
| Bills | Expense |

---

## 🚀 Deployment

To deploy the production build:

```bash
npm run build
```

This outputs a `/dist` folder which can be hosted on any static file host:
- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [GitHub Pages](https://pages.github.com/)

---

## 📝 License

This project was built as part of a **Zorvyn Fintech assignment**. All rights reserved.
