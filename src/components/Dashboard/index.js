import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import Navbar from "../Navbar";
import TransactionsTable from "../TransactionsTable";
import "./index.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "Food",
    "Housing",
    "Clothing",
    "Travel",
    "Entertainment",
    "Other",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transRes, budgetRes] = await Promise.all([
          fetch(
            "https://personal-finance-tracker-backend-io9r.onrender.com/api/transactions",
          ),
          fetch(
            "https://personal-finance-tracker-backend-io9r.onrender.com/api/budgets",
          ),
        ]);
        const transData = await transRes.json();
        const budgetData = await budgetRes.json();
        setTransactions(transData);
        setBudgets(budgetData);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalIncome = transactions
    .filter((t) => t.category === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.category !== "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const budgetComparisonData = categories.map((cat) => {
    const limitObj = budgets.find((b) => b.category === cat);
    const spent = transactions
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      name: cat,
      spent: spent,
      limit: limitObj ? limitObj.limit : 0,
    };
  });

  const COLORS = [
    "#2ecc71",
    "#27ae60",
    "#2c3e50",
    "#546e7a",
    "#a2f0c1",
    "#34495e",
  ];

  if (loading)
    return <div className="loading-screen">Updating Finances...</div>;

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="main-content">
        <header className="header-section">
          <h1 className="dashboard-title">Dashboard Overview</h1>
        </header>

        <div className="compact-summary-row">
          <div className="mini-card income">
            <span className="label">Total Income</span>
            <span className="value">₹{totalIncome.toLocaleString()}</span>
          </div>
          <div className="mini-card expense">
            <span className="label">Total Expense</span>
            <span className="value">₹{totalExpense.toLocaleString()}</span>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="glass-card chart-container">
            <h3>Expense Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={budgetComparisonData.filter((d) => d.spent > 0)}
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="spent"
                >
                  {budgetComparisonData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card chart-container">
            <h3>Budget vs Actual</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={budgetComparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{ fill: "#f4f4f5" }} />
                <Bar
                  dataKey="limit"
                  fill="#546e7a"
                  radius={[4, 4, 0, 0]}
                  name="Limit"
                />
                <Bar
                  dataKey="spent"
                  fill="#2ecc71"
                  radius={[4, 4, 0, 0]}
                  name="Spent"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card full-width">
            <h3 className="section-subtitle">Recent Activity</h3>
            <TransactionsTable
              transactions={transactions.slice(0, 5)}
              showActions={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
