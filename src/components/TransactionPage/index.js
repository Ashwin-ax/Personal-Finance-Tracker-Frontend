import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import TransactionsTable from "../TransactionsTable";
import "./index.css";

const TransactionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null); // null means adding, ID means editing
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logic to open modal for EDITING
  const handleEditClick = (transaction) => {
    setEditingId(transaction._id);
    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date.split("T")[0], // Formats "2025-09-03T00:00..." to "2025-09-03"
      notes: transaction.notes || "",
    });
    setIsModalOpen(true);
  };

  // Logic for DELETING
  const handleDelete = async (id) => {
    const token = Cookies.get("jwt_token");
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/transactions/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.ok) {
          fetchTransactions();
        }
      } catch (err) {
        console.error("Error deleting:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt_token");
    const baseUrl = `${process.env.REACT_APP_API_URL}/transactions`;
    const url = editingId ? `${baseUrl}/${editingId}` : baseUrl;
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        closeModal();
        fetchTransactions();
      }
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", amount: "", category: "", date: "", notes: "" });
  };

  return (
    <div className="transaction-page">
      <Navbar />
      <div className="main-content">
        <header className="header-section">
          <h1 className="title">Transactions</h1>
          <button
            className="add-transaction-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Transaction
          </button>
        </header>

        <TransactionsTable
          transactions={transactions}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          showActions={true}
        />

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-card animate-slide-up">
              <h3>{editingId ? "Edit Transaction" : "New Transaction"}</h3>
              <form className="modal-form" onSubmit={handleSubmit}>
                <input
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  required
                  onChange={handleChange}
                />
                <div className="form-row">
                  <input
                    name="amount"
                    type="number"
                    placeholder="Amount"
                    value={formData.amount}
                    required
                    onChange={handleChange}
                  />
                  <select
                    name="category"
                    value={formData.category}
                    required
                    onChange={handleChange}
                  >
                    <option value="">Category</option>
                    <option value="Income">Income</option>
                    <option value="Food">Food</option>
                    <option value="Housing">Housing</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Travel">Travel</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  required
                  onChange={handleChange}
                />
                <textarea
                  name="notes"
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
                <div className="form-actions">
                  <button type="button" className="cancel" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="save">
                    {editingId ? "Update" : "Save"} Transaction
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

export default TransactionPage;
