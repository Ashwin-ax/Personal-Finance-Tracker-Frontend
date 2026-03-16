import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./index.css";

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ category: "", limit: "" });

  const categories = [
    "Food",
    "Housing",
    "Clothing",
    "Travel",
    "Entertainment",
    "Other",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [budgetRes, transRes] = await Promise.all([
        fetch(
          "https://personal-finance-tracker-backend-io9r.onrender.com/api/budgets",
        ),
        fetch(
          "https://personal-finance-tracker-backend-io9r.onrender.com/api/transactions",
        ),
      ]);
      const bData = await budgetRes.json();
      const tData = await transRes.json();
      setBudgets(bData);
      setTransactions(tData);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://personal-finance-tracker-backend-io9r.onrender.com/api/budgets",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ category: "", limit: "" });
        fetchData();
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const getBudgetDisplayData = () => {
    return categories.map((cat) => {
      const budgetItem = budgets.find((b) => b.category === cat);
      const limit = budgetItem ? budgetItem.limit : 0;
      const spent = transactions
        .filter((t) => t.category === cat)
        .reduce((sum, t) => sum + t.amount, 0);
      return { category: cat, limit, spent };
    });
  };

  if (loading) return <div className="loading">Syncing Budgets...</div>;

  return (
    <div className="budget-page">
      <Navbar />
      <div className="main-content">
        <header className="header-section">
          <h1 className="title">Monthly Budgets</h1>
          <button
            className="add-budget-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Set Limit
          </button>
        </header>

        <div className="budget-grid">
          {getBudgetDisplayData().map((item, index) => {
            const percentage =
              item.limit > 0
                ? Math.min((item.spent / item.limit) * 100, 100)
                : 0;
            const isOver = item.limit > 0 && item.spent > item.limit;

            return (
              <div className="budget-card animate-fade-in" key={index}>
                <div className="budget-info">
                  <span className="category-name">{item.category}</span>
                  {item.limit > 0 && (
                    <span
                      className={`status-tag ${isOver ? "danger" : "success"}`}
                    >
                      {isOver ? "Over Limit" : "On Track"}
                    </span>
                  )}
                </div>
                <div className="amount-row">
                  <span className="spent-amt">₹{item.spent}</span>
                  <span className="limit-amt">of ₹{item.limit}</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className={`progress-fill ${isOver ? "bg-danger" : ""}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for setting limits */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-card animate-slide-up">
              <h3>Set Category Limit</h3>
              <form className="modal-form" onSubmit={handleSubmit}>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Monthly Limit (₹)"
                  value={formData.limit}
                  onChange={(e) =>
                    setFormData({ ...formData, limit: e.target.value })
                  }
                  required
                />
                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save">
                    Save Limit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
