import { useNavigate } from "react-router-dom";
import React from "react";
import "./index.css";

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2>Ready to take charge of your finances?</h2>
        <button className="cta-button" onClick={() => navigate("/register")}>
          Start Tracking Today
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
