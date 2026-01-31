import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";

const LPNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">💰 FinanceTracker</div>

        {/* Desktop Menu */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how">How It Works</a>
          </li>
          <li>
            <button className="btn-outline" onClick={() => navigate("/login")}>
              Login
            </button>
          </li>
          <li>
            <button className="btn-solid" onClick={() => navigate("/register")}>
              Get Started
            </button>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${menuOpen ? "toggle" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default LPNavbar;
