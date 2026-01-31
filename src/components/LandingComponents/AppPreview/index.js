import React from "react";
import "./index.css";

const AppPreview = () => {
  return (
    <section className="preview-section">
      <div className="preview-container">
        <h2 className="section-title">See Your Finances in Action</h2>
        <p className="section-subtitle">
          A clean dashboard that helps you understand your money instantly.
        </p>

        <div className="preview-grid">
          {/* CARD 1 */}
          <div className="preview-card">
            <div className="image-placeholder">📊</div>
            <h3>Dashboard View</h3>
            <p>Track income, expenses, and balance at a glance.</p>
          </div>

          {/* CARD 2 */}
          <div className="preview-card">
            <div className="image-placeholder">📅</div>
            <h3>Budget Planner</h3>
            <p>Create monthly budgets and stay on target.</p>
          </div>

          {/* CARD 3 */}
          <div className="preview-card">
            <div className="image-placeholder">🎯</div>
            <h3>Savings Goals</h3>
            <p>Set goals and watch your savings grow.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
