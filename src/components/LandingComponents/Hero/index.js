import { useNavigate } from "react-router-dom";
import React from "react";
import "./index.css";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-text">
          <h1>
            Take control of your money. <br />
            <span>Track. Budget. Grow.</span>
          </h1>

          <p>
            Manage your income, expenses, and savings in one powerful and simple
            dashboard designed to help you build better financial habits.
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
            >
              Get Started Free
            </button>
            <button className="btn-secondary">Explore Features</button>
          </div>
        </div>

        {/* RIGHT SIDE - DASHBOARD + FLOATING STATS */}
        <div className="hero-visual">
          <div className="dashboard-card">
            <h3>Total Balance</h3>
            <h2>$12,450</h2>
            <p className="positive">+8.2% this month</p>
          </div>

          <div className="stat-card stat-income">
            <h4>Income</h4>
            <p>$4,200</p>
          </div>

          <div className="stat-card stat-expense">
            <h4>Expenses</h4>
            <p>$2,150</p>
          </div>

          <div className="stat-card stat-savings">
            <h4>Savings</h4>
            <p>$2,050</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
