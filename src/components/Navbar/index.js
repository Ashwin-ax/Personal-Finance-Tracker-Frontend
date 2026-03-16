import { useNavigate, Link } from "react-router-dom";
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
        <Link
          to="/dashboard"
          className="logo"
          style={{ textDecoration: "none" }}
        >
          💰 FinanceTracker
        </Link>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/transactions">Transaction</Link>
          </li>
          <li>
            <Link to="/budget">Budget</Link>
          </li>
          <li>
            <Link to="/investments">Investments</Link>
          </li>
          <li>
            <Link to="/insights">Insights</Link>
          </li>
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
