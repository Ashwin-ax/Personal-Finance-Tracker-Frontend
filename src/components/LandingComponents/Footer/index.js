import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 */}
        <div className="footer-col">
          <h2 className="footer-logo">💰 FinanceTracker</h2>
          <p>Smart budgeting made simple.</p>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h3>Product</h3>
          <ul>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#how">How It Works</a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 FinanceTracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
