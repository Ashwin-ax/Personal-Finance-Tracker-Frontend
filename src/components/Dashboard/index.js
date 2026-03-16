import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Navbar from "../Navbar";
import TransactionsTable from "../TransactionsTable";
import "./index.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch real data from your MongoDB backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/transactions");
        const data = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // 2. Data Processing for Summary Cards
  const totalIncome = transactions
    .filter((t) => t.category === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.category !== "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpenses;

  // 3. Prepare Data for Pie Chart (Excluding 'Income' to show spending)
  const chartData = transactions
    .filter((t) => t.category !== "Income")
    .reduce((acc, curr) => {
      const found = acc.find((item) => item.name === curr.category);
      if (found) {
        found.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, []);

  // Your requested color palette mapping
  const COLORS = [
    "#2ecc71",
    "#2c3e50",
    "#546e7a",
    "#a2f0c1",
    "#34495e",
    "#27ae60",
  ];

  if (loading) return <div className="loading-screen">Syncing Ledger...</div>;

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="main-content">
        <header className="header-section">
          <h1 className="dashboard-title">Dashboard Overview</h1>
        </header>

        {/* Financial Summary Top Bar */}
        <div className="summary-container animate-slide-down">
          <div className="summary-card balance-card">
            <p>Total Balance</p>
            <h2
              style={{
                color: balance >= 0 ? "var(--primary-green)" : "#e74c3c",
              }}
            >
              ₹ {balance.toLocaleString()}
            </h2>
          </div>
          <div className="summary-card income-card">
            <p>Total Income</p>
            <h2 className="text-success">₹ {totalIncome.toLocaleString()}</h2>
          </div>
          <div className="summary-card expense-card">
            <p>Total Expenses</p>
            <h2 className="text-danger">₹ {totalExpenses.toLocaleString()}</h2>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Left Side: Expense Pie Chart */}
          <div className="glass-card chart-section animate-fade-in">
            <h3 className="section-subtitle">Expense Distribution</h3>
            <div className="recharts-wrapper">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "10px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="no-data-msg">No expenses recorded yet.</div>
              )}
            </div>
          </div>
          {/* Right Side: Recent Transactions */}
          <div className="glass-card table-section animate-fade-in delay-1">
            <h3 className="section-subtitle">Recent Activity</h3>
            <div className="recent-table-container">
              {/* By setting showActions to false, we prevent the 'onDelete' crash entirely */}
              <TransactionsTable
                transactions={transactions.slice(0, 5)}
                showActions={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
