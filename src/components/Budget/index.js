import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
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
    const token = Cookies.get("jwt_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const [budgetRes, transRes] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/budgets`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (budgetRes.ok && transRes.ok) {
        const bData = await budgetRes.json();
        const tData = await transRes.json();

        setBudgets(Array.isArray(bData) ? bData : []);
        setTransactions(Array.isArray(tData) ? tData : []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt_token");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: formData.category,
          limit: Number(formData.limit), // Ensure it's sent as a number
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ category: "", limit: "" });
        await fetchData(); // Wait for refresh
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const getBudgetDisplayData = () => {
    return categories.map((cat) => {
      // Find the budget item using case-insensitive comparison
      const budgetItem = budgets.find(
        (b) => b.category && b.category.toLowerCase() === cat.toLowerCase(),
      );

      const limit = budgetItem ? Number(budgetItem.limit) : 0;

      // Calculate spent amount by filtering and reducing
      const spent = transactions
        .filter(
          (t) => t.category && t.category.toLowerCase() === cat.toLowerCase(),
        )
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

      return { category: cat, limit, spent };
    });
  };

  if (loading) return <div className="loading">Syncing Budgets...</div>;

  const budgetDisplayData = getBudgetDisplayData();

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
          {budgetDisplayData.map((item, index) => {
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
