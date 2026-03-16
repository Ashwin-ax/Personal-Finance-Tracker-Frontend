import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useState } from "react";
import "./index.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onClickDelete = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">💰 FinanceTracker</div>

        {/* Desktop Menu */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>Dashboard</li>
          <li>Transaction</li>
          <li>
            <button className="btn-solid" onClick={onClickDelete}>
              Logout
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

export default Navbar;
