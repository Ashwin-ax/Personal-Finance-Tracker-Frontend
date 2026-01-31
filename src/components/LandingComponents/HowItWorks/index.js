import React from "react";
import "./index.css";

const HowItWorks = () => {
  return (
    <section className="how-section" id="how">
      <div className="how-container">
        <h2 className="how-title">How It Works</h2>

        <div className="steps-wrapper">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Add Your Income</h3>
            <p>Enter your salary or other sources of income.</p>
          </div>

          <div className="connector"></div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Track Your Spending</h3>
            <p>Record daily expenses and categorize them.</p>
          </div>

          <div className="connector"></div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Plan & Grow</h3>
            <p>Set budgets, track goals, and improve savings.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
