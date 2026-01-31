import React from "react";
import "./index.css";

const features = [
  {
    icon: "📊",
    title: "Smart Dashboard",
    desc: "Visual charts to understand spending patterns.",
  },
  {
    icon: "💸",
    title: "Expense Tracking",
    desc: "Log and categorize every transaction.",
  },
  {
    icon: "🎯",
    title: "Budget Planning",
    desc: "Set monthly limits and avoid overspending.",
  },
  {
    icon: "🏦",
    title: "Savings Goals",
    desc: "Plan and achieve financial goals faster.",
  },
  {
    icon: "🔔",
    title: "Alerts & Reminders",
    desc: "Never miss a bill or payment again.",
  },
  {
    icon: "🔒",
    title: "Secure Data",
    desc: "Your financial data is encrypted and protected.",
  },
];

const FeatureHighlight = () => {
  return (
    <section className="features-section" id="features">
      <div className="features-container">
        <h2 className="features-title">
          Powerful Features to Master Your Money
        </h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlight;
